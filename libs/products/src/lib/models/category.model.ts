export class Category {
  _id:string;
  name?:string;
  icon?:string;
  color?:string;
  checked?:boolean;

  constructor(_id:string){
    this._id = _id;
  }
}
