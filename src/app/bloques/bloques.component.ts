import { Component, OnInit } from '@angular/core';
import { BloqService } from 'src/services/bloq.service';
import { MatSnackBar } from '@angular/material';

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
  ]
  constructor(private serviceBloq:BloqService,private snackBar: MatSnackBar) { }

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

}
