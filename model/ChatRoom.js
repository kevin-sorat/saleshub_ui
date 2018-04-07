
export default class ChatRoom {

    constructor(id, rev, salesmanUserID, companyUserID, salesOppID, messages) {
        this._id = id;
        this._rev = rev;
        this._salesmanUserID = salesmanUserID;
        this._companyUserID = companyUserID;
        this._salesOppID = salesOppID;
        this._messages = messages;
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

    get salesmanUserID() {
        return this._salesmanUserID;
    }

    set salesmanUserID(salesmanUserID) {
        this._salesmanUserID = salesmanUserID;
    }

    get companyUserID() {
        return this._companyUserID;
    }

    set companyUserID(companyUserID) {
        this._companyUserID = companyUserID;
    }

    get salesOppID() {
        return this._salesOppID;
    }

    set salesOppID(salesOppID) {
        this._salesOppID = salesOppID;
    }

    get messages() {
        return this._messages;
    }

    set messages(messages) {
        this._messages = messages;
    }
}