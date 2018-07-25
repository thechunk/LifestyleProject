import React, { Component } from 'react';
import {
  Alert,
  ProgressBarAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { StackActions } from 'react-navigation';
import Api from './Api';
import CommonStyles from './CommonStyles';
import { setAuthToken } from '../storage/StorageUtils';

export default class LoginView extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }

  onPressSubmitButton() {
    this.setState({ loading: true });
    Api.auth.token(this.state.username, this.state.password)
      .then((resp) => {
        this.setState({ loading: false });
        if (resp instanceof Error) throw resp;
        if (resp.data && resp.data.user_id) {
          setAuthToken(resp.data.user_id);
          this.props.navigation.navigate('Activities');
        } else {
          throw new Error('You have entered an invalid username or password');
        }
      })
      .catch(this.error);
  }

  error({message}) {
    Alert.alert('Error', message, [
      {text: 'Close'},
    ])
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <View style={styles.progressBar}>
          {this.state.loading ? <ProgressBarAndroid styleAttr="Horizontal" color="white" /> : null}
        </View>

        <View style={[CommonStyles.bigHeaderContainer, CommonStyles.bgBrightBlue]}>
          <Text style={[CommonStyles.colorWhite, CommonStyles.fontBigHeader]}>
            Welcome Back!
          </Text>
        </View>

        <View style={[CommonStyles.bgWhite, CommonStyles.bottomSeparator, {padding: 11}]}>
          <View style={styles.formInputView}>
            <TextInput
              style={styles.formInputField}
              autoCapitalize="none"
              selectionColor="rgb(0, 111, 207)"
              underlineColorAndroid="rgb(0, 111, 207)"
              onChangeText={(username) => this.setState({username})}
              placeholder="Username"
            />
          </View>
          <View style={styles.formInputView}>
            <TextInput
              style={styles.formInputField}
              selectionColor="rgb(0, 111, 207)"
              underlineColorAndroid="rgb(0, 111, 207)"
              onChangeText={(password) => this.setState({password})}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={[styles.buttonContainer, CommonStyles.bgWhite]}>
          <TouchableNativeFeedback
            onPress={this.onPressSubmitButton.bind(this)}>
            <View style={[CommonStyles.touchableSubmitButton, CommonStyles.bgBrightBlue, {alignSelf: 'flex-end'}]}>
              <Text style={[CommonStyles.colorWhite, CommonStyles.touchableSubmitButtonText, {textAlign: 'center', fontWeight: '500'}]}>LOG IN</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: 'rgb(0, 111, 207)',
    height: 4,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    padding: 11,
  },
  formInputView: {
  },
  formInputField: {
    padding: 11,
  },
});
