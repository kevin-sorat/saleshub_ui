import React from 'react';
import { View, ScrollView, StyleSheet, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, CheckBox, Avatar, Rating } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as appServices from "../services/AppServices";
import CompanyInfo from "../model/CompanyInfo";

export default class UserProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);

    this.state = {
      isCompany: false,
      id: "",
      rev: "",
      companyNameFormInput: "",
      addressFormInput: "",
      phoneFormInput: "",
      isFormDirty: false
    };

    this._isFormComplete = this._isFormComplete.bind(this);
    this.cancelButtonOnPressHandler = this.cancelButtonOnPressHandler.bind(this);
    this.saveButtonOnPressHandler = this.saveButtonOnPressHandler.bind(this);
    this.createCompanyInfoCallback = this.createCompanyInfoCallback.bind(this);

    // alert("currentUser: " + this.props.screenProps.currentUser.nickname);
  }

  componentDidMount() {
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    appServices.getCompanyInfoFromServer(this.props.screenProps.currentUser.userID, (error, result) => {
      if (!error) {
        // console.log("==============> result: " + JSON.stringify(result));
        this.setState({
          isCompany: true,
          id: result.id,
          rev: result.rev,
          companyNameFormInput: result.companyname,
          addressFormInput: result.companyaddress,
          phoneFormInput: result.companyphone
        });

        let companyInfoObj = new CompanyInfo(this.state.id, this.state.rev, this.state.companyNameFormInput,
          this.state.addressFormInput, this.state.phoneFormInput, this.props.screenProps.currentUser.userID,
          this.props.screenProps.currentUser.nickname, this.props.screenProps.currentUser.email);
        this.props.screenProps.setCompanyInfo(companyInfoObj);
      }
    });
  }

  _isFormComplete() {
    if (this.state.isCompany) {
      return (this.state.isFormDirty &&
        (this.state.isCompany &&
          this.state.companyNameFormInput && this.state.companyNameFormInput.length > 0 &&
          this.state.addressFormInput && this.state.addressFormInput.length > 0 &&
          this.state.phoneFormInput && this.state.phoneFormInput.length > 0));
    } else {
      return (this.state.isFormDirty);
    }
  }

  cancelButtonOnPressHandler() {

    // TODO: Call the backend to re-retrieve the compnany info linked to user id
    // If company info does not exist, then set the role to seller
    this.getCompanyInfo();
    this.setState({ isFormDirty: false });
  }

  saveButtonOnPressHandler() {
    let newCompanyInfoObj = new CompanyInfo(this.state.id, this.state.rev, this.state.companyNameFormInput,
      this.state.addressFormInput, this.state.phoneFormInput, this.props.screenProps.currentUser.userID,
      this.props.screenProps.currentUser.nickname, this.props.screenProps.currentUser.email);

    if (this.state.isCompany) {
      // TODO: Call the backend to save compnay info linked to user id
      appServices.createCompanyInfo(newCompanyInfoObj, this.createCompanyInfoCallback);
      this.props.screenProps.setCompanyInfo(newCompanyInfoObj);
    } else {
      if (this.state.id && this.state.id.length > 0) {
        // Remove company info from DB
        appServices.deleteCompanyInfo(newCompanyInfoObj, this.deleteCompanyInfoCallback);
        this.props.screenProps.setCompanyInfo(null);
      }
    }
  }

  createCompanyInfoCallback() {
    console.log("Company Info has been saved.")
    this.setState({
      isFormDirty: false
    });
  }

  deleteCompanyInfoCallback() {
    console.log("Company Info has been deleted.")
    this.setState({
      isCompany: false,
      id: "",
      rev: "",
      companyNameFormInput: "",
      addressFormInput: "",
      phoneFormInput: "",
      isFormDirty: false
    });
  }

  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            {/*}
            <View style={styles.avatarView}>
              <Avatar
                xlarge
                rounded
                title="?"
                // source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <Rating style={styles.rating}
                imageSize={20}
                readonly
                startingValue={5.0}
              />
            </View>
            */}
            <FormLabel>User Name (read-only)</FormLabel>
            <FormInput
              style={styles.formInput}
              value={this.props.screenProps.currentUser.nickname}
              editable={false}
            />
            <FormLabel>User ID (read-only)</FormLabel>
            <FormInput
              style={styles.formInput}
              value={this.props.screenProps.currentUser.userID}
              editable={false}
            />
            <FormLabel>Email (read-only)</FormLabel>
            <FormInput
              style={styles.formInput}
              value={this.props.screenProps.currentUser.email}
              editable={false}
            />

            <FormLabel>Role</FormLabel>
            <CheckBox
              title='I am looking for sales opportunities.'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!this.state.isCompany}
              onPress={() => {
                this.setState({
                  isCompany: false,
                  isFormDirty: true
                });
              }}
            />
            <CheckBox
              title='I want to post a sales opportunity for my company.'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.isCompany}
              onPress={() => {
                this.getCompanyInfo();
                this.setState({
                  isCompany: true,
                  isFormDirty: true
                });
              }}
            />

            {
              this.state.isCompany
                ?
                <View style={styles.companyContainer}>
                  <FormLabel>Company Name</FormLabel>
                  <FormInput
                    style={styles.formInput}
                    value={this.state.companyNameFormInput}
                    onChangeText={companyNameFormInput => this.setState({ companyNameFormInput, isFormDirty: true })}
                  />
                  <FormLabel>Addresss (private)</FormLabel>
                  <FormInput
                    style={styles.formInput}
                    multiline={true}
                    value={this.state.addressFormInput}
                    onChangeText={addressFormInput => this.setState({ addressFormInput, isFormDirty: true })}
                  />
                  <FormLabel>Phone (private)</FormLabel>
                  <FormInput
                    style={styles.formInput}
                    keyboardType={'phone-pad'}
                    value={this.state.phoneFormInput}
                    onChangeText={phoneFormInput => this.setState({ phoneFormInput, isFormDirty: true })}
                  />
                </View>
                :
                null
            }

          </KeyboardAwareScrollView>

          <View style={styles.buttonContainer}>
            <Button
              disabled={!this.state.isFormDirty}
              style={styles.button}
              backgroundColor='darkblue'
              containerViewStyle={{ width: '50%', borderWidth: 0.5 }}
              onPress={() => { this.cancelButtonOnPressHandler() }}
              title='Cancel' />
            <Button
              disabled={!this._isFormComplete()}
              style={styles.button}
              backgroundColor='darkblue'
              containerViewStyle={{ width: '50%', borderWidth: 0.5 }}
              onPress={() => { this.saveButtonOnPressHandler() }}
              title='Save' />
          </View>

        </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  companyContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  button: {
    alignSelf: 'stretch'
  },
  avatarView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  rating: {
    paddingTop: 10
  },
  formInput: {
    width: '100%',
    paddingTop: 5,
    fontSize: 15.24,
  }
});
