import { PaginationService } from '../../../service/pagination.service';
import { PostService } from '../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IDate, IPage, IPost } from 'src/app/model/model-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoPostComponent } from '../../utils/dialogo-post/dialogo-post.component';




@Component({
  selector: 'app-plist',
  templateUrl: './plist.component.html',
  styleUrls: ['./plist.component.css'],
})
export class PlistComponent implements OnInit {
  aPosts: IPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 10;
  strUrl: String = '';
  order: string = 'nulo';
  dir: string = 'nulo';
  filter: string = 'nulo';
  matchHtml:string = '';
  match: string = 'nulo';
  check: boolean;
  campos: string[] = [
    'id',
    'titulo',
    'cuerpo',
    'fecha',
    'etiquetas',
    'visible',
    'nulo'
  ]
  fa: string[] = [
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
  ]
  result: number;
  
  

  constructor(
    private oPaginationService: PaginationService,
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router,
    private dialogo: MatDialog,
  ) {
    if (oActivatedRoute.snapshot.data.message) {
      localStorage.setItem('user', oActivatedRoute.snapshot.data.message);
    } else {
      oRouter.navigate(['/home']);
      localStorage.clear();
    }

    this.page = 1;
    this.getPage();
  }

  ngOnInit(): void {}

 
  orderBut(order: string, imd: number) {
    console.log(this.dir, this.fa[imd], imd);
    if (order !== this.order) {
      this.dir == 'nulo';
      this.fa = [
        'fa fa-sort',
        'fa fa-sort',
        'fa fa-sort',
        'fa fa-sort',
        'fa fa-sort',
        'fa fa-sort',
      ]
    }
    if (this.dir === 'nulo') {
      this.order = order;
      this.fa[imd] = 'fa fa-sort-desc';
      this.dir = 'desc';
      this.getPage();
    } else if (this.dir === 'desc') {
      this.order = order;
      this.dir = 'asc';
      this.fa[imd] = 'fa fa-sort-asc';
      this.getPage();
    } else if (this.dir === 'asc') {
      this.order = 'nulo';
      this.dir = 'nulo';
      this.fa[imd] = 'fa fa-sort';
      this.getPage();
    }
    console.log(this.dir , this.fa[imd], imd);
  }
  filterOn(Match: string):void{
    
    if(Match.length <= 0){
      this.match= "nulo";
      
      this.getPage();
    }else{
      this.match = Match;
      console.log(  this.pageSize + " " +
        this.page + " " +
        this.order + " " +
        this.dir + " " +
        this.filter + " " +
        this.match)
      this.getPage();
    }
    
  }
  onCheck(check: boolean, Filter: string){
    if (check){
    this.filter=Filter;
    console.log(this.filter);
  }else{
    this.filter="nulo";
    console.log(this.filter);
    }
    
  }


  getPage = () => {
    this.oPostService
      .getPage(
        this.pageSize,
        this.page,
        this.order,
        this.dir,
        this.filter,
        this.match
      )
      .subscribe((oPage: IPage) => {
        this.aPosts = oPage.content;
        this.totalElements = oPage.totalElements;
        this.totalPages = oPage.totalPages;
        this.barraPaginacion = this.oPaginationService.pagination(
          this.totalPages,
          this.page
        );
      });
  };
  updateVis(oPost: IPost){
    var postData = {
      id: String(oPost.id),
      titulo: oPost.titulo,
      cuerpo: oPost.cuerpo,
      fecha:  String(oPost.fecha.date.year).padStart(2,'0') +"-" + String(oPost.fecha.date.month).padStart(2,'0') + "-" + String(oPost.fecha.date.day).padStart(2,'0') +" " + String(oPost.fecha.time.hour).padStart(2,'0')  + ":" + String(oPost.fecha.time.minute).padStart(2,'0'), 
      etiquetas: oPost.etiquetas,
      visible : oPost.visible
    }
    if(oPost.visible){
      postData.visible = false
      console.log("update", postData);  
    }else{
      postData.visible = true
      console.log("update", postData);
    }
    this.oPostService.update(JSON.stringify(postData)).subscribe(success => {
      this.result = success;
      if (this.result == 1) {
        this.getPage();
      } else {
        alert("Ha ocurrido un error");
      }                        
    });
   
   
  }
  modal(fila : IPost ){
      const dialogConfig = new MatDialogConfig;
      dialogConfig.data={
      
        id: fila.id,
        titulo: fila.titulo,
        cuerpo: fila.cuerpo,
        fecha: fila.fecha,
        etiquetas: fila.etiquetas,
        visible: fila.visible
      }
      this.dialogo.open(DialogoPostComponent, dialogConfig);
      ;
  };
}
