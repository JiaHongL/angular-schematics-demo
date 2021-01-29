import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input/text-input.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    ButtonComponent,
    PasswordInputComponent,
    TextInputComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    PasswordInputComponent,
    TextInputComponent
  ]
})
export class JoeComponentsModule {}
