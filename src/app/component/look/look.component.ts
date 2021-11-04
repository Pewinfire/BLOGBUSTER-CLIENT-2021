import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/model/model-interfaces';

@Component({
  selector: 'app-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.css']
})
export class LookComponent implements OnInit {
  @Input() oPost: IPost;
  lookWidth: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
