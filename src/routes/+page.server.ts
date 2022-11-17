import fs from 'fs/promises';
import path from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const policiesDir = path.join('cerbos', 'policies');
  const policyFiles = await fs.readdir(policiesDir);
  const policySources = await Promise.all(
    policyFiles.map((filename) => fs.readFile(path.join(policiesDir, filename), 'utf-8'))
  );
  const policySource = Object.fromEntries(
    policyFiles.map((filename, i) => [filename, policySources[i]])
  );

  const getResourcesApiSource = fs.readFile(
    path.join('src', 'routes', 'api', 'getResources', '+server.ts'),
    'utf-8'
  );

  return {
    policySource,
    getResourcesApiSource,
  };
};
