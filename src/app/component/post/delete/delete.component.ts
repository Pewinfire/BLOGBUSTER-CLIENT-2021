import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IFecha, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { DialogoConfirmacionComponent } from '../../utils/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

 
  dPost: IPost;
  Postid: number;
  result: number;

  constructor(
    private oPostService: PostService,    
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router,
    private dialogo: MatDialog) {
      if (oActivatedRoute.snapshot.data.message) {
        localStorage.setItem("user", oActivatedRoute.snapshot.data.message);
    
      } else {
        oRouter.navigate(['/home']);
        localStorage.clear();
      }
    this.getOne();
    
  
    
   }
 
  ngOnInit(): void {}
  
    getOne = () => {
      this.Postid = this.oActivatedRoute.snapshot.params.id
      this.oPostService.getOne(this.Postid).subscribe((oPost: IPost) => {
       this.dPost=oPost;
        setTimeout(()=>{   this.dialogo
          .open(DialogoConfirmacionComponent, {
            data: `¿Esta seguro de que quiere borrar el post?`
          })
          .afterClosed()
          .subscribe((confirmado: Boolean) => {
            if (confirmado) {
              this.oPostService.delete(this.dPost.id).subscribe(success => {
                this.result = success;
                                     
              });
              this.oRouter.navigate(['/plist'] ) 
            } else {
              
              this.oRouter.navigate(['/view/' + this.dPost.id])
            }
          });
          
          
      }, 3500);
      });
    };
  }


