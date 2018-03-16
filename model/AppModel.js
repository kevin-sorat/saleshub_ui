
import SalesOpportunity from "./SalesOpportunity";

class AppModel {

    // _salesOpportunities;
    _currentUser

    constructor(enforcer) {
        this._currentUser = new Object();
        this._currentUser.nickname = "--"
        this._currentUser.userID = "--";
        this._currentUser.email = "--";
    }
    
    /*
    static get instance() {
        if(!this[singleton]) {
            this[singleton] = new AppModel(singletonEnforcer);
        }
        return this[singleton];
    }
    */

    /*
    addSalesOpportunity(newSaleOpportunity) {
        if (!this._salesOpportunities) {
            this._salesOpportunities = [];
        }
        this._salesOpportunities.push(newSaleOpportunity);
    }

    removeSalesOpportunity(index) {
        this._salesOpportunities.splice(index, 1);
    }
    */

    get currentUser() {
        return this._currentUser;
    }

    set currentUser(user) {
        this._currentUser = user;
    }
}

export default new AppModel();