import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

export function hello(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspaceConfig = JSON.parse(tree.read('/angular.json').toString());
    const project = options.project || workspaceConfig.defaultProject;
    const sourceRoot = workspaceConfig.projects[project].sourceRoot;
    tree.create(`${sourceRoot}/hello.ts`, `console.log('hello ${options.userName}');`);
    return tree;
  };
}
