import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { purgeStore } from '../storage/StorageUtils';

export default class SettingsView extends Component {
  didPressClearDataButton() {
    purgeStore();
    this.props.navigation.navigate('Welcome');
  }

  render() {
    return (
      <Button
        onPress={this.didPressClearDataButton.bind(this)}
        title="Clear Data"
      />
    );
  }
}
