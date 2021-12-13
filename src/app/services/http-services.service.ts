import { signUpModel } from './../models/signUpModel';
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
  urlDistributorListDB = environment.distributorListDB;
  constructor(private http: HttpClient) { }


  addNewProductPost(product: AddNewProductModule): Observable<Array<AddNewProductModule>> {
    return this.http.post<Array<AddNewProductModule>>(this.urlAddNewProductDB, product);
  };
  addSoldProductPost(soldProduct: salesModel): Observable<Array<salesModel>> {
    return this.http.post<Array<salesModel>>(this.urlSoldProductDB, soldProduct);
  };

  getSoldProducts(): Observable<Array<salesModel>> {
    return this.http.get<Array<salesModel>>(this.urlSoldProductDB);
  };
  getProducts(): Observable<Array<AddNewProductModule>> {
    return this.http.get<Array<AddNewProductModule>>(this.urlAddNewProductDB);
  };

  addDistributor(newDistributor: signUpModel): Observable<Array<signUpModel>> {
    return this.http.post<Array<signUpModel>>(this.urlDistributorListDB, newDistributor);
  };
  getDistributors(): Observable<Array<signUpModel>> {
    return this.http.get<Array<signUpModel>>(this.urlDistributorListDB);
  };

  editDistributorProtegeInfo(statement: signUpModel): Observable<signUpModel> {
    return this.http.put<signUpModel>(`${this.urlDistributorListDB}/${statement.id}`, statement);
  };
};
