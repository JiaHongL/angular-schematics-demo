import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

/**
 * hello world schematic 的 factory
 *
 * @export
 * @param options - 從命令列取得的相關參數
 * @returns Rule - 回傳一組異動規則
 */
export function info(options: Schema): Rule {

  // 回傳一個異動的規則
  return (tree: Tree, context: SchematicContext) => {

    // 取得 angular.json 的資訊
    const workspaceConfig = JSON.parse(tree.read('/angular.json').toString());

    // 取得要處理的 project (指定的 or 專案預設)
    const project = options.project || workspaceConfig.defaultProject;

    // 取得 project 路徑
    const sourceRoot = workspaceConfig.projects[project].sourceRoot;

    // 要建立的路徑
    const path = `${sourceRoot}/info.ts`;

    // 判斷檔案是否存在，存在則覆寫，不存在則建立
    tree.exists(path) ? tree.overwrite(path, generateInfo(options)) : tree.create(path, generateInfo(options));

    // 回傳變動的 tree
    return tree;

  };

}

function generateInfo(options: Schema): string {

  console.log('options', options);

  const { userName, workExperience, job, programmingLanguages, isEmployed } = options;

  return `
  const info = {
    userName: '${userName}',
    workExperience: ${workExperience},
    job: '${job}',
    programmingLanguages:[${programmingLanguages}],
    isEmployed: ${isEmployed}
  };
  `;

}
