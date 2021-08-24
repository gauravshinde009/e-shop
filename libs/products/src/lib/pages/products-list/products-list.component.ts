import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@gaurav-enterprises/products';
import { Category } from '../../models/category.model';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products:Product[] = [] ;
  categories:Category[] = [];
  trueVal:boolean = true;
  isCategoryPage = false;

  constructor(private productService:ProductsService,
    private categoryService:CategoriesService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      params.categoryId? this._getProducts([params.categoryId]):this._getProducts();
      params.categoryId?this.isCategoryPage = true:this.isCategoryPage=false;
    })

    this._getCategories()

  }

  categoryFilter(){
    const selectedCategories = this.categories.filter(c=>c.checked).map(category=>category._id);
    this._getProducts(selectedCategories)
  }

  private _getProducts(categoriesFilter?:string[]){
    this.productService.getProducts(categoriesFilter).subscribe(resProducts=>{
      this.products = resProducts;
    })
  }

  private _getCategories(){
    this.categoryService.getCategories().subscribe(resCats=>{
      this.categories = resCats;
    })
  }

}
