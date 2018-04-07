import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    const { params } = this.props.navigation.state;
    const { navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>

        {/*
        <Text>Company Name: {params.item.companyname}</Text>
        <Text>Product: {params.item.product}</Text>
        <Text>Description: {params.item.description}</Text>
        <Text>Price: {params.item.price}</Text>
        <Text>Commission: {params.item.commission}</Text>
        <Text>Current User: {params.currentUser.nickname}</Text>
        */}

        <FormLabel>Company Name</FormLabel>
        <FormInput
          style={styles.formInput}
          value={params.item.companyname}
          editable={false}
        />
        <FormLabel>Product</FormLabel>
        <FormInput
          style={styles.formInput}
          value={params.item.product}
          editable={false}
        />
        <FormLabel>Description</FormLabel>
        <FormInput
          style={styles.formInput}
          multiline={true}
          value={params.item.description}
          editable={false}
        />
        <FormLabel>Price</FormLabel>
        <FormInput
          style={styles.formInput}
          value={params.item.price}
          editable={false}
        />
        <FormLabel>Commission</FormLabel>
        <FormInput
          style={styles.formInput}
          value={params.item.commission}
          editable={false}
        />
        <FormLabel>Posted by</FormLabel>
        <FormInput
          style={styles.formInput}
          value={params.item.userid}
          editable={false}
        />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            backgroundColor='darkblue'
            containerViewStyle={{ borderWidth: 0.5 }}
            title='Contact Poster'
            onPress={() => navigate('Chat', { 
              currentUser: params.currentUser,
              item: params.item
            })} />
          <Button
            style={styles.button}
            backgroundColor='darkblue'
            containerViewStyle={{ borderWidth: 0.5 }}
            title='Sign Smart Contract' />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  button: {
    
  },
  formInput: {
    width: '100%',
    paddingTop: 5,
    fontSize: 15.24,
  }
});
