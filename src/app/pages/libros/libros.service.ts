import { Libros } from 'src/app/shared/models/libros.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  libros: Observable<Libros[]>;

  private librosCollection: AngularFirestoreCollection<Libros>;

  constructor(private readonly afs: AngularFirestore) {
    this.librosCollection = afs.collection<Libros>('libros');
    this.getLibros();
  }


  onEliminar(empId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.librosCollection.doc(empId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onGuardar(libros: Libros, empId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = empId || this.afs.createId();
        const data = { id, ...libros };
        const result = await this.librosCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);

        
      }
    });
  }


  private getLibros(): void {
    this.libros = this.librosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Libros))
    );
  }
}