
import SalesOpportunity from "./SalesOpportunity";

const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class AppModel {

    _salesOpportunities;

    constructor(enforcer) {
        if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
    }
    
    static get instance() {
        if(!this[singleton]) {
            this[singleton] = new AppModel(singletonEnforcer);
        }
        return this[singleton];
    }

    addSalesOpportunity(newSaleOpportunity) {
        if (!this._salesOpportunities) {
            this._salesOpportunities = [];
        }
        this._salesOpportunities.push(newSaleOpportunity);
    }

    removeSalesOpportunity(index) {
        this._salesOpportunities.splice(index, 1);
    }
}