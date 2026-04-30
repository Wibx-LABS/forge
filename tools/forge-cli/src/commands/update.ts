import { Command } from '@oclif/core';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import { loadConfig } from '../config/index.js';

export default class Update extends Command {
  static description = 'Update the Forge Engine and Institutional Library to the latest version';

  async run(): Promise<void> {
    const config = await loadConfig();
    this.log(chalk.blue('\n🚀 Forge Engine Update Service\n'));

    const spinner = ora('Fetching latest updates from WibX Labs...').start();
    try {
      // 1. Git Pull
      execSync(`cd ${config.forgePath} && git pull origin main`, { stdio: 'pipe' });
      spinner.succeed('Repository synchronized.');

      // 2. Build CLI
      const buildSpinner = ora('Rebuilding Forge CLI...').start();
      execSync(`cd ${config.forgePath}/tools/forge-cli && npm install && npm run build`, { stdio: 'pipe' });
      buildSpinner.succeed('Engine rebuilt successfully.');

      this.log(chalk.green.bold('\n[SUCCESS] Forge is up to date and ready for action.\n'));
    } catch (error) {
      spinner.fail('Update failed.');
      this.log(chalk.red(`\nError: Could not update. Please check your internet connection or repository permissions.\n`));
      this.error(error as Error);
    }
  }
}
