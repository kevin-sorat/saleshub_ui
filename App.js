import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, AuthSession } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import toQueryString from 'to-querystring';
// import AppModel from "./model/AppModel";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.isTest = true;
    this.currentUser = new Object();
    this.companyInfo = null;

    /*
    this.state = {
      companyInfo: null
    };
    */

    // NOTE: For testing purpose only
    if (this.isTest === true) {
      this.state = {
        isLoadingComplete: true,
        authResultPassed: true, // Set to true right here to bypass authentication, e.g. for testing locally
      }; 

      // const currentUser = AppModel.currentUser;
      this.currentUser.nickname = "Casanova";
      this.currentUser.userID = "007";
      this.currentUser.email = "kevinsorat@gmail.com";
      // alert("Hello " + AppModel.currentUser.nickname + "!!!, user_id: " + AppModel.currentUser.userID + ", email: " + AppModel.currentUser.email);
    } else {
      this.state = {
        isLoadingComplete: false,
        authResultPassed: false, // Set to true right here to bypass authentication, e.g. for testing locally
      };

      this._authenticate();
    }
  }

  _authenticate = async () => {
    const authResult = await AuthSession.startAsync({
      authUrl:
        /*
        'https://ksorat.auth0.com/authorize?' + 
        'response_type=token&' +
        'client_id=vEbx601hQRqyt1kiihdZxbK0RNl5l1Ba&' +
        'redirect_uri=https://auth.expo.io/@ksorat/salesmanhub'
        */
        
        'https://ksorat.auth0.com/login?client=vEbx601hQRqyt1kiihdZxbK0RNl5l1Ba&' +
        toQueryString({
          response_type: 'token',
          redirect_uri: 'https://auth.expo.io/@ksorat/salesmanhub'
        })        
    });

    if (authResult && authResult.type === "success") {
      // alert("authResult: " + JSON.stringify(authResult));
      // alert("access_token: " + authResult.params.access_token);
      // alert("token_type: " + authResult.params.token_type);

      const accessToken = authResult.params.access_token;
      const getUserInfoResult = await this._getUserInfo(accessToken);
      const json = JSON.parse(getUserInfoResult._bodyText);

      // alert("authResult: " + JSON.stringify(getUserInfoResult._bodyText));
      // alert("authResult: " + json._bodyText + " \n " + json._bodyText.email);
      // alert("authResult: " + JSON.stringify(getUserInfoResult._bodyText.user_id));

      // alert("json: " + JSON.stringify(json));
      // alert("email: " + JSON.stringify(json.email));
      // alert("user_id: " + JSON.stringify(json.user_id));
      // alert("Hello " + json.nickname + "!!!, user_id: " + json.user_id + ", email: " + json.email + "\n" + JSON.stringify(json));

      // this.currentUser = AppModel.currentUser;
      this.currentUser.nickname = json.nickname;
      this.currentUser.userID = json.user_id;
      this.currentUser.email = json.email;
      // alert("Hello " + AppModel.currentUser.nickname + "!!!, user_id: " + AppModel.currentUser.userID + ", email: " + AppModel.currentUser.email);
      
      // email, clientID, name, picture, user_id, nickname
      
      this.setState({ authResultPassed: true });
    }
  }

  _getUserInfo = async (accessToken) => {
    try {
      const url = "https://ksorat.auth0.com/userinfo";
      const result = await fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
      return result;
    } catch(e) {
      console.log('Error!', e);
    }
  }

  render() {
    if ((!this.state.isLoadingComplete || !this.state.authResultPassed) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <RootNavigation currentUser={this.currentUser} companyInfo={this.companyInfo} setCompanyInfo={this.setCompanyInfo}/>
        </View>
      );
    }
  }

  setCompanyInfo(companyInfoObj) {
    if (companyInfoObj && companyInfoObj.length > 0) {
      // console.log("==========================> setCompanyInfo: " + companyInfoObj.companyname);
      // this.setState({ companyInfo: companyInfoObj });
      this.companyInfo = companyInfoObj;
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync([
        // This is the font that we are using for our tab bar
        Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
      ]),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
