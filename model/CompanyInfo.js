
export default class CompanyInfo {

    constructor(id, rev, companyname, companyaddress, companyphone, userid, nickname, email) {
        this._id = id;
        this._rev = rev;
        this._companyname = companyname;
        this._companyaddress = companyaddress;
        this._companyphone = companyphone;
        this._userid = userid;
        this._nickname = nickname;
        this._email = email;
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

    get companyaddress() {
        return this._companyaddress;
    }

    set companyaddress(companyaddress) {
        this._companyaddress = companyaddress;
    }

    get companyphone() {
        return this._companyphone;
    }

    set companyphone(companyphone) {
        this._companyphone = companyphone;
    }

    get userid() {
        return this._userid;
    }

    set userid(userid) {
        this._userid = userid;
    }

    get nickname() {
        return this._userid;
    }

    set nickname(nickname) {
        this._nickname = nickname;
    }

    get email() {
        return this._userid;
    }

    set email(email) {
        this._email = email;
    }
}