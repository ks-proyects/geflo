import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';
import { BloqService } from 'src/services/bloq.service';

@Component({
  selector: 'app-bloques-edit',
  templateUrl: './bloques-edit.component.html',
  styleUrls: ['./bloques-edit.component.less']
})
export class BloquesEditComponent implements OnInit {
  isCreate = false;
  listSupervisores: any = [{
      id: 1,
      nombres: 'Freddy Castillo'
  }, {
      id: 2,
      nombres: 'Dayana Cualchi'
  }];
  constructor(
      public dialogRef: MatDialogRef <BloquesEditComponent> ,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private serviceBloq: BloqService,
      private snackBar: MatSnackBar) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  ngOnInit() {
    this.isCreate = !this.data.id;
  }

  saveBloq(){
    if(this.isCreate){
      this.data.fecha = Date.now();
      this.serviceBloq.createCoffeeOrder(this.data);
      this.snackBar.open('Guardado exitosamente!', null, {
        duration: 2000,
      });
    } else {
      this.serviceBloq.updateCoffeeOrder(this.data);
      this.snackBar.open('Actualizado exitosamente!', null, {
        duration: 2000,
      });
    }
    this.data = {};
  }
}