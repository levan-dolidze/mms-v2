export class signUpModel {
    distributorID: number | string;
    name: string;
    sureName: string;
    birthDay: string | object;
    gender: string;
    image: string;
    docType: string;
    docSeries: string;
    docNO: string;
    docDateOfIssue: string | object;
    docDateOfExpiry: string | object;
    personalNo: string;
    issuingAuthority: string;
    contactType: Array<string>;
    addressType: boolean;
    address: string;



    constructor(distributorID: number | string, name: string, sureName: string, birthDay: string | object, gender: string, image: string, docType: string, docSeries: string, docNO: string, docDateOfIssue: string | object, docDateOfExpiry: string | object, personalNo: string, issuingAuthority: string, contactType: Array<string>, addressType: boolean, address: string) {

        this.distributorID = distributorID;
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
        this.contactType = contactType;
        this.addressType = addressType;
        this.address = address

    }
}