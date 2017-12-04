import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ComingSoonScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Coming soon!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
