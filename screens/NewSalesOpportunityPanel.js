import React from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Header } from 'react-native-elements'

import AppModel from "../model/AppModel";
import * as appServices from "../services/AppServices";
import SalesOpportunity from "../model/SalesOpportunity";

export default class NewSalesOpportunityScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameInput:"",
      descInput: "",
      priceInput: "",
      commissionInput: ""
    };
  }

  submitButtonOnPressHandler() {
    let newSalesOpportunityObj = new SalesOpportunity(this.state.nameInput, 
      this.state.descInput, this.state.priceInput, this.state.commissionInput);

    // Call function to save new sale opportunity on the server
    appServices.createNewSalesOpportunity(newSalesOpportunityObj, this.props.dismissModalAndUpdate);
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
            onPress={() => { this.submitButtonOnPressHandler()}}
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
  submitButtonStyle: {
  }
});
