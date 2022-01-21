export class signUpModel {
    id?: number | string;
    name: string;
    sureName: string;
    birthDay: string ;
    gender: string;
    image: string;
    docType: string;
    docSeries: string;
    docNO: string;
    docDateOfIssue: string ;
    docDateOfExpiry: string ;
    personalNo: string;
    issuingAuthority: string;
    phone: string;
    mobile: string
    email: string;
    fax: string;
    addressType: boolean;
    address: string;
    protegeIds:Array<any>=[];
  



    constructor(id: number | string, name: string, sureName: string, birthDay: string, gender: string, image: string, docType: string, docSeries: string, docNO: string, docDateOfIssue: string , docDateOfExpiry: string , personalNo: string, issuingAuthority: string, phone: string, mobile: string, email: string, fax: string, addressType: boolean, address: string,protegeIds:Array<any>
        ) {

        this.id = id;
        this.name = name;
        this.sureName = sureName;
        this.birthDay = birthDay;
        this.gender = gender;
        this.image = image;
        this.docType = docType;
        this.docSeries = docSeries;
        this.docNO = docNO;
        this.docDateOfIssue = docDateOfIssue;
        this.docDateOfExpiry = docDateOfExpiry;
        this.personalNo = personalNo;
        this.issuingAuthority = issuingAuthority;
        this.phone = phone;
        this.mobile = mobile
        this.email = email;
        this.fax = fax;
        this.addressType = addressType;
        this.address = address;
        this.protegeIds=protegeIds;
      

    }
}