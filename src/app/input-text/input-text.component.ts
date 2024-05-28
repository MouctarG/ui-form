import {AfterViewInit, Component, forwardRef, Input, NgModule, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})

export class InputTextComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('inputElement', { static: true }) inputElement: any;
  @ViewChild('labelElement', { static: true }) labelElement: any;

  @Input() idInput = '';
  @Input() nameInput = '';
  @Input() hintInput = '';
  @Input() isRequired = false;
  @Input() labelInput = '';
  @Input() showError: boolean = false;
  @Input() errors?: string[] | null;
  @Input() maxCharacters: number | null = null;
  @Input() maxCharactersLabel: string | null = null;
  @Input() isDisabled = false;
  @Input()
  isDarkMode: boolean = false;


  value: string = '';
  touched = false;
  disabled = false;
  isDirty = false;

  constructor(private _renderer: Renderer2) {}

  onChange = (value: string) => {};
  onTouched = () => {};

  ngAfterViewInit() {
    this.setDisabledElement(this.disabled);
  }

  writeValue(value: string): void {
    this.value = value;
    this.isDirty = false;
    this.onChange(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.setDisabledElement(isDisabled);
  }

  setDisabledElement(isDisabled: boolean) {
    if (this.inputElement && this.labelElement) {
      if (isDisabled) {
        this._renderer.setAttribute(this.inputElement.nativeElement, 'disabled', '');
        this._renderer.setAttribute(this.labelElement.nativeElement, 'disabled', '');
      } else {
        this._renderer.removeAttribute(this.inputElement.nativeElement, 'disabled');
        this._renderer.removeAttribute(this.labelElement.nativeElement, 'disabled');
      }
    }
  }

}
