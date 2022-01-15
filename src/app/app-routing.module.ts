
import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-new-product',
    pathMatch: 'full'
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)},
  { path: 'bonus', loadChildren: () => import('./bonus/bonus.module').then(m => m.BonusModule) },
  { path: 'add-new-product', loadChildren: () => import('./add-new-product/add-new-product.module').then(m => m.AddNewProductModule) },
  { path: 'sign-up', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'distributor-list', loadChildren: () => import('./distributor-list/distributor-list.module').then(m => m.DistributorListModule) },
  {
    path: '**',
    component: NotfoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
