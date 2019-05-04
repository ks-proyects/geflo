import {Component, OnInit} from '@angular/core';
import {BloqService} from 'src/services/bloq.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {BloquesEditComponent} from '../bloques-edit/bloques-edit.component';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.less']
})
export class BloquesComponent implements OnInit {
  bloqs: any = [];
  displayedColumns: string[] = ['nombre', 'supervisor', 'ubicacion', 'fecha', 'opciones'];
  constructor(private serviceBloq: BloqService, private snackBar: MatSnackBar, public dialog: MatDialog) {}
  ngOnInit() {
      this.serviceBloq.getCoffeeOrders().subscribe(data => {
          this.bloqs = data.map(e => {
              return {
                  id: e.payload.doc.id, ...e.payload.doc.data()
              } as {};
          });
      });
  }
  inactivar(item) {
      if (confirm('Desea Eliminar el Bloque?')) {
          this.serviceBloq.deleteCoffeeOrder(item);
          this.snackBar.open('Eliminado', null, {
              duration: 2000,
          });
      }
  }
  newBloq() {
      this.openDialog({});
  }
  openDialog(item): void {
      const dialogRef = this.dialog.open(BloquesEditComponent, {
          width: '80vw',
          data: {
              ...item
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
      });
  }
}