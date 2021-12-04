export class newProductsModel {
    productCode: string | number;
    productName: string;
    productUnitPrice: number;
    constructor(productCode: string | number, productName: string, productUnitPrice: number) {
        this.productCode = productCode;
        this.productName = productName;
        this.productUnitPrice = productUnitPrice;

    }
}