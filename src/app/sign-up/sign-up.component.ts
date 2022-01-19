import { contactType } from './../class';
import { HttpServicesService } from './../services/http-services.service';
import { signUpModel } from './../models/signUpModel';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../common-css.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(private httpservice: HttpServicesService, private contatc: contactType) { }
  signUpForm: FormGroup;
  isRecommenderShow: boolean = false;
  distributorList: Array<signUpModel> = [];
  distributorListDist: Subscription;
  isHiddenPhone = false;
  isHiddenMobile = false;
  isHiddenEmail = false;
  isHiddenFax = false;
  IsIdentityShow = true;


  ngOnInit(): void {
    this.createSignUpFormInstance();
    this.setDefaultValues();
    this.returnDistributorList();
    // this.filtredIdNumbers();

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
      hasRecommender: new FormControl(null),
      protegeIds: new FormArray([]),
      recomendatorPersonalNo: new FormControl(null)

    });
  };





  returnDistributorList() {
    this.distributorListDist = this.httpservice.getDistributors().subscribe((response) => {
      this.distributorList = response;
    })
  };
  returnSortedIds() {
    const sortedIds = this.distributorList.sort((a: any, b: any) => {
      if (a.id > b.id) {
        return 1
      }
      if (a.id < b.id) {
        return -1
      }
      else {
        return 0
      };

    });
    return sortedIds;
  };
  showIdentity() {
    return { identity: this.isRecommenderShow = !this.isRecommenderShow }
  };


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
  selectedId(selectedIds: any) {
    const arr = []

  };

  addRecommendator() {
    let newFormcontrol = new FormControl(null);
    newFormcontrol = this.signUpForm.get('recomendatorPersonalNo')?.value;
    (<FormArray>this.signUpForm.get('protegeIds')).push(newFormcontrol);
    return (this.signUpForm.get('protegeIds') as FormArray).controls
  };


  signUp() {
    // this.addRecommendator();
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
      protegeIds: this.signUpForm.get('recomendatorPersonalNo')?.value,
      recomendatorPersonalNo: this.signUpForm.get('recomendatorPersonalNo')?.value

    };

    this.distributorListDist = this.httpservice.addDistributor(newDistributor).subscribe((respinse) => {
      alert('distributor added');
      this.getRegistrDistrIDnumber();
      this.returnDistributorList();

    });

  };

  // filtredIdNumbers(): any {
  //   const filtredLength = this.distributorList.filter((item) => {
  //     return item.protegeIds.length < 3;

  //   });
  //   this.getRecommendatorId(filtredLength);
  // };
  // getRecommendatorId(protegeIdArray: any) {
  //   const maped = protegeIdArray.map((element: any) => {
  //     return element.id;
  //   })
  //   this.paint = maped;
  // }
  getRegistrDistrIDnumber(): any {

    const find = this.distributorList.find((item) => {
      return item.id === this.signUpForm.get('recomendatorPersonalNo')?.value;
    });

    if (find) {

      this.httpservice.getDistributors().subscribe((response) => {
        this.distributorList = response;

        const findId = this.distributorList.map((item) => {
          return item.id
        });
        let lastId = findId.pop();
        console.log(find)
        find.protegeIds.push(lastId);
        this.httpservice.editDistributorProtegeInfo(find).subscribe(() => {


        });

      });


    }
    else {
      return
    }

  };



  ngOnDestroy(): void {
    this.distributorListDist.unsubscribe();
  };
};




// 1+3+9+27+81=121
//tree prototip
const array2 = [
  {
    id: 10, protege: [
      //3
      {

        id: 100, protege: [
          //9
          {
            id: 1000, protege: [
              //27
              { id: 10000, protege: [] },
              //81
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          },
          {
            id: 1000, protege: [
              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          },
          {
            id: 1000, protege: [
              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          }]
      },

      {
        id: 100, protege: [
          {
            id: 1000, protege: [
              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          },
          {
            id: 1000, protege: [
              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          },
          {
            id: 1000, protege: [
              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          }]
      },

      {
        id: 100, protege: [
          {
            id: 1000, protege: [
              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          },

          {
            id: 1000, protege: [

              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          },

          {
            id: 1000, protege: [
              { id: 10000, protege: [] },
              { id: 10000, protege: [] },
              { id: 10000, protege: [] }]
          }]
      }]
  },

  {
    id: 20, protege: [
      {
        id: 200, protege: [
          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          },

          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          },
          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          }]
      },

      {
        id: 200, protege: [
          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          },

          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          },

          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          }]
      },

      {
        id: 200, protege: [
          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          },

          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          },

          {
            id: 2000, protege: [
              { id: 20000, protege: [] },
              { id: 20000, protege: [] },
              { id: 20000, protege: [] }]
          }]
      }]
  },

  {
    id: 30, protege: [

      {
        id: 300, protege: [
          {
            id: 3000, protege: [
              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          },
          {
            id: 3000, protege: [
              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          },
          {
            id: 3000, protege: [
              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          }]
      },
      {
        id: 300, protege: [
          {
            id: 3000, protege: [

              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          },
          {
            id: 3000, protege: [

              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          },
          {
            id: 3000, protege: [

              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          }]
      },
      {
        id: 300, protege: [
          {
            id: 3000, protege: [

              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          },

          {
            id: 3000, protege: [

              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          },

          {
            id: 3000, protege: [
              { id: 30000, protege: [] },
              { id: 30000, protege: [] },
              { id: 30000, protege: [] }]
          }]
      }]
  }

];



function parseData(data: any) {
  let count = 0;
  for (let index = 0; index < data.length; index++) {
    console.log()



  }


}
parseData(array2)

const array3 = [{ protege: [{ protege: [{ protege: [] }] }] }];

function gg(arr:any) {

  

}

for (let index = 0; index < array3.length; index++) {
  let count = 0;
  let ind = index
  if (array3[index].protege) {
    count++
  }

  for (let i = 0; i < array3[ind].protege.length; i++) {
    if (array3[ind].protege[i]) {
      count++
    }
    let ind2 = i;
    for (let j = 0; j < array3[ind2].protege.length; j++) {
      if (array3[ind2].protege[j]) {
        count++
      }

    }
  }

  console.log(count)

}

// const arr = [
//   { id: 0, children: [] },
//   {
//     id: 1, children: [
//       { id: 2, children: [] }, {
//         id: 3, children:
//           [{
//             id: 4, children:
//               [
//                 {
//                   id: 5, children: []
//                 }]
//           }
//           ]
//       }]
//   }];
// function assignDepth(arr: any, depth = 0, index = 0): any {
//   if (index > arr.length) {

//     arr[index].depth = depth
//     if (arr[index].protege.length) {
//       return assignDepth(arr[index].protege, depth + 1, 0)
//     }
//     return assignDepth(arr, depth, index + 1)
//   };
//   return;
// }

// assignDepth(array2);
// console.log(JSON.stringify(array2, undefined, 5))




