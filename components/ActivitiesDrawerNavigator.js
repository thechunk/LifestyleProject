import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GymDatesView from './GymDatesView';
import GymBookConfirmView from './GymBookConfirmView';
import GymBookSuccessView from './GymBookSuccessView';
import SettingsView from './SettingsView';
import ComingSoonView from './ComingSoonView';
import CommonStyles from './CommonStyles';

const drawerButton = ({ onPress }) => {
  return (
    <Icon
      name="md-menu"
      size={35}
      style={{marginLeft: 22}}
      color='white'
      onPress={onPress}
    />
  )
}

export default DrawerNavigator(
  {
    Gym: { screen: StackNavigator({
      GymDatesView: {
        screen: GymDatesView,
        navigationOptions: ({ navigation }) => ({
          title: 'Gym Booking',
          headerLeft: drawerButton({ onPress: () => navigation.toggleDrawer() }),
          headerStyle: [CommonStyles.bgBrightBlue],
          headerTitleStyle: [CommonStyles.colorWhite],
          headerTintColor: 'white', 
        }),
      },
      GymBookConfirmView: {
        screen: GymBookConfirmView,
        navigationOptions: ({ navigation }) => ({
          title: 'Gym Booking',
          headerStyle: [CommonStyles.bgBrightBlue],
          headerTitleStyle: [CommonStyles.colorWhite],
          headerTintColor: 'white',
        }),
      },
      GymBookSuccessView: {
        screen: GymBookSuccessView,
        navigationOptions: ({ navigation }) => ({
          title: 'Gym Booking',
          headerStyle: [CommonStyles.bgBrightBlue],
          headerTitleStyle: [CommonStyles.colorWhite],
          headerTintColor: 'white',
        }),
      },
    }, {
      initialRouteName: 'GymDatesView',
    })},
    ComingSoonOne: {
      screen: ComingSoonView
    },
    ComingSoonTwo: {
      screen: ComingSoonView
    },
    Settings: { screen: StackNavigator({
      SettingsView: {
        screen: SettingsView,
        navigationOptions: ({ navigation }) => ({
          title: 'Settings',
          headerLeft: drawerButton({ onPress: () => navigation.toggleDrawer() }),
        }),
      },
    }, {
      initialRouteName: 'SettingsView',
    })}
  },
  {
    initialRouteName: 'Gym',
  }
);
