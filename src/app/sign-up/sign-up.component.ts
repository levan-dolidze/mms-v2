import { contactType } from './../class';
import { HttpServicesService } from './../services/http-services.service';
import { signUpModel } from './../models/signUpModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../common-css.css']
})
export class SignUpComponent implements OnInit {

  constructor(private httpservice: HttpServicesService, private contatc: contactType) { }
  signUpForm: FormGroup;
  isRecommenderShow: boolean = false;
  isHiddenPhone = false;
  isHiddenMobile = false;
  isHiddenEmail = false;
  isHiddenFax = false;
  IsIdentityShow = true;


  ngOnInit(): void {
    this.createSignUpFormInstance();
    this.setDefaultValues();

  }

  setDefaultValues() {
    this.signUpForm.patchValue({ gender: 'Male', docType: 'IDCard', addressType: 'ActualAddress' });
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
      phone: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null),
      email: new FormControl(null),
      fax: new FormControl(null),
      issuingAuthority: new FormControl(null),
      addressType: new FormControl(null),
      address: new FormControl(null),
      hasRecommender: new FormControl(null)

    });
  };


  showIdentity() {
    return { identity: this.isRecommenderShow = !this.isRecommenderShow }
  }


  showPhone() {
    return { phone: this.isHiddenPhone = !this.isHiddenPhone }

  }
  showMobile() {
    return { mobile: this.isHiddenMobile = !this.isHiddenMobile }

  }
  showEmail() {
    return { email: this.isHiddenEmail = !this.isHiddenEmail }
  };
  showFax() {
    return { fax: this.isHiddenFax = !this.isHiddenFax }
  };
  returnPhone() {
    const phone = (this.isHiddenPhone) ? this.signUpForm.get('phone')?.value : null
    return phone;
  };
  returnMobile() {
    const mobile = (this.isHiddenPhone) ? this.signUpForm.get('mobile')?.value : null
    return mobile;
  };
  returnEmail() {
    const email = (this.isHiddenPhone) ? this.signUpForm.get('email')?.value : null
    return email;
  };
  returnFax() {
    const fax = (this.isHiddenPhone) ? this.signUpForm.get('email')?.value : null
    return fax;
  };

  signUp() {
 
    const newDistributor: signUpModel = {
      name: this.signUpForm.get('name')?.value,
      sureName: this.signUpForm.get('sureName')?.value,
      birthDay: this.signUpForm.get('birthDay')?.value,
      gender: this.signUpForm.get('gender')?.value,
      image: this.signUpForm.get('image')?.value,
      docType: this.signUpForm.get('docType')?.value,
      docSeries: this.signUpForm.get('docSeries')?.value,
      docNO: this.signUpForm.get('docNO')?.value,
      docDateOfIssue: this.signUpForm.get('docDateOfIssue')?.value,
      docDateOfExpiry: this.signUpForm.get('docDateOfExpiry')?.value,
      personalNo: this.signUpForm.get('personalNo')?.value,
      phone: this.returnPhone(),
      mobile: this.returnMobile(),
      email: this.returnEmail(),
      fax: this.returnFax(),
      issuingAuthority: this.signUpForm.get('issuingAuthority')?.value,
      addressType: this.signUpForm.get('addressType')?.value,
      address: this.signUpForm.get('address')?.value,

    };
    this.httpservice.addDistributor(newDistributor).subscribe((respinse) => {

      alert('distributor added');
    });

  };

};
