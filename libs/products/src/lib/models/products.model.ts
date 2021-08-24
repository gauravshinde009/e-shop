import { Category } from "./category.model";

export class Product {
  _id?:string;
  name?:string;
  description?:string;
  richDescription?:string;
  image?:string;
  images?:string[];
  brand?:string;
  price?:string;
  category?:Category;
  countInStock?:number;
  rating?:number;
  numReviews?:string;
  isFeatured?:boolean;
  dateCreated?:string;
}
