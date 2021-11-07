import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { IFecha, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { MatDialog } from "@angular/material/dialog"
import { DialogoConfirmacionComponent } from '../../utils/dialogo-confirmacion/dialogo-confirmacion.component';




@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
 
    postForm : FormGroup
    result : number
    Postid: number
    fecha: IFecha
    check : String
    true: String
    checkbox: HTMLInputElement

    constructor( 
      private oPostService: PostService,
      private FormBuilder: FormBuilder,
      private oRouter: Router,
      private dialogo: MatDialog,
      private oActivatedRoute: ActivatedRoute,
      ) {
        if (oActivatedRoute.snapshot.data.message) {
          localStorage.setItem("user", oActivatedRoute.snapshot.data.message);
          
        } else {
          oRouter.navigate(['/home']);
          localStorage.clear();
        }
        this.Postid = this.oActivatedRoute.snapshot.params.id
        this.postForm = <FormGroup>this.FormBuilder.group({
          titulo: ['', [Validators.minLength(0)]],
          cuerpo: [''],
          fecha: [''],
          hora: [''],
          etiquetas: [],
          visible:[false]
        });
        this.getOne();
      }
    ngOnInit(): void {
    }
    
    getOne = () => {
      this.Postid = this.oActivatedRoute.snapshot.params.id
      this.oPostService.getOne(this.Postid).subscribe((oPost: IPost) => {
      this.checkbox =  <HTMLInputElement> document.getElementById("check") 
      this.postForm.setValue({
          titulo: oPost.titulo,
          cuerpo: oPost.cuerpo,
          fecha:  String(oPost.fecha.date.year).padStart(2,'0') +"-" + String(oPost.fecha.date.month).padStart(2,'0') + "-" + String(oPost.fecha.date.day).padStart(2,'0'),
          hora: String(oPost.fecha.time.hour).padStart(2,'0')  + ":" + String(oPost.fecha.time.minute).padStart(2,'0'), 
          etiquetas: oPost.etiquetas,
          visible : oPost.visible
        });
      
        if (oPost.visible = true)
        {
          
          this.checkbox.checked = true;
        }else{
        
          this.checkbox.checked = false;
        }
        
      });
    };
    checko(){
      this.checkbox =  <HTMLInputElement> document.getElementById("check")
      if (this.checkbox.checked){
        return true
      }else{
        return false
      }
}
 
    onSubmit() {
      const postData = { titulo: this.postForm.get('titulo')!.value, 
      id: this.oActivatedRoute.snapshot.params.id,
      cuerpo: this.postForm.get('cuerpo')!.value,
      fecha: this.postForm.get('fecha')!.value + " " +this.postForm.get('hora')!.value,
      etiquetas: this.postForm.get('etiquetas')!.value, 
      visible:this.checko()};
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
                
                this.oRouter.navigate(['/view/'+ this.Postid])
              } else {
                alert("Ha ocurrido un error");
              }                        
            });
  
          } else {
           
            //this.oRouter.navigate(['/plist'])
            
          }
        });
      
        
      
      return false;
    }
  
  
    
  }
  
