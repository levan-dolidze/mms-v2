export class salesModel {
    salesCode?: number | string;
    distributorID: number | string;
    saleDate: string | object;
    soldProductCode: string | number;
    soldProductName: string;
    soldProductQuantity: number;
    soldProductUnitPrice: number;
    soldProductTotalPrice: number;


    constructor(salesCode: number | string, distributorID: number | string, saleDate: string | object, soldProductCode: string | number, soldProductName: string, soldProductQuantity: number, soldProductUnitPrice: number, soldProductTotalPrice: number) {
        this.salesCode = salesCode;
        this.distributorID = distributorID;
        this.saleDate = saleDate;
        this.soldProductCode = soldProductCode;
        this.soldProductName = soldProductName;
        this.soldProductQuantity = soldProductQuantity;
        this.soldProductUnitPrice = soldProductUnitPrice;
        this.soldProductTotalPrice = soldProductTotalPrice;



    }

}