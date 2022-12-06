import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { DayPluginGeneratorSchema } from './schema';

interface NormalizedSchema extends DayPluginGeneratorSchema {
  projectRoot: string;
}

function normalizeOptions(
  tree: Tree,
  options: DayPluginGeneratorSchema
): NormalizedSchema {
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/middleware/src/days`;
  return {
    ...options,
    projectRoot,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: DayPluginGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
