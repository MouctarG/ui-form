import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {InputTextComponent} from "./input-text/input-text.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormErrorBuilder} from "./shared/form-error";
import {JsonPipe} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTextComponent, JsonPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ui-form';
  form!: FormGroup
  formError!: FormErrorBuilder;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nom: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.formError = new FormErrorBuilder()
      .setRequired('Ce champ est requis')
      .setEmail('Email invalide')
      .setMinLength('Longueur minimale non respectée')
      .build();

  }


}
