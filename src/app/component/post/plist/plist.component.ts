import { PaginationService } from './../../../service/pagination.service';
import { PostService } from './../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { ActivatedRoute, Router } from '@angular/router';

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
  ]
  fa: string[] = [
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
    'fa fa-sort',
  ]
  
  

  constructor(
    private oPaginationService: PaginationService,
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
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
}
