import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  IPost } from 'src/app/model/model-interfaces';

@Component({
  selector: 'app-dialogo-post',
  templateUrl: './dialogo-post.component.html',
  styleUrls: ['./dialogo-post.component.css'],
})
export class DialogoPostComponent implements OnInit {
  oPost: IPost;
 
  constructor(
    public dialogRef: MatDialogRef<DialogoPostComponent>,
    @Inject(MAT_DIALOG_DATA) data: IPost) {
      this.oPost = data;
    }
    ngOnInit() {
      this.dialogRef.updateSize('75%', '75%');
    }
    openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose;
    dialogConfig.hasBackdrop;
    
 
  }

    confirmado(): void {
      this.dialogRef.close(true);
    }

 
}
