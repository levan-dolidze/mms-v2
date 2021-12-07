import { AddNewProductModule } from './add-new-product.module';
import { HttpServicesService } from './../services/http-services.service';
import { newProductsModel } from './../models/newProductsModel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css', '../common-css.css']
})
export class AddNewProductComponent implements OnInit, OnDestroy {
  viewMode = "showProductForm";
  newProductForm: FormGroup;
  newProduct: Array<newProductsModel> = [];
  products: Array<AddNewProductModule> = [];
  productsDist: Subscription;
  newProductDist: Subscription;
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

    })
  }




  addNewProduct() {
    const newProduct: newProductsModel = {
      productCode: this.newProductForm.get('productCode')?.value,
      productName: this.newProductForm.get('productName')?.value,
      productUnitPrice: this.newProductForm.get('productUnitPrice')?.value,

    }
    this.addNewProductInDB(newProduct)

  }

  addNewProductInDB(newProduct: newProductsModel) {
    this.newProductDist = this.httpservice.addNewProductPost(newProduct).subscribe((response) => {
      alert('product added');
    });
  };

  returnProducts() {
    this.productsDist = this.httpservice.getProducts().subscribe((response) => {
      this.products = response
      this.returnProductsForView(this.products)
    });
  };

  returnProductsForView(products: any) {
    return products
  };

  ngOnDestroy() {
    (this.newProductDist) ? this.newProductDist.unsubscribe() : false;
    (this.productsDist) ? this.productsDist.unsubscribe() : false;
   
  };

}
