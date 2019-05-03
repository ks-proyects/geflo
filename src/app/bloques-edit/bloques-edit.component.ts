import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bloques-edit',
  templateUrl: './bloques-edit.component.html',
  styleUrls: ['./bloques-edit.component.less']
})
export class BloquesEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BloquesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
