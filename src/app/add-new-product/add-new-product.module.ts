import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewProductRoutingModule } from './add-new-product-routing.module';
import { AddNewProductComponent } from './add-new-product.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddNewProductComponent
  ],
  imports: [
    CommonModule,
    AddNewProductRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule

  ]
})
export class AddNewProductModule { }
