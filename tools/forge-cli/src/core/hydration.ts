import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Surgical Markdown Extraction
 * Extracts specific ## sections from a markdown file.
 */
export function extractMarkdownSections(content: string, sections: string[]): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let capturing = false;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const header = line.replace('## ', '').trim().toLowerCase();
      const shouldStart = sections.some(s => {
        const target = s.toLowerCase();
        return header === target || header.startsWith(target + ' ') || header.startsWith(target + '.');
      });

      if (shouldStart) {
        capturing = true;
        result.push(line);
      } else {
        capturing = false;
      }
      continue;
    }

    if (capturing) {
      result.push(line);
    }
  }

  return result.length > 0 
    ? result.join('\n').trim() 
    : `<!-- No matching sections found for: ${sections.join(', ')} -->`;
}

/**
 * Hydrates a template string with project variables and knowledge injections.
 */
export async function hydrateTemplate(
  templateContent: string,
  variables: Record<string, string>
): Promise<string> {
  let result = templateContent;
  
  // Replace {{variable}} tags
  const tags = result.match(/{{[\w-]+}}/g) || [];
  const uniqueTags = Array.from(new Set(tags));

  for (const tag of uniqueTags) {
    const key = tag.slice(2, -2).toLowerCase();
    const replacement = variables[key] || tag;
    result = result.split(tag).join(replacement);
  }

  return result;
}
