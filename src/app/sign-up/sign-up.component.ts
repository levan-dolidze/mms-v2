import { ProtegeModel } from './../models/protegeModel';
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
  newProtege: FormGroup;
  level: number = 0


  ngOnInit(): void {
    this.createSignUpFormInstance();
    this.setDefaultValues();
    this.returnDistributorList();
    this.filterDistributors();

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
      recomendatorPersonalNo: new FormControl(null),
      protegeIds: new FormArray([]),
      recommArr: new FormArray([]),


    });
  };



  returnDistributorList() {
    this.distributorListDist = this.httpservice.getDistributors().subscribe((response) => {
      this.distributorList = response;

    })
    return this.distributorList
  };

  filterDistributors() {
    this.httpservice.getDistributors().subscribe((res) => {
      let fil = res
      const filter = fil.filter((data) => {
        return data.protegeIds.length < 3
      });
      this.distributorList = filter
    })

  }

  disorderedRecommendatorArr(a: any, b: any, arr: any) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp

  };

  //used selection sort
  sortRecommendators(array: any) {
    for (let index = 0; index < array.length - 1; index++) {
      let min = index;
      for (let i = min + 1; i < array.length; i++) {
        if (array[min].id > array[i].id) min = i;

      }
      this.disorderedRecommendatorArr(index, min, array)
    }
    return array
  }
  returnSortedIds() {
    return this.sortRecommendators(this.distributorList);
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

    //  this.signUpForm.get('recomendatorPersonalNo')?.value


  };





  signUp() {
    // let recomm = new FormControl(this.signUpForm.get('recomendatorPersonalNo')?.value);
    // (<FormArray>this.signUpForm.get('recommArr')).push(recomm);
    // console.log(this.signUpForm)
    this.addNewDistributor();



    // return (this.signUpForm.get('recomendatorPersonalNo') as FormArray).controls;
    alert('distributor added');

  };

 get returnRecommShow(){
    if(this.isRecommenderShow){
      let idsArr =this.returnSortedIds();
      for (let index = 0; index < idsArr.length; index++) {
       if(idsArr[index].id==this.signUpForm.get('recomendatorPersonalNo')?.value){
         return this.signUpForm.get('recomendatorPersonalNo')?.value
       }
        
      }
    
    }
  }

  addNewDistributor() {

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
      protegeIds: [],
      recommendator:  [this.returnRecommShow]


    };
    this.distributorListDist = this.httpservice.addDistributor(newDistributor).subscribe((res) => {

      this.editRecommendatorList();
      this.returnDistributorList();

    });
  };


  editRecommendatorList() {
    if (!this.isRecommenderShow) {
      return
    } else {
      this.httpservice.getDistributors().subscribe((res) => {
        let distrList = res
        let selectedId = this.signUpForm.get('recomendatorPersonalNo')?.value;
        const findId = distrList.find((item: any) => {
          return item.id === selectedId
        });
        if (findId) {

          const lastId = distrList.map((item) => {
            return item.id
          });

          let lastDistr = lastId.pop();

          let newProtege: ProtegeModel = {
            newProtegeObj: {

              id: lastDistr,
              level: 0,
              protege: []
            }
          }
          findId.protegeIds.push(newProtege)
          this.httpservice.editDistributorProtegeInfo(findId).subscribe((response) => {
            this.filterDistributors();
            this.deepControl();
            this.returnRecommShow;
          })
        }
        else {
          return
        };

      });
    };






  };

  deepControl() {
    this.httpservice.getDistributors().subscribe((data) => {
      let list = data
      let selectedId = this.signUpForm.get('recomendatorPersonalNo')?.value;
      if (this.level > 3) {
        return
      } else {
        const filter = list.filter((item) => {
          return item.id == selectedId
        });
        const lastId = list.map((item) => {
          return item.id
        });

        let lastIds = lastId.pop();


        for (let index = 0; index < filter.length; index++) {

          let indexone = filter[index].recommendator
          for (let i = 0; i < indexone.length; i++) {
            const filt = list.filter((item) => {
              return item.id == indexone[i]
            })
            if (filt.length > 0) {
              this.level += 1
            }

            for (let j = 0; j < filt.length; j++) {
              let newProtege: ProtegeModel = {
                newProtegeObj: {
                  id: lastIds,
                  level: this.level,
                  protege: []
                }
              };
              console.log(this.level)
              let protegeLevel1Arr = filt[j].protegeIds[j].newProtegeObj.protege;
              if (this.level == 1) {
                protegeLevel1Arr.push(newProtege);
              }
              else if (this.level == 2) {
                for (let index = 0; index < protegeLevel1Arr.length; index++) {
                  let protegeLevel2Arr = protegeLevel1Arr[index].newProtegeObj.protege
                  protegeLevel2Arr.push(newProtege);
                }
              }
            

            }

            for (let index = 0; index < filt.length; index++) {
              let edited = filt[index]
              this.httpservice.editDistributorProtegeInfo(edited).subscribe((res) => {

              })
            }
          }



        }

      }





      //შენახულია ერეი სადაც მოცემულია ერთი ელემენტი c ს რეკომენდატორის id 2  



    });
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



// for (let index = 0; index < array3.length; index++) {
//   let count = 0;
//   let ind = index
//   if (array3[index].protege) {
//     count++
//   }

//   for (let i = 0; i < array3[ind].protege.length; i++) {
//     if (array3[ind].protege[i]) {
//       count++
//     }
//     let ind2 = i;
//     for (let j = 0; j < array3[ind2].protege.length; j++) {
//       if (array3[ind2].protege[j]) {
//         count++
//       }

//     }
//   }

//   console.log(count)

// }

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




