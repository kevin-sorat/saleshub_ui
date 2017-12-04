
export default class SalesOpportunity {

    constructor(companyname, description, price, commission) {
        // this._salesOpportunityID = 
        this._companyname = companyname;
        this._description = description;
        this._price = price;
        this._commission = commission;
    }

    get companyname() {
        return this._companyname;
    }

    set companyname(companyname) {
        this._companyname = companyname;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    get commission() {
        return this._commission;
    }

    set commission(commission) {
        this._commission = commission;
    }
}