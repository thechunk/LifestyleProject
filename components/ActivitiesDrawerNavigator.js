import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GymDatesView from './GymDatesView';
import GymBookConfirmView from './GymBookConfirmView';
import GymBookSuccessView from './GymBookSuccessView';
import SettingsView from './SettingsView';
import ComingSoonView from './ComingSoonView';

const drawerButton = ({ onPress }) => {
  return (
    <Icon
      name="md-menu"
      size={35}
      style={{marginLeft: 22}}
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
        }),
      },
      GymBookConfirmView: {
        screen: GymBookConfirmView,
        navigationOptions: ({ navigation }) => ({
          title: 'Gym Booking',
        }),
      },
      GymBookSuccessView: {
        screen: GymBookSuccessView,
        navigationOptions: ({ navigation }) => ({
          title: 'Gym Booking',
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
