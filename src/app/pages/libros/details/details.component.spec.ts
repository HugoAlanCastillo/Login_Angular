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

  libro: Libros = null;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private librosSvc: LibrosService) {
    const navigation = this.router.getCurrentNavigation();
    this.libro = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.libro === 'undefined') {
      this.router.navigate(['list']);
    }
  }

  editLibro(): void {
    this.navigationExtras.state.value = this.libro;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async deleteLibro(): Promise<void> {
    try {
      await this.librosSvc.onEliminar(this.libro?.id);
      alert('Deleted');
      this.regresarInicio();
    } catch (err) {
      console.log(err);
    }
  }

  regresarInicio(): void {
    this.router.navigate(['list']);
  }


}
