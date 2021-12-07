
import { environment } from './../../environments/environment';
import { AddNewProductModule } from './../add-new-product/add-new-product.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {
  urlAddNewProductDB = environment.addNewProductDB
  constructor(private http: HttpClient) { }


  addNewProductPost(product: AddNewProductModule): Observable<Array<AddNewProductModule>> {
    return this.http.post<Array<AddNewProductModule>>(this.urlAddNewProductDB, product);
  };

  getProducts(): Observable<Array<AddNewProductModule>> {
    return this.http.get<Array<AddNewProductModule>>(this.urlAddNewProductDB);
  };
};
