import { LibrosFormComponent } from './libros-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LibrosFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LibrosFormComponent]
})
export class LibrosFormModule { }
