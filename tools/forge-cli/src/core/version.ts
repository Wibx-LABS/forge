import axios from 'axios';
import chalk from 'chalk';

const GITHUB_REPO = 'Wibx-LABS/forge';

export async function checkForUpdates(currentVersion: string): Promise<void> {
  try {
    const response = await axios.get(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      timeout: 2000
    });
    
    const latestVersion = response.data.tag_name.replace('v', '');
    
    if (latestVersion !== currentVersion) {
      console.log(chalk.yellow(`\n[UPDATE] A new version of Forge is available: ${chalk.bold(latestVersion)}`));
      console.log(chalk.dim(`Current version: ${currentVersion}`));
      console.log(chalk.cyan(`Run 'curl -sL https://raw.githubusercontent.com/${GITHUB_REPO}/main/install.sh | bash' to update.\n`));
    }
  } catch (err) {
    // Silent fail if offline or rate limited
  }
}
