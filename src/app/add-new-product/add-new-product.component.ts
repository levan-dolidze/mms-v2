import { AddNewProductModule } from './add-new-product.module';
import { HttpServicesService } from './../services/http-services.service';
import { newProductsModel } from './../models/newProductsModel';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css', '../common-css.css']
})
export class AddNewProductComponent implements OnInit, OnDestroy {
  newProductForm: FormGroup;
  newProduct: Array<newProductsModel> = [];
  products: Array<AddNewProductModule> = [];
  productsDist: Subscription;
  newProductDist: Subscription;

  size: number = 5;
  start: number = 0;
  next: boolean = true;
  back: boolean = true;
  constructor(private httpservice: HttpServicesService) { }

  ngOnInit(): void {

    this.createFormInstance();
    this.returnProducts();
  }


  createFormInstance() {
    this.newProductForm = new FormGroup({
      productCode: new FormControl(null, Validators.required),
      productName: new FormControl(null, Validators.required),
      productUnitPrice: new FormControl(null, Validators.required)

    });
  };


  addNewProduct() {
    const newProduct: newProductsModel = {
      productCode: this.newProductForm.get('productCode')?.value,
      productName: this.newProductForm.get('productName')?.value,
      productUnitPrice: this.newProductForm.get('productUnitPrice')?.value,

    }
    this.addNewProductInDB(newProduct);

  }

  addNewProductInDB(newProduct: newProductsModel) {
    this.newProductDist = this.httpservice.addNewProductPost(newProduct).subscribe((response) => {
      this.returnProducts()
      alert('product added');
    });
  };



  returnProducts() {
    this.products = [];
    this.productsDist = this.httpservice.getProducts().subscribe((response) => {
      let allProducts = response;
      this.changeNextMode(allProducts, 5)
      for (let index = 0; index < this.size; index++) {
        if (response[index]) {
          this.products.push(response[index])
        };
      };
    });
  };

  changeNextMode(allProducts: any, maxLength: any) {
    if (allProducts.length > maxLength) this.next = false;

  };



  returnProductsForView(products: any) {
    return products;
  };


  returnNextFiveItems() {
    this.products = [];
    this.size += 5;
    this.start += 5;
    this.productsDist = this.httpservice.getProducts().subscribe((response) => {

      for (let index = this.start; index < this.size; index++) {
        if (response[index]) {
          this.products.push(response[index])
          if (this.size > 5) this.back = false;
        };
      };
      if (this.products.length < 5) this.next = true;

    });


  };

  backFiveItems() {
    this.products = [];
    this.size -= 5;
    this.start -= 5
    this.productsDist = this.httpservice.getProducts().subscribe((response) => {
      for (let index = this.start; index < this.size; index++) {
        if (response[index]) {
          this.products.push(response[index]);
          this.next = false;
        };
        this.changeBackMode(this.start, 0)
      };

    });
  };

  changeBackMode(start: number, min: number) {
    if (start == min) this.back = true;
  };





  ngOnDestroy() {
    (this.newProductDist) ? this.newProductDist.unsubscribe() : false;
    (this.productsDist) ? this.productsDist.unsubscribe() : false;

  };

};
