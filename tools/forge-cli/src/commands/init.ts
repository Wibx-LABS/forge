import { Command, Flags } from '@oclif/core';
import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { discoverProject } from '../core/discovery';
import { hydrateTemplate } from '../core/hydration';
import { checkForUpdates } from '../core/version';
import { loadConfig, getForgeDir, getTemplatePath, getAgentLibraryPath } from '../config';
import { prompt } from 'enquirer';
import Table from 'cli-table3';

const pkg = require('../../package.json');
const FORGE_VERSION: string = pkg.version ?? '3.0.0-dev';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const LOGO = `
 ${chalk.blue(' /$$$$$$$$ /$$$$$$  /$$$$$$$   /$$$$$$  /$$$$$$$$')}
 ${chalk.blue('| $$_____//$$__  $$| $$__  $$ /$$__  $$| $$_____/')}
 ${chalk.blue('| $$     | $$  \\ $$| $$  \\ $$| $$  \\__/| $$      ')}
 ${chalk.blue('| $$$$$  | $$  | $$| $$$$$$$/| $$ /$$$$| $$$$$   ')}
 ${chalk.blue('| $$__/  | $$  | $$| $$  \\ $$| $$|_  $$| $$__/   ')}
 ${chalk.blue('| $$     | $$  | $$| $$  \\ $$| $$  \\ $$| $$      ')}
 ${chalk.blue('| $$     |  $$$$$$/| $$  | $$|  $$$$$$/| $$$$$$$$')}
 ${chalk.blue('|__/      \\______/ |__/  |__/ \\______/ |________/')}
`;

const STACK_MAP: Record<string, string> = {
  pwa: 'PWA (Progressive Web App)',
  extension: 'Browser Extension',
  n8n: 'n8n Workflow',
  vite: 'Vite / React / TypeScript',
  static: 'Single-File HTML/JS',
  node: 'Node.js',
  python: 'Python',
  go: 'Go',
  rust: 'Rust',
  docker: 'Docker',
  nexos: 'Nexos / Angular',
  unknown: 'Unknown — specify manually',
};

export default class Init extends Command {
  static description = 'Admit a new patient (project) into FORGE';

  async discoverObjective(targetDir: string): Promise<string> {
    const files = ['overview.md', 'README.md', 'PATIENT.md'];
    const keywords = [
      '# Objective', '## Objective', '# Objetivo', '## Objetivo',
      '# Purpose', '## Purpose', '# Propósito', '## Propósito',
      '# Overview', '## Overview', '# Visão Geral', '## Visão Geral',
      '# Operation', '## Operation', '# Project', '## Project'
    ];
    
    for (const file of files) {
      const filePath = path.join(targetDir, file);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n');
        
        // Strategy: Find the first substantial line that isn't a header, tag, or ASCII art
        for (const line of lines) {
          const trimmed = line.trim();
          
          // Skip headers, comments, tags, and empty lines
          if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('!') || trimmed.startsWith('<')) continue;
          
          // Skip ASCII Art (lines with 3+ consecutive symbols)
          if (/[_=\-\/\\|]{3,}/.test(trimmed)) continue;
          
          // Must be a real sentence (at least 20 chars of text)
          if (trimmed.length > 20) {
            return trimmed.replace(/^>\s*/, '').replace(/\*\*/g, '').trim();
          }
        }
      }
    }
    return '';
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Init);
    const targetDir = process.cwd();
    const forgeDir = getForgeDir(targetDir);

    this.log(LOGO);
    this.log(chalk.bold(` Forge Engine ${chalk.blue(FORGE_VERSION)}`));
    this.log(chalk.dim(' Autonomous Agent Orchestration\n'));

    const config = loadConfig();
    const spinner = ora('Initializing Forge core...').start();
    await sleep(800);
    
    if (!(await fs.pathExists(config.forgePath))) {
      spinner.fail(`FORGE_HOME not found at: ${chalk.bold(config.forgePath)}`);
      this.exit(1);
    }

    const context = await discoverProject(targetDir);
    const inferredObjective = await this.discoverObjective(targetDir);
    spinner.succeed(`Environment mapped: ${chalk.bold.green(context.type.toUpperCase())}`);
    
    const domainsDir = path.join(config.forgePath, 'domains');
    const availableDomains = (await fs.pathExists(domainsDir)) 
      ? (await fs.readdir(domainsDir)).filter(d => fs.lstatSync(path.join(domainsDir, d)).isDirectory())
      : [];

    const answers = await prompt<{
      name: string;
      objective: string;
      domain: string;
      admissionType: string;
      urgency: string;
      deadline: string;
      autonomy: string;
    }>([
      { type: 'input', name: 'name', message: `1. Patient Name:`, initial: context.name },
      { type: 'input', name: 'objective', message: `2. Primary Objective:`, initial: inferredObjective },
      {
        type: 'select',
        name: 'domain',
        message: `3. Domain Expertise:`,
        choices: [...availableDomains.map(d => ({ name: d, message: d.charAt(0).toUpperCase() + d.slice(1) })), { name: 'none', message: 'General (No specific domain)' }],
      },
      {
        type: 'select',
        name: 'admissionType',
        message: `4. Starting Point:`,
        choices: [
          { name: 'Greenfield', message: 'New Project (Start from zero / template)' },
          { name: 'Existing', message: 'Hydrate Existing (Context-only for current folder)' },
          { name: 'Migration', message: 'Legacy Migration (Refactor or move stack)' },
        ],
      },
      { type: 'select', name: 'urgency', message: `5. Priority:`, choices: ['Critical', 'High', 'Normal', 'Low'], initial: 2 },
      { type: 'input', name: 'deadline', message: `6. Deadline:`, initial: 'None' },
      {
        type: 'select',
        name: 'autonomy',
        message: `7. Autonomy:`,
        choices: [
          { name: 'full', message: 'Full (Automatic)' },
          { name: 'phase', message: 'Phase-Gated (Approval per phase)' },
          { name: 'task', message: 'Task-Gated (Approval per task)' },
        ],
      },
    ]);

    let scaffoldType = 'none';
    if (answers.admissionType === 'Greenfield') {
      const scaffoldPrompt = await prompt<{ type: string }>({
        type: 'select',
        name: 'type',
        message: '8. Select LABS Standard Template:',
        choices: [
          { name: 'pwa', message: 'PWA (Progressive Web App)' },
          { name: 'extension', message: 'Browser Extension' },
          { name: 'static', message: 'Single-File HTML Tool' },
          { name: 'vite', message: 'Vite / React / TypeScript' },
          { name: 'none', message: 'Clean Slate' },
        ],
      });
      scaffoldType = scaffoldPrompt.type;
    }

    // Brand Discovery Hunter
    let brandContent = 'None';
    let brandStatus = chalk.yellow('MISSING');
    
    // Search Order: 1. Target Dir, 2. Parents, 3. Forge Home
    const searchDirs = [targetDir];
    let curr = targetDir;
    while (curr !== path.parse(curr).root && curr !== config.forgePath) {
      curr = path.dirname(curr);
      searchDirs.push(curr);
    }
    if (!searchDirs.includes(config.forgePath)) searchDirs.push(config.forgePath);

    for (const sDir of searchDirs) {
      const pathsToTry = [
        path.join(sDir, 'Brand_Guidelines.md'),
        path.join(sDir, 'knowledge', 'Brand_Guidelines.md'),
        path.join(sDir, 'docs', 'Brand_Guidelines.md')
      ];

      for (const bPath of pathsToTry) {
        if (await fs.pathExists(bPath)) {
          brandStatus = chalk.green('LOADED ✓');
          brandContent = await fs.readFile(bPath, 'utf8');
          break; 
        }
      }
      if (brandStatus.includes('LOADED')) break;
    }

    const table = new Table({ head: [chalk.blue('Admission Sheet'), chalk.blue('Value')], colWidths: [20, 50], wordWrap: true });
    table.push(
      ['Patient', answers.name],
      ['Objective', answers.objective],
      ['Domain', answers.domain.toUpperCase()],
      ['Context Mode', answers.admissionType],
      ['Template', scaffoldType.toUpperCase()],
      ['Priority', answers.urgency],
      ['Autonomy', answers.autonomy],
      ['Brand Guide', brandStatus]
    );

    this.log('\n' + table.toString());

    const { confirm } = await prompt<{ confirm: boolean }>({ type: 'confirm', name: 'confirm', message: 'Confirm Admission?', initial: true });
    if (!confirm) return;

    this.log('');
    const dnaSpinner = ora('Analyzing project DNA and constraints...').start();
    await sleep(1200);
    dnaSpinner.succeed('DNA sequence mapped.');

    const brandSpinner = ora('Injecting WiBX Brand Guidelines...').start();
    await sleep(1000);
    brandSpinner.succeed('Brand identity injected.');

    if (scaffoldType !== 'none') {
      const scaffoldSpinner = ora(`Forging ${scaffoldType} project base...`).start();
      const scaffoldDir = path.join(config.forgePath, 'templates', 'scaffold', scaffoldType);
      if (await fs.pathExists(scaffoldDir)) {
        await sleep(1500);
        const files = await fs.readdir(scaffoldDir);
        for (const file of files) {
          const src = path.join(scaffoldDir, file);
          const dest = path.join(targetDir, file);
          if ((await fs.lstat(src)).isDirectory()) await fs.copy(src, dest);
          else {
            let content = await fs.readFile(src, 'utf8');
            content = await hydrateTemplate(content, { 'project-name': answers.name, 'project-objective': answers.objective });
            await fs.writeFile(dest, content, 'utf8');
          }
        }
        scaffoldSpinner.succeed(`${scaffoldType.toUpperCase()} base forged.`);
      }
    }

    const forgeSpinner = ora('Forging .forge infrastructure...').start();
    await fs.ensureDir(path.join(targetDir, '.forge'));
    await fs.ensureDir(path.join(targetDir, '.forge', 'agents'));
    await fs.ensureDir(path.join(targetDir, '.forge', 'phases'));
    await sleep(1000);
    forgeSpinner.succeed('Infrastructure solid.');

    let domainContent = 'None';
    if (answers.domain !== 'none') {
      const domainPath = path.join(domainsDir, answers.domain);
      const domainFiles = (await fs.readdir(domainPath)).filter(f => f.endsWith('.md'));
      const contents = await Promise.all(domainFiles.map(f => fs.readFile(path.join(domainPath, f), 'utf8')));
      domainContent = contents.join('\n\n---\n\n');
    }

    const agentLibDir = getAgentLibraryPath(config);
    if (await fs.pathExists(agentLibDir)) {
      const agentFiles = (await fs.readdir(agentLibDir)).filter(f => f.endsWith('.md'));
      for (const agentFile of agentFiles) {
        const agentName = agentFile.replace('_Template.md', '');
        const agentSpinner = ora(`Hydrating @${agentName}...`).start();
        await sleep(300);
        const raw = await fs.readFile(path.join(agentLibDir, agentFile), 'utf8');
        const hydrated = await hydrateTemplate(raw, { 
          'project-name': answers.name, 
          'project-objective': answers.objective, 
          'brand-guidelines': brandContent,
          'domain-expertise': domainContent
        });
        await fs.writeFile(path.join(targetDir, '.forge', 'agents', agentFile.replace('_Template.md', '_HYDRATED.md')), hydrated, 'utf8');
        agentSpinner.succeed(`@${agentName} ready.`);
      }
    }

    this.log('\n' + chalk.green.bold('  🚀 FORGE IGNITION READY'));
    this.log(chalk.gray('  -----------------------'));
    this.log(chalk.white('  Copy and paste this into Claude Code / Cursor / Antigravity:\n'));
    
    const ignitionPrompt = `Initialize Forge mode for ${answers.name}. Read .forge/PATIENT.md for our ${answers.domain.toUpperCase()} objectives and .forge/AUTONOMY.md for rules. Adopt the persona in .forge/agents/Architect_HYDRATED.md and check .forge/STATE.md to begin Phase 1.`;
    
    this.log(chalk.cyan.italic(`  > "${ignitionPrompt}"`));
    this.log('\n' + chalk.gray('  (Tip: You can change the agent file to @Builder or @Debugger depending on your phase)'));
    this.log('');
  }
}
