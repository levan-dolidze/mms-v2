import { salesModel } from './../models/salesModel';

import { environment } from './../../environments/environment';
import { AddNewProductModule } from './../add-new-product/add-new-product.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {
  urlAddNewProductDB = environment.addNewProductDB;
  urlSoldProductDB = environment.soldProductsDB;
  constructor(private http: HttpClient) { }


  addNewProductPost(product: AddNewProductModule): Observable<Array<AddNewProductModule>> {
    return this.http.post<Array<AddNewProductModule>>(this.urlAddNewProductDB, product);
  };
  addSoldProductPost(soldProduct: salesModel): Observable<Array<salesModel>> {
    return this.http.post<Array<salesModel>>(this.urlSoldProductDB, soldProduct);
  }

  getSoldProducts(): Observable<Array<salesModel>> {
    return this.http.get<Array<salesModel>>(this.urlSoldProductDB);
  }
  getProducts(): Observable<Array<AddNewProductModule>> {
    return this.http.get<Array<AddNewProductModule>>(this.urlAddNewProductDB);
  };
};
