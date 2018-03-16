import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, TouchableHighlight } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import * as appServices from "../services/AppServices";
import NewSalesOpportunityPanel from './NewSalesOpportunityPanel';

export default class OpportunitiesScreen extends React.Component {
  static navigationOptions = {
    title: 'Sales',
  };

  constructor(props) {
    super(props);
 
    this.state = {
      filteredData: [],
      rawData: [],
      refreshing: false,
      modalVisible: false
    };

    this.getSalesOpportunities = this.getSalesOpportunities.bind(this);
    this.dismissModalAndUpdate = this.dismissModalAndUpdate.bind(this);
    this.searchBarChangeTextHandler = this.searchBarChangeTextHandler.bind(this);
    this.searchBarClearTextHandler = this.searchBarClearTextHandler.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    this.refreshSalesOpportunities();
  }

  componentWillReceiveProps(nextProps) {
    console.log("==============> componentWillReceiveProps 2");
    /*
    if (this.props.companyInfo !== nextProps.companyInfo) {
      console.log("==============> componentWillReceiveProps 2");
      if (this.props.companyInfo &&
        this.props.companyInfo.companyname &&
        this.props.companyInfo.companyname.length > 0) {
        this.setState({ nameInput: this.props.companyInfo.companyname });
      }
    }
    */
  }

  searchBarChangeTextHandler(e) {
    let text = e.toLowerCase();
    console.log("==============> searchBarChangeTextHandler:" + text);

    this.applyFilter(text);
  }

  applyFilter(text) {
    if (text.length === 0) {
      this.setState({
        filteredData: this.state.rawData,
      });
    } else {
      let filterByProductNameResults = this.filterByProductName(text);
      // let filterByCompanyNameResults = this.filterByCompanyName(text);
      let filteredResults = filterByProductNameResults;

      console.log("text: " + text);
      console.log("filteredResults: " + JSON.stringify(filteredResults));

      this.setState({
        filteredData: filteredResults,
      });
    }
  }

  filterByProductName(text) {
    let tempArray = []; 
    for (var i=0; i < this.state.rawData.length; i++) {
      let productname = this.state.rawData[i].product.toLowerCase();
      if (productname.includes(text.toLowerCase())) {
        tempArray.push(this.state.rawData[i]);
      }
    }
    return tempArray;
  }

  filterByCompanyName(text) {
    let tempArray = []; 
    for (var i=0; i < this.state.rawData.length; i++) {
      let companyname = this.state.rawData[i].companyname.toLowerCase();
      if (companyname.includes(text.toLowerCase())) {
        tempArray.push(this.state.rawData[i]);
      }
    }
    return tempArray;
  }

  searchBarClearTextHandler() {
    console.log("==============> searchBarClearTextHandler");
  }

  getSalesOpportunities() {
    this.setState({ refreshing: true });
    appServices.getSalesOpportunitiesFromServer((error, result) => {
      if (!error) {

        console.log("==============> getSalesOpportunities result: " + JSON.stringify(result));

        this.setState({
          rawData: result,
          filteredData: result,
          error: result.error || null,
          refreshing: false,
        });

      } else {
        console.error(error);
        this.setState({ refreshing: false });
      }
    });
  }

  refreshSalesOpportunities() {
    this.getSalesOpportunities();
  }

  dismissModalAndUpdate() {
    this.setState({ modalVisible: false });
    this.refreshSalesOpportunities();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Modal animationType={"slide"} transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
          <NewSalesOpportunityPanel currentUser={this.props.screenProps.currentUser} 
            dismissModalAndUpdate={this.dismissModalAndUpdate} />
        </Modal>

        <Button style={styles.postNewButton}
          title={"Post new sales"}
          onPress={() => this.setState({ modalVisible: true })}
        />

        <SearchBar placeholder="Type Here..." lightTheme clearIcon
          onChangeText={this.searchBarChangeTextHandler}
          onClearText={this.searchBarClearTextHandler} />

        <FlatList style={styles.opportunityList}
          data={this.state.filteredData}
          extraData={this.state.filteredData}
          onRefresh={() => this.refreshSalesOpportunities()}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.product}`}
              subtitle={`${item.companyname}`}
              rightTitle={`$${item.price}`}
              onPress={() => navigate('Detail', { 
                currentUser: this.props.screenProps.currentUser, 
                item: item
              })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  postNewButton: {
    
  },
  opportunityList: {
    borderWidth: 1,
    borderColor: 'darkgrey'
  }
});
