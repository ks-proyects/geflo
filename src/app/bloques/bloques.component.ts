import { Component, OnInit, Inject } from '@angular/core';
import { BloqService } from 'src/services/bloq.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BloquesEditComponent } from '../bloques-edit/bloques-edit.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface DialogData {
  animal: string;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.less']
})
export class BloquesComponent implements OnInit {
  bloq: any = {};
  bloqs: any = [];
  workerSupervisores: any = [{
    id: 1,
    nombres: 'Freddy Castillo'
    }, {
        id: 2,
        nombres: 'Dayana Cualchi'
    }
  ];
  displayedColumns: string[] = ['nombre', 'supervisor', 'ubicacion', 'fecha', 'opciones'];
  dataSource = ELEMENT_DATA;
  constructor(private serviceBloq:BloqService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.serviceBloq.getCoffeeOrders().subscribe(data => {
      this.bloqs = data.map(e => {
        return {id: e.payload.doc.id, ...e.payload.doc.data()} as {};
      });
    });
  }
  saveBloq(){
    if(!this.bloq.id){
      this.bloq.fecha = Date.now();
      this.serviceBloq.createCoffeeOrder(this.bloq);
      this.snackBar.open('Guardado exitosamente!', null, {
        duration: 2000,
      });
    }else{
      this.serviceBloq.updateCoffeeOrder(this.bloq);
      this.snackBar.open('Actualizado exitosamente!', null, {
        duration: 2000,
      });
    }
    this.bloq = {};
  } 
  selBloq(item){
    this.bloq=item;
  }
  selBloqNew(){
    this.bloq={};
  }
  inactivar(item){
    if(confirm('Desea Eliminar el Bloque?')) {
      this.serviceBloq.deleteCoffeeOrder(item);
      this.bloq = {};
      this.snackBar.open('Eliminado', null, {
        duration: 2000,
      });
    }
  }
  openDialog(item): void {
    this.bloq = item;
    const dialogRef = this.dialog.open(BloquesEditComponent, {
      width: '250px',
      data: this.bloq
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bloq = {};
    });
  }
}

