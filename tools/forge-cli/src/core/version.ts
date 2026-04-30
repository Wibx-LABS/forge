import axios from 'axios';
import chalk from 'chalk';

const REMOTE_PACKAGE_URL = 'https://raw.githubusercontent.com/Wibx-LABS/forge/main/tools/forge-cli/package.json';

export async function checkForUpdates(currentVersion: string): Promise<void> {
  try {
    const response = await axios.get(REMOTE_PACKAGE_URL, { timeout: 2000 });
    const latestVersion = response.data.version;
    
    if (latestVersion !== currentVersion) {
      console.log(chalk.yellow(`\n[UPDATE] A new version of Forge is available: ${chalk.bold(latestVersion)}`));
      console.log(chalk.dim(`Current version: ${currentVersion}`));
      console.log(chalk.cyan(`Run ${chalk.bold('forge update')} to synchronize your engine.\n`));
    }
  } catch (err) {
    // Silent fail if offline or rate limited
  }
}
