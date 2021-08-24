import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  selectedImageUrl:any = '';

  @Input() images:any;

  constructor() { }

  ngOnInit(): void {
    this.selectedImageUrl = this.images[0];
  }

  changeSelectedImage(imageUrl:string){
    this.selectedImageUrl = imageUrl
  }

  get hasImages(){
    return this.images?.length >0;
  }
}
