import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, AbstractFormGroupDirective } from '@angular/forms';
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
  viewModeSearch = "showSearchForm"
  productNamesAndCodes: Array<AddNewProductModule> = [];
  soldProducts: Array<salesModel> = [];
  soldProductDist: Subscription;
  productNameAndCodeDist: Subscription;
  soldProductForm: FormGroup;
  searchForm: FormGroup;
  nameInput: string;
  codeInput: string;
  notData: boolean = true;
  constructor(private httpservice: HttpServicesService, private pipe: DatePipe) { }

  ngOnInit(): void {
    this.createFormInstance();
    this.createSearchFormInstance();
    this.returnProductNameAndCode();
    this.returnSoldProducts();


  }

  createSearchFormInstance() {
    this.searchForm = new FormGroup({
      productName: new FormControl(null),
      salesDate: new FormControl(null)
    })
  }
  searchItems() {
    this.soldProductDist = this.httpservice.getSoldProducts().subscribe((response) => {
      const soldProducts = response;
      const productName = this.searchForm.get('productName')?.value;
      const productSaleDate = this.searchForm.get('salesDate')?.value;

      const filtredByProductName = soldProducts.filter((item: any) => {
        const newDate = new Date(item.saleDate);
        const newConvertedFromData = this.pipe.transform(newDate, 'yyyy-MM-dd')
        const newConvetedInput = this.pipe.transform(productSaleDate, 'yyyy-MM-dd')

        return newConvertedFromData === newConvetedInput || item.soldProductName === productName;
      });
      this.notData = (filtredByProductName.length <= 0) ? false : true;
      this.soldProducts = filtredByProductName;
    });
  };





  createFormInstance() {
    this.soldProductForm = new FormGroup({
      distributorID: new FormControl(null),
      saleDate: new FormControl(null),
      soldProductCode: new FormControl(null),
      soldProductName: new FormControl(null),
      soldProductQuantity: new FormControl(null),
      soldProductUnitPrice: new FormControl(null),
      soldProductTotalPrice: new FormControl(null),
    })


  }
  inputName(input: any) {
    this.nameInput = input.value;

  };
  inputCode(input: any) {
    this.codeInput = input.value;
  };
  addSoldProduct() {

    const newSoldProduct: salesModel = {
      distributorID: this.soldProductForm.get('distributorID')?.value,
      saleDate: this.soldProductForm.get('saleDate')?.value,
      soldProductCode: this.codeInput,
      soldProductName: this.nameInput,
      soldProductQuantity: this.soldProductForm.get('soldProductQuantity')?.value,
      soldProductUnitPrice: this.soldProductForm.get('soldProductUnitPrice')?.value,
      soldProductTotalPrice: this.soldProductForm.get('soldProductUnitPrice')?.value * this.soldProductForm.get('soldProductQuantity')?.value,

    };
    this.addSoldProductPost(newSoldProduct);

  };

  addSoldProductPost(newSoldProduct: any) {
    this.soldProductDist = this.httpservice.addSoldProductPost(newSoldProduct).subscribe((response) => {
      alert('sold product added');
      this.returnSoldProducts();

    });
  };
  returnSoldProducts() {
    this.httpservice.getSoldProducts().subscribe((response) => {
      this.soldProducts = response
    })
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
  };

  returnSortedProductCodeList(productNamesAndCodes: Array<any>) {
    return this.sortProductCode(productNamesAndCodes)
  };

  returnSortedProductNameList(productNamesAndCodes: Array<any>) {

    return this.sortProductName(productNamesAndCodes);
  };

  returnSoldProductList(soldProducts: any) {
    return soldProducts;
  };
  ngOnDestroy() {
    (this.productNameAndCodeDist) ? this.productNameAndCodeDist.unsubscribe() : false;
    (this.soldProductDist) ? this.soldProductDist.unsubscribe() : false;

  };
};

