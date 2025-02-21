import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import SalesmenScreen from '../screens/SalesmenScreen';
import OpportunitiesScreen from '../screens/OpportunitiesScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfileScreen from  '../screens/UserProfileScreen';

export default TabNavigator(
  {
    Opportunities: {
      screen: OpportunitiesScreen,
    },
    Profile: {
      screen: UserProfileScreen,
    },
    /*
    Salesmen: {
      screen: SalesmenScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Links: {
      screen: LinksScreen,
    },
    */
    Settings: {
      screen: SettingsScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Salesmen':
          case 'Opportunities':
          case 'Home':
          case 'Profile':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios'
              ? `ios-link${focused ? '' : '-outline'}`
              : 'md-link';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
