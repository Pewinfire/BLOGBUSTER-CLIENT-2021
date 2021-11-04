import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { PaginationService } from 'src/app/service/pagination.service';
import { PostService } from 'src/app/service/post.service';
declare let bootstrap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'blogBUSTER-client-2021';

  aPosts: IPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 10;
  order: string = 'fecha';
  dir: string = 'desc';
  filter: string = 'nulo';
  match: string = 'nulo';

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPaginationService: PaginationService,
    private oPostService: PostService
  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      localStorage.setItem('user', this.oActivatedRoute.snapshot.data.message);
    } else {
      localStorage.clear();
    }

    this.page = 1;
    this.getPage();
  }

 
  getPage = () => {
    this.oPostService.getPage(
      this.pageSize,
      this.page,
      this.order,
      this.dir,
      this.filter,
      this.match
    ).subscribe((oPage: IPage) => {
      this.aPosts = oPage.content;
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
    })
  }

  reset() {
    this.title = 'blogBUSTER-client-2021';
  }

  ngOnInit(): void {}
  jumpToPage = () => {
    this.getPage();
    return false;
  }
}
