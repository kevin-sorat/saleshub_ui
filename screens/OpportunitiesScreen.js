import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import NewSalesOpportunityScreen from './NewSalesOpportunityScreen';
import * as appServices from "../services/AppServices";

class OpportunitiesScreen extends React.Component {
  static navigationOptions = {
    title: 'Available Sales Opportunities',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log("==================> componentDidMount!!!");
    appServices.getSalesOpportunitiesFromServer(this);
  }

  componentDidFocus() {
    console.log("==================> componentDidFocus!!!");
    // appServices.getSalesOpportunitiesFromServer(this);
  }

  componentDidUpdate() {
    console.log("==================> componentDidUpdate!!!");
  }

  renderHeader = () => {
    return <SearchBar placeholder="Keyword..." lightTheme round />;
  };

  /*
  render() {
    const { navigate } = this.props.navigation;
    return (
      <List>
        <Button
          title="Post new sales"
          onPress={() => navigate('NewOpportunity')}
        />
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.state.data}
          keyExtractor={item => item.email}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={`${item.location.city}, ${item.location.state}`}
              avatar={{ uri: item.picture.thumbnail }}
            />
          )}
        />
      </List>
    );
  }
  */

  onRefresh = async () => {
    // this.setState({
    //   isRefreshing: true
    // });
    console.log("================> onRefresh");
    appServices.getSalesOpportunitiesFromServer(this);

    // this.setState({
    //   isRefreshing: false
    // });
  };

  someFun() {
    console.log("================> someFun");
    this.onRefresh();
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Post new sales"
          onPress={() => navigate('NewOpportunity', { data: this.state.data })}
          // onPress={() => this.someFun()}
        />
        <Button
          title="Refresh"
          onPress={() => this.someFun()}
        />
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.state.data}
          extraData={this.state.data}
          // onRefresh={this.someFun}
          // refreshing={this.state.refreshing}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.companyname}`}
              subtitle={`${item.description}`}
              rightTitle={`$${item.price}`}
              /*
              avatar={{ uri: item.picture.thumbnail }}
              */
            />
          )}
        />
      </View>
    );
  }
}

const OppotunitiesStackNav = StackNavigator({
  OpportunitiesList: { screen: OpportunitiesScreen },
  NewOpportunity: { screen: NewSalesOpportunityScreen },
});

export default class App extends React.Component {
  render() {
    return <OppotunitiesStackNav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});