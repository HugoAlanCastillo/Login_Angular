import { LibrosService } from './../libros.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/shared/models/libros.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  libros: Libros = null;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private librosSvc: LibrosService) {
    const navigation = this.router.getCurrentNavigation();
    this.libros = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.libros === 'undefined') {
      this.router.navigate(['list']);
    }
  }

  verLibro(): void {
    this.navigationExtras.state.value = this.libros;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async eliminarLibro(): Promise<void> {
    try {
      await this.librosSvc.onEliminar(this.libros?.id);
      alert('Deleted');
    } catch (err) {
      console.log(err);
    }
  }

  regresarLista(): void {
    this.router.navigate(['list']);
  }

  regresarInicio(): void {
    this.router.navigate(['home']);
  }
}
