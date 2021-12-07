import { salesModel } from './../models/salesModel';
import { Subscription } from 'rxjs';
import { AddNewProductModule } from './../add-new-product/add-new-product.module';
import { HttpServicesService } from './../services/http-services.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css', '../common-css.css']
})
export class SalesComponent implements OnInit, OnDestroy {
  viewMode = "showProductForm";
  productNamesAndCodes: Array<AddNewProductModule> = [];
  soldProducts: Array<salesModel> = [];
  soldProductDist: Subscription;
  productNameAndCodeDist: Subscription;
  constructor(private httpservice: HttpServicesService) { }

  ngOnInit(): void {
    this.returnProductNameAndCode();


  }
  returnProductNameAndCode() {
    this.productNameAndCodeDist = this.httpservice.getProducts().subscribe((response) => {
      this.productNamesAndCodes = response;
     
    });
  };

  sortProductName(productNamesAndCodes: any) {
    const sortedProductNameLists = productNamesAndCodes.sort((a: any, b: any) => {
      if (a.productName > b.productName) {
        return 1
      }
      else if (a.productName < b.productName) {
        return -1
      }
      else {
        return 0
      }
    })
    return sortedProductNameLists;
  };


  sortProductCode(productNamesAndCodes: Array<any>) {
    const sortedProductCodeLists = productNamesAndCodes.sort((a: any, b: any) => {
      if (a.productCode > b.productCode) {
        return 1
      }
      else if (a.productCode < b.productCode) {
        return -1
      }
      else {
        return 0
      }
    })
    return sortedProductCodeLists;
  }

  returnSortedProductCodeList(productNamesAndCodes: Array<any>) {
    return this.sortProductCode(productNamesAndCodes)
  }

  returnSortedProductNameList(productNamesAndCodes: Array<any>) {

    return this.sortProductName(productNamesAndCodes);
  };

  returnSoldProductList(soldProducts: any) {
    return soldProducts
  }
  ngOnDestroy() {
    (this.productNameAndCodeDist) ? this.productNameAndCodeDist.unsubscribe() : false;
    (this.soldProductDist) ? this.soldProductDist.unsubscribe() : false;
  }
};
