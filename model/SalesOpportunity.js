
export default class SalesOpportunity {

    constructor(id, rev, companyname, product, description, price, commission, userid) {
        this._id = id;
        this._rev = rev;
        this._companyname = companyname;
        this._product = product;
        this._description = description;
        this._price = price;
        this._commission = commission;
        this._userid = userid;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get rev() {
        return this._rev;
    }

    set rev(rev) {
        this._rev = rev;
    }

    get companyname() {
        return this._companyname;
    }

    set companyname(companyname) {
        this._companyname = companyname;
    }

    get product() {
        return this._product;
    }

    set product(product) {
        this._product = product;
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

    get userid() {
        return this._userid;
    }

    set userid(userid) {
        this._userid = userid;
    }
}