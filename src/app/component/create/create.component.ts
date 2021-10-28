import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { IFecha } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { MatDialog } from "@angular/material/dialog"
import { DialogoConfirmacionComponent } from 'src/app/service/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  
  postForm : FormGroup
  id: number

  constructor( 
    private oPostService: PostService,
    private FormBuilder: FormBuilder,
    private oRouter: Router,
    private dialogo: MatDialog,
    private forms :FormsModule,
    private reactive : ReactiveFormsModule.
    ) {

 
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

  onSubmit() {
    const postData = { titulo: this.postForm.get('titulo')!.value, 
    cuerpo: this.postForm.get('cuerpo')!.value,
    fecha: this.postForm.get('fecha')!.value + " " +this.postForm.get('hora')!.value,
    etiquetas: this.postForm.get('etiquetas')!.value, 
    visible: this.postForm.get('visible')!.value};
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
              alert("El post se ha publicado correctamente");
              this.oRouter.navigate(['/view/'+ id])
            } else {
              alert("Ha ocurrido un error");
            }                        
          });

        } else {
          alert("No se publicara el post)");
          
        }
      });
    
    
    return false;
  }

  
    

  
}
