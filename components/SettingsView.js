import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { purgeStore } from '../storage/StorageUtils';
import CommonStyles from './CommonStyles';

export default class SettingsView extends Component {
  didPressClearDataButton() {
    purgeStore();
    this.props.navigation.navigate('Welcome');
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableNativeFeedback
          onPress={this.didPressClearDataButton.bind(this)}>
          <View style={CommonStyles.touchableSubmitButton}>
            <Text style={[CommonStyles.colorBrightBlue, CommonStyles.touchableSubmitButtonText, {textAlign: 'center', fontWeight: '500'}]}>CLEAR DATA</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    padding: 11,
    flex: 1,
    flexBasis: '100%',
    justifyContent: 'flex-start',
  },
});
