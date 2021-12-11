import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })

export class contactType {
    isHiddenPhone = false;
    constructor() {

    }

    returnPhone(){
        return  this.isHiddenPhone=!this.isHiddenPhone
    }
}