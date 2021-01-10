import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { JoeComponentsModule } from './../../../joe-components/src/lib/joe-components.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    JoeComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
