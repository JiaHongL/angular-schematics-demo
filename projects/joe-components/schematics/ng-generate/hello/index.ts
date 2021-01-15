import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

/**
 * hello world schematic 的 factory
 *
 * @export
 * @param options - 從命令列取得的相關參數
 * @returns Rule - 回傳一組異動規則
 */
export function hello(options: Schema): Rule {

  // 回傳一個異動的規則
  return (tree: Tree, context: SchematicContext) => {

    // 取得 angular.json 的資訊
    const workspaceConfig = JSON.parse(tree.read('/angular.json').toString());

    // 取得要處理的 project (指定的 or 專案預設)
    const project = options.project || workspaceConfig.defaultProject;

    // 取得 project 路徑
    const sourceRoot = workspaceConfig.projects[project].sourceRoot;

    // 利用 tree 提供的 create，在專案底下建立一個 hello.ts 檔案，裡面寫入一行 console.log
    tree.create(`${sourceRoot}/hello.ts`, `console.log('hello ${options.userName}');`);

    // 回傳變動的 tree
    return tree;

  };

}
