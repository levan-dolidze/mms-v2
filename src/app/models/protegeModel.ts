export class ProtegeModel {

    newProtegeObj: {
        id: any,
        level:any,
        protege: Array<any>

    };

    constructor(newProtegeObj: { id: any,level:any, protege: Array<any> }) {
        this.newProtegeObj = newProtegeObj

    }
}