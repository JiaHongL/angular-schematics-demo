import { chain, Rule } from '@angular-devkit/schematics';
import { buildComponent } from '@angular/cdk/schematics';

function getVersion(): string {
  const now = new Date();
  return 'v.' + now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate();
}

export function loginForm(options: any): Rule {
  return chain([
    buildComponent(
      {
        ...options,
        getVersion,
      }
    ),
  ]);
}
