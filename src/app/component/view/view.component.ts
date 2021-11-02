import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFecha, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  titulo: string;
  cuerpo: string;
  fecha: IFecha;
  etiquetas: string;
  visible: boolean;
  Postid: number;
  
   
  constructor(
    private oPostService: PostService,    
    private oActivatedRoute: ActivatedRoute) {
    this.getOne();
    
    
   }
 
  ngOnInit(): void {}
    getOne = () => {
      this.Postid = this.oActivatedRoute.snapshot.params.id
      this.oPostService.getOne(this.Postid).subscribe((oPost: IPost) => {
        this.titulo = oPost.titulo;
        this.cuerpo = oPost.cuerpo;
        this.fecha = oPost.fecha;
        this.etiquetas = oPost.etiquetas;
        this.visible = oPost.visible;
     
      });
    };
  
 
     
     
  }