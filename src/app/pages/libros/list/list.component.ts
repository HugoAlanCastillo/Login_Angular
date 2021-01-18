import { LibrosService } from '../libros.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  libros$ = this.librosSvc.libros;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private librosSvc: LibrosService) { }

  ngOnInit(): void {
  }

  editarLibro(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  verLibro(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  async eliminarLibro(empId: string): Promise<void> {
    try {
      await this.librosSvc.onEliminar(empId);
      alert('Deleted');
    } catch (err) {
      console.log(err);
    }
  }



}
