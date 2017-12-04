import React from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import AppModel from "../model/AppModel";
import * as appServices from "../services/AppServices";
import SalesOpportunity from "../model/SalesOpportunity";

export default class NewSalesOpportunityScreen extends React.Component {
  static navigationOptions = {
    title: 'New Sales Opportunity',
  };

  constructor(props) {
    super(props);

    this.state = {
      nameInput:"",
      descInput: "",
      priceInput: "",
      commissionInput: ""
    };
  }

  submitButtonOnPressHandler(goBack) {
    let newSalesOpportunityObj = new SalesOpportunity(this.state.nameInput, 
      this.state.descInput, this.state.priceInput, this.state.commissionInput);

    /*
    const appModel = AppModel.instance;
    appModel.addSalesOpportunity(newSalesOpportunityObj);
    */

    // TODO: Call function to save new sale opportunity on the server
    //appServices.makeRemoteRequest(this);
    appServices.createNewSalesOpportunity(newSalesOpportunityObj, goBack);
  }

  render() {
    const {goBack} = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <FormLabel>Company name</FormLabel>
            <FormInput 
              ref={input => this.nameFormInput = input}
              onChangeText={nameInput => this.setState({nameInput})}
            />
            <FormLabel>Product/Service description</FormLabel>
            <FormInput 
              multiline={true}
              ref={input => this.descFormInput = input}
              onChangeText={descInput => this.setState({descInput})}
            />
            <FormLabel>Price</FormLabel>
            <FormInput 
              keyboardType={'numeric'} 
              ref={input => this.priceFormInput = input}
              onChangeText={priceInput => this.setState({priceInput})}
            />
            <FormLabel>Commission</FormLabel>
            <FormInput 
              keyboardType={'numeric'} 
              ref={input => this.commissionFormInput = input}
              onChangeText={commissionInput => this.setState({commissionInput})}
            />
          </View>
          <Button 
            icon={{name: 'diff-added', type: 'octicon' }}
            backgroundColor='darkblue'
            style={styles.submitButtonStyle}
            onPress={() => { this.submitButtonOnPressHandler(goBack)}}
            title='Submit' />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  submitButtonStyle: {
  }
});
