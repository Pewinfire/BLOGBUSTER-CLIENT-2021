import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../model/model-interfaces';
import { DialogoPostComponent } from '../service/dialogo-post/dialogo-post.component';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
 
 oPost : IPost;
 Postid : number;
  
   
  constructor(
    private oPostService: PostService,    
    private oActivatedRoute: ActivatedRoute,
  ) {
    this.getOne();
    
    
   }
 
  ngOnInit(): void {}

    getOne = () => {
      this.Postid = this.oActivatedRoute.snapshot.params.id
      this.oPostService.getOne(this.Postid).subscribe((Post: IPost) => {
       this.oPost = Post;
     
      });
    };
}
