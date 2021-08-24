import { OrderItem } from "./order-item.model";
import { User } from "@gaurav-enterprises/users";

export class Order{
  _id?:string;
  orderItems?:OrderItem[];
  shippingAddress1?:string;
  shippingAddress2?:string;
  city?:string;
  zip?:string;
  country?:string;
  phone?:string;
  status?:number;
  totalPrice?:string;
  user?:any;
  dateOrdered?:string;
}