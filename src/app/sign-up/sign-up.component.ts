import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../common-css.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }
  signUpForm: FormGroup;
  isRecommenderShow: boolean = false;
  ngOnInit(): void {
    this.createSignUpFormInstance();
    this.setDefaultValues();

  }

  setDefaultValues() {
    this.signUpForm.patchValue({ gender: '1', docType: '1', addressType: '1' });
  };

  createSignUpFormInstance() {
    this.signUpForm = new FormGroup({
      name: new FormControl(null),
      sureName: new FormControl(null),
      birthDay: new FormControl(null),
      gender: new FormControl(null),
      docType: new FormControl(null),
      docSeries: new FormControl(null),
      docNO: new FormControl(null),
      docDateOfIssue: new FormControl(null),
      docDateOfExpiry: new FormControl(null),
      personalNo: new FormControl(null),
      contactType: new FormArray([]),
      issuingAuthority: new FormControl(null),
      addressType: new FormControl(null),
      address: new FormControl(null),
      hasRecommender: new FormControl



    });
  };
  signUp() {

  };
  showIdentity(input: any) {
    return { identity: this.isRecommenderShow = !this.isRecommenderShow }
  }
}
