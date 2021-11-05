import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { IFecha } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { MatDialog } from "@angular/material/dialog"
import { DialogoConfirmacionComponent } from 'src/app/utils/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  
  postForm : FormGroup
  id: number
  checkbox: HTMLInputElement

  constructor( 
    private oPostService: PostService,
    private FormBuilder: FormBuilder,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private dialogo: MatDialog,
    private forms :FormsModule,
 
    ) {
      if (oActivatedRoute.snapshot.data.message) {
        localStorage.setItem("user", oActivatedRoute.snapshot.data.message);
        
      } else {
        localStorage.clear();
        oRouter.navigate(['/home']);
      }
 
      this.postForm = <FormGroup>this.FormBuilder.group({
        titulo: ['', [Validators.minLength(0)]],
        cuerpo: [''],
        fecha: [''],
        hora: [''],
        etiquetas: [],
        visible:[false]
      });
    }
  ngOnInit(): void {
  }
  checked(){
    this.checkbox =  <HTMLInputElement> document.getElementById("check")
    if (this.checkbox.checked){
      return true
    }else{
      return false
    }
}
  onSubmit() {
    const postData = { titulo: this.postForm.get('titulo')!.value, 
    cuerpo: this.postForm.get('cuerpo')!.value,
    fecha: this.postForm.get('fecha')!.value + " " +this.postForm.get('hora')!.value,
    etiquetas: this.postForm.get('etiquetas')!.value, 
    visible: this.checked()};
    console.log("post:onSubmit: ", postData);
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de que quiere publicar el post?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.oPostService.create(JSON.stringify(postData)).subscribe(id => {
            this.id = id;
            if (id != null) {
              
              this.oRouter.navigate(['/view/'+ id])
            } else {
              alert("Ha ocurrido un error");
            }                        
          });

        } else {
          
          
        }
      });
    
    
    return false;
  }

  
    

  
}
