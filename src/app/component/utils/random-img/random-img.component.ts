import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-img',
  templateUrl: './random-img.component.html',
  styleUrls: ['./random-img.component.css']
})
export class RandomImgComponent implements OnInit {
 
  image: String ;
  constructor() { 
    
  }

  ngOnInit(): void {
    this.randomImg();
  }
  
  randomImg(){
    
    this.image = '../../../assets/img/random/' + String(Math.round(Math.random()*(7-1)+1)) + '.jpg';
    return this.image;
  } 
}
