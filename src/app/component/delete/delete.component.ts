import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IFecha, IPost } from 'src/app/model/model-interfaces';
import { DialogoConfirmacionComponent } from 'src/app/service/dialogo-confirmacion/dialogo-confirmacion.component';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

 
  id: number;
  titulo: string;
  cuerpo: string;
  fecha: IFecha;
  etiquetas: string;
  visible: boolean;
  Postid: number;
  result: number;

  constructor(
    private oPostService: PostService,    
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router,
    private dialogo: MatDialog) {
    this.getOne();
    
  
    
   }
 
  ngOnInit(): void {}
  
    getOne = () => {
      this.Postid = this.oActivatedRoute.snapshot.params.id
      this.oPostService.getOne(this.Postid).subscribe((oPost: IPost) => {
        this.id = oPost.id;
        this.titulo = oPost.titulo;
        this.cuerpo = oPost.cuerpo;
        this.fecha = oPost.fecha;
        this.etiquetas = oPost.etiquetas;
        this.visible = oPost.visible;
        setTimeout(()=>{   this.dialogo
          .open(DialogoConfirmacionComponent, {
            data: `¿Esta seguro de que quiere borrar el post?`
          })
          .afterClosed()
          .subscribe((confirmado: Boolean) => {
            if (confirmado) {
              this.oPostService.delete(this.id).subscribe(success => {
                this.result = success;
                                     
              });
              this.oRouter.navigate(['/plist'] ) 
            } else {
              alert("No se borrara el post)");
              this.oRouter.navigate(['/view/' + this.id])
            }
          });
          
          
      }, 2000);
      });
    };
  }


