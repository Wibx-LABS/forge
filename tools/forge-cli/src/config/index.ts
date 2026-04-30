import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';

export interface ForgeConfig {
  forgePath: string;
  defaultAutonomyLevel: 'full' | 'phase-gated' | 'task-gated' | 'manual';
}

const DEFAULTS: ForgeConfig = {
  forgePath: path.join(os.homedir(), '.forge-framework'),
  defaultAutonomyLevel: 'phase-gated',
};

function loadRcFile(filePath: string): Partial<ForgeConfig> {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readJsonSync(filePath);
    }
  } catch {
    // Silent — malformed rc file falls back to defaults
  }
  return {};
}

let _cached: ForgeConfig | null = null;

export function loadConfig(): ForgeConfig {
  // 1. Priority: Environment Variable
  if (process.env.FORGE_HOME) {
    return { ...DEFAULTS, forgePath: path.resolve(process.env.FORGE_HOME) };
  }

  // 2. Secondary: .forgerc.json in home directory
  const configPath = path.join(os.homedir(), '.forgerc.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = fs.readJsonSync(configPath);
      if (config.forgePath) return { ...DEFAULTS, ...config, forgePath: path.resolve(config.forgePath) };
    } catch (e) {}
  }

  // 3. Fallback: Recursive Self-detection
  let current = __dirname;
  while (current !== path.parse(current).root) {
    const checkPath = path.join(current, 'agents_library');
    if (fs.existsSync(checkPath)) {
      return { ...DEFAULTS, forgePath: current };
    }
    current = path.dirname(current);
  }

  // 4. Final Fallback: Standard installation path
  return { ...DEFAULTS };
}

export function clearConfigCache(): void {
  _cached = null;
}

export function getForgeDir(projectPath: string): string {
  return path.join(projectPath, '.forge');
}

export function getTemplatePath(config: ForgeConfig, templateName: string): string {
  return path.join(config.forgePath, 'templates', templateName);
}

export function getAgentLibraryPath(config: ForgeConfig): string {
  return path.join(config.forgePath, 'agents_library');
}
