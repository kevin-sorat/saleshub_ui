import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, TouchableHighlight } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import * as appServices from "../services/AppServices";
import NewSalesOpportunityPanel from './NewSalesOpportunityPanel';

export default class OpportunitiesScreen2 extends React.Component {
  static navigationOptions = {
    title: 'Sales Opportunities',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refreshing: false,
      modalVisible: false
    };

    this.getSalesOpportunities = this.getSalesOpportunities.bind(this);
    this.dismissModalAndUpdate = this.dismissModalAndUpdate.bind(this);
  }

  componentDidMount() {
    this.refreshSalesOpportunities();
  }

  renderHeader = () => {
    return <SearchBar placeholder="Keyword..." lightTheme round />;
  }

  getSalesOpportunities() {
    this.setState({ refreshing: true });
    appServices.getSalesOpportunitiesFromServer((error, result) => {
      if (!error) {
        // const { page, seed } = this.state;
        this.setState({
          // data: page === 1 ? result : [...this.state.data, ...result],
          data: result,
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

  getNewOpportunityModalContent() {
    return (
      <View style={styles.modal}>
      <Text style={styles.text}>Modal is open!</Text>
      <TouchableHighlight 
        onPress={() => this.dismissModalAndUpdate()}
      >
        <Text style={styles.text}>Close Modal</Text>
      </TouchableHighlight>
    </View>
    );
  }

  dismissModalAndUpdate() {
    this.setState({ modalVisible: false });
    this.refreshSalesOpportunities();
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal animationType={"slide"} transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
          {/*}
          {this.getNewOpportunityModalContent()}
          */}
          <NewSalesOpportunityPanel dismissModalAndUpdate={this.dismissModalAndUpdate} />
        </Modal>

        <Button style={styles.postNewButton}
          title="Post new sales"
          onPress={() => this.setState({ modalVisible: true })}
        />

        <SearchBar placeholder="Keyword..." lightTheme round />

        <FlatList style={styles.opportunityList}
          // ListHeaderComponent={this.renderHeader}
          data={this.state.data}
          extraData={this.state.data}
          onRefresh={() => this.refreshSalesOpportunities()}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.5}
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
