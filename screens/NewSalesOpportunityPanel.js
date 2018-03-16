import React from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Header } from 'react-native-elements';

import * as appServices from "../services/AppServices";
import SalesOpportunity from "../model/SalesOpportunity";

export default class NewSalesOpportunityPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameInput: "",
      descInput: "",
      priceInput: "",
      commissionInput: "",
      userid: props.currentUser.userID
    };

    this._isFormComplete = this._isFormComplete.bind(this);
  }

  componentDidMount() {
    console.log("==============> componentDidMount");
    this.getCompanyInfo();
    /*
    if (this.props.companyInfo &&
      this.props.companyInfo.companyname &&
      this.props.companyInfo.companyname.length > 0) {
      this.setState({ nameInput: this.props.companyInfo.companyname });
      console.log("==============> companyname: " + this.state.nameInput);
    }
    */
  }

  getCompanyInfo() {
    appServices.getCompanyInfoFromServer(this.state.userid, (error, result) => {
      if (!error) {
        this.setState({ nameInput: result.companyname });
      }
      console.log("==============> companyname: " + this.state.nameInput);
    });
  }

  /*
  componentWillReceiveProps(nextProps) {
    console.log("==============> componentWillReceiveProps A");
    if (this.props.companyInfo !== nextProps.companyInfo) {
      console.log("==============> componentWillReceiveProps B");
      if (this.props.companyInfo &&
        this.props.companyInfo.companyname &&
        this.props.companyInfo.companyname.length > 0) {
        this.setState({ nameInput: this.props.companyInfo.companyname });
      }
    }
  }
  */

  submitButtonOnPressHandler() {
    let newSalesOpportunityObj = new SalesOpportunity(this.state.nameInput,
      this.state.descInput, this.state.priceInput, this.state.commissionInput, this.state.userid);

    // Call function to save new sale opportunity on the server
    appServices.createNewSalesOpportunity(newSalesOpportunityObj, this.props.dismissModalAndUpdate);
  }

  _isFormComplete() {
    return (this.state.nameInput.length > 0 && this.state.descInput.length > 0 &&
      this.state.priceInput.length > 0 && this.state.commissionInput.length > 0);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header
            leftComponent={{ icon: 'chevron-left', onPress: () => this.props.dismissModalAndUpdate() }}
            centerComponent={{ text: 'New Sales Opportunity' }}
            backgroundColor={'lightblue'}
          />
          <View>
            <FormLabel>Company name</FormLabel>
            <FormInput
              style={styles.formInput}
              value={this.state.nameInput}
              onChangeText={nameInput => this.setState({ nameInput })}
            />
            <FormLabel>Product/Service description</FormLabel>
            <FormInput
              style={styles.formInput}
              multiline={true}
              ref={input => this.descInput = input}
              onChangeText={descInput => this.setState({ descInput })}
            />
            <FormLabel>Price</FormLabel>
            <FormInput
              style={styles.formInput}
              keyboardType={'numeric'}
              ref={input => this.priceInput = input}
              onChangeText={priceInput => this.setState({ priceInput })}
            />
            <FormLabel>Commission</FormLabel>
            <FormInput
              style={styles.formInput}
              keyboardType={'numeric'}
              ref={input => this.commissionInput = input}
              onChangeText={commissionInput => this.setState({ commissionInput })}
            />
          </View>
          <Button
            disabled={!this._isFormComplete()}
            backgroundColor='darkblue'
            style={styles.submitButtonStyle}
            containerViewStyle={{ borderWidth: 0.5 }}
            onPress={() => { this.submitButtonOnPressHandler() }}
            title='Submit' />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  formInput: {
    width: '100%',
    paddingTop: 5,
    fontSize: 15.24,
  }
});
