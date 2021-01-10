import { AfterViewInit, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const PASSWORD_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PasswordInputComponent),
  multi: true
};

@Component({
  selector: 'joe-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [PASSWORD_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PasswordInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input() placeholder: string;

  protected destroy$ = new Subject<any>();

  control: AbstractControl = new FormControl();

  @Input('formControl') set formControl(formControl: AbstractControl) {
    this.control = formControl;
  }

  onChange: (value) => void;

  onTouched: () => void;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => this.noticeValueChange(val));
  }

  noticeValueChange(val) {
    if (this.onChange) {
      this.onChange(val);
    }
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control?.disable() : this.control?.enable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
