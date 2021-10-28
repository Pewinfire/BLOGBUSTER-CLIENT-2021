import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { IFecha, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { MatDialog } from "@angular/material/dialog"
import { DialogoConfirmacionComponent } from 'src/app/service/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
 
    postForm : FormGroup
    result : number
    Postid: number
    fechaVacia: IFecha
  
    constructor( 
      private oPostService: PostService,
      private FormBuilder: FormBuilder,
      private oRouter: Router,
      private dialogo: MatDialog,
      private oActivatedRoute: ActivatedRoute
      ) {
        this.Postid = this.oActivatedRoute.snapshot.params.id
       
        this.postForm = <FormGroup>this.FormBuilder.group({
          titulo: ['', [Validators.minLength(0)]],
          cuerpo: [''],
          fecha: [''],
          hora: [''],
          etiquetas: [],
          visible:[true]
        });
        this.getOne();
      }
    ngOnInit(): void {
    }
    
    getOne = () => {
      this.Postid = this.oActivatedRoute.snapshot.params.id
      this.oPostService.getOne(this.Postid).subscribe((oPost: IPost) => {

        this.postForm.setValue({
          titulo: oPost.titulo,
          cuerpo: oPost.cuerpo,
          fecha: oPost.fecha.date,
          hora: oPost.fecha.time,
          etiquetas: oPost.etiquetas,
          visible: oPost.visible
        });
        this.fechaVacia = oPost.fecha;
      });
    };
    onSubmit() {
      const postData = { titulo: this.postForm.get('titulo')!.value, 
      id: this.oActivatedRoute.snapshot.params.id,
      cuerpo: this.postForm.get('cuerpo')!.value,
      fecha: this.postForm.get('fecha')!.value + " " +this.postForm.get('hora')!.value,
      etiquetas: this.postForm.get('etiquetas')!.value, 
      visible: this.postForm.get('visible')!.value};
      console.log("post:onSubmit: ", postData);
  
      this.dialogo
        .open(DialogoConfirmacionComponent, {
          data: `¿Esta seguro de que quiere modficar el post?`
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.oPostService.update(JSON.stringify(postData)).subscribe(success => {
              this.result = success;
              if (this.result == 1) {
                alert("El post se ha modificado correctamente");
                this.oRouter.navigate(['/view/'+ this.Postid])
              } else {
                alert("Ha ocurrido un error");
              }                        
            });
  
          } else {
            alert("No se modificara el post)");
            this.oRouter.navigate(['/plist'])
            
          }
        });
      
      
      return false;
    }
  
    
      
  
    
  }
  
