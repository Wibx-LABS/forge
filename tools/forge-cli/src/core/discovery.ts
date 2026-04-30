import * as fs from 'fs-extra';
import * as path from 'path';

export interface ProjectContext {
  type: 'pwa' | 'extension' | 'n8n' | 'vite' | 'static' | 'node' | 'python' | 'go' | 'rust' | 'docker' | 'nexos' | 'unknown';
  root: string;
  name: string;
}

/**
 * Discovers the project type based on file markers.
 */
export async function discoverProject(targetDir: string): Promise<ProjectContext> {
  const root = targetDir;
  const name = path.basename(root);

  const manifestPath = path.join(root, 'manifest.json');
  if (await fs.pathExists(manifestPath)) {
    const manifest = await fs.readJson(manifestPath);
    if (manifest.manifest_version) {
      return { type: 'extension', root, name };
    }
    if (manifest.display === 'standalone' || manifest.start_url) {
      return { type: 'pwa', root, name };
    }
  }

  if (await fs.pathExists(path.join(root, 'vite.config.ts')) || await fs.pathExists(path.join(root, 'vite.config.js'))) {
    return { type: 'vite', root, name };
  }

  // Check for n8n workflow files (often ending in .n8n.json)
  const files = await fs.readdir(root);
  if (files.some(f => f.endsWith('.n8n.json'))) {
    return { type: 'n8n', root, name };
  }

  if (await fs.pathExists(path.join(root, 'nexos-config.json'))) {
    return { type: 'nexos', root, name };
  }

  if (await fs.pathExists(path.join(root, 'package.json'))) {
    return { type: 'node', root, name };
  }

  if (await fs.pathExists(path.join(root, 'requirements.txt')) || await fs.pathExists(path.join(root, 'pyproject.toml'))) {
    return { type: 'python', root, name };
  }

  if (await fs.pathExists(path.join(root, 'index.html')) && !await fs.pathExists(path.join(root, 'package.json'))) {
    return { type: 'static', root, name };
  }

  if (await fs.pathExists(path.join(root, 'go.mod'))) {
    return { type: 'go', root, name };
  }

  if (await fs.pathExists(path.join(root, 'Cargo.toml'))) {
    return { type: 'rust', root, name };
  }

  if (await fs.pathExists(path.join(root, 'Dockerfile')) || await fs.pathExists(path.join(root, 'docker-compose.yml'))) {
    return { type: 'docker', root, name };
  }

  return { type: 'unknown', root, name };
}
