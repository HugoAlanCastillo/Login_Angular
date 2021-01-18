import { LibrosService } from './../../../pages/libros/libros.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Libros } from '../../models/libros.interface';

@Component({
  selector: 'app-libros-form',
  templateUrl: './libros-form.component.html',
  styleUrls: ['./libros-form.component.scss']
})
export class LibrosFormComponent implements OnInit {

  libros: Libros;
  librosForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private router: Router, private fb: FormBuilder, private librosSvc: LibrosService) {
    const navigation = this.router.getCurrentNavigation();
    this.libros = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.libros === 'undefined') {
      this.router.navigate(['new']);
    } else {
      this.librosForm.patchValue(this.libros);
    }
  }

  onSave(): void {
    console.log('Saved', this.librosForm.value);
    if (this.librosForm.valid) {
      const libros = this.librosForm.value;
      const librosId = this.libros?.id || null;
      this.librosSvc.onGuardar(libros, librosId);
      this.librosForm.reset();
    }

  }

  regresarLista(): void {
    this.router.navigate(['list']);
  }

  regresarInicio(): void {
    this.router.navigate(['home']);
  }

  isValidField(field: string): string {
    const validatedField = this.librosForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.librosForm = this.fb.group({
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
      pag: ['', [Validators.required]],
      sinopsis: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
    });
  }

}
