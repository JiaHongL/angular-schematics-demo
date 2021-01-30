import { Schema } from './schema';

import {
  NodeDependencyType,
  addPackageJsonDependency,
} from '@schematics/angular/utility/dependencies';

import {
  apply, applyTemplates, chain, externalSchematic, MergeStrategy,
  mergeWith, Rule, SchematicContext, Tree, url
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

/**
 * seeds project 的 factory
 *
 * @export
 * @param options - 從命令列取得的相關參數
 * @returns Rule - 回傳一組異動規則
 */
export function seedsProject(options: Schema): Rule {

  // 回傳一個異動的規則
  return (tree: Tree, context: SchematicContext) => {

    return chain([
      // 1.建立 Angular 專案
      createNgProject(options.name),
      log('✅️ 建立 Angular 專案成功!'),
      // 2.add joe-components 套件 依賴
      addJoeComponentsDependency(options),
      log('✅️ 增加 joe-components 套件依賴成功!'),
      // 3.覆寫初始化的專案
      overwriteProject(options),
      log('✅️ 覆寫專案成功!'),
    ]);

  };

}

/**
 * 建立 Angular 專案
 *
 * @param  name - 專案名稱
 * @returns - Rule
 */
function createNgProject(name: string): Rule {

  return externalSchematic('@schematics/angular', 'ng-new', {
    name,
    directory: name,
    version: '11.0.0',
    routing: true,
    style: 'scss'
  }, {
    interactive: false
  });

}

/**
 * 增加 JoeComponents library  dependency
 *
 * @param - options
 * @returns - Rule
 */
function addJoeComponentsDependency(options: Schema): Rule {

  return (tree: Tree, context: SchematicContext) => {

    const pkgJsonPath = `./${options.name}/package.json`;

    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Default,
      version: '1.0.5',
      name: 'joe-components',
    }, pkgJsonPath);

    return tree;

  };

}

/**
 * 覆寫 原始的專案
 *
 * @param - options
 * @returns - Rule
 */
function overwriteProject(options: Schema): Rule {

  return (tree: Tree, context: SchematicContext) => {

    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...options,
        ...strings
      }),
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite);

  };

}

/**
 * 顯示 log
 *
 * @param message - 要顯示的訊息
 * @returns - Rule
 */
function log(message: string): Rule {

  return (tree: Tree, context: SchematicContext) => {

    context.logger.info(`${message}`);

    return tree;

  };

}
