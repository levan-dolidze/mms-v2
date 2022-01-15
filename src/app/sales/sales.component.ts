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
      salesDate: new FormControl(null),
      distributorID: new FormControl(null)
    })
  }
  // searchItems() {
  //   this.soldProductDist = this.httpservice.getSoldProducts().subscribe((response) => {
  //     const soldProducts = response;
  //     const productName = this.searchForm.get('productName')?.value;
  //     const productSaleDate = this.searchForm.get('salesDate')?.value;
  //     const distributorId = this.searchForm.get('distributorID')?.value;

  //     const filtredByProductName = soldProducts.filter((item: any) => {

  //       console.log(soldProducts)
  //       const newDate = new Date(item.saleDate);
  //       const newConvertedFromData = this.pipe.transform(newDate, 'yyyy-MM-dd')
  //       const newConvetedInput = this.pipe.transform(productSaleDate, 'yyyy-MM-dd')

  //       return newConvertedFromData === newConvetedInput || item.soldProductName === productName || item.distributorID === distributorId;
  //     });
  //     this.notData = (filtredByProductName.length <= 0) ? false : true;
  //     this.soldProducts = filtredByProductName;
  //   });
  // };
  searchItems() {
    this.soldProductDist = this.httpservice.getSoldProducts().subscribe((response) => {
      const soldProducts = response;
      this.soldProducts = soldProducts
      const distributorId = this.searchForm.get('distributorID')?.value
      const productName = this.searchForm.get('productName')?.value;

      let test2Arr = this.test2Search(this.soldProducts, productName);
      let testArr = this.testSearch(this.soldProducts, distributorId);

      let chek = this.chekName(productName, test2Arr)
      let chek1 = this.checkId(distributorId, testArr)

      console.log(testArr)
      console.log(test2Arr)
      console.log(chek)
      console.log(chek1)
      console.log(distributorId)


      if (test2Arr.length == 0 && testArr.length == 0) this.soldProducts = []

      if (distributorId) {
        this.soldProducts = testArr;
      }
      if (productName) {
        this.soldProducts = test2Arr;
      }


    });
  };



  chekName(input: any, arr: any): any {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].soldProductName == input) {
        return true
      }
      else {
        return false
      }

    }
  }

  checkId(input: any, arr: any): any {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].distributorID == input) {
        return true
      }
      else {
        return false
      }

    }
  }

  testSearch(data: any, input: any) {
    const filtred = data.filter((item: any) => {
      return item.distributorID === input
    })
    return filtred

  }
  test2Search(data: any, input: any) {
    const filtred = data.filter((item: any) => {
      return item.soldProductName === input
    })

    return filtred
  }




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


  };

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
      this.soldProducts = response;
    })
  }

  returnProductNameAndCode() {
    this.productNameAndCodeDist = this.httpservice.getProducts().subscribe((response) => {
      this.productNamesAndCodes = response;

    });
  };

  //used selection sort
  disorderedArr(a: any, b: any, arr: any) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp

  }

  sortProductName(array: Array<any>) {
    for (let index = 0; index < array.length - 1; index++) {
      let min = index;
      for (let j = min + 1; j < array.length; j++) {
        if (array[min].productName > array[j].productName) min = j
      }
      this.disorderedArr(index, min, array)
    }
    return array

  }

  //used bubble sort
  sortProductCode(arr: Array<any>) {
    let noSwaps;
    for (let i = arr.length; i > 0; i--) {
      noSwaps = true;
      for (let index = 0; index < i - 1; index++) {
        if (arr[index].productCode > arr[index + 1].productCode) {
          let temp = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = temp;
          noSwaps = false;
        };
      };
      if (noSwaps) break;
    };
    return arr;
  }

  //simple sorting approach
  // sortProductName(productNamesAndCodes: any) {
  //   const sortedProductNameLists = productNamesAndCodes.sort((a: any, b: any) => {
  //     if (a.productName > b.productName) {
  //       return 1
  //     }
  //     else if (a.productName < b.productName) {
  //       return -1
  //     }
  //     else {
  //       return 0
  //     }
  //   })
  //   return sortedProductNameLists;
  // };


  // sortProductCode(productNamesAndCodes: Array<any>) {
  //   const sortedProductCodeLists = productNamesAndCodes.sort((a: any, b: any) => {
  //     if (a.productCode > b.productCode) {
  //       return 1
  //     }
  //     else if (a.productCode < b.productCode) {
  //       return -1
  //     }
  //     else {
  //       return 0
  //     }
  //   })
  //   return sortedProductCodeLists;
  // };

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


