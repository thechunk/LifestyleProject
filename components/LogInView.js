import React, { Component } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { StackActions } from 'react-navigation';
import Api from './Api';
import { setAuthToken } from '../storage/StorageUtils';

export default class LoginView extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  onPressSubmitButton() {
    Api.auth.token(this.state.username, this.state.password)
      .then((resp) => {
        console.log(resp);
        if (resp.data.token) {
          setAuthToken(resp.data.token);
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
      <ScrollView>
        <View>
          <Text>
            Log In
          </Text>

          <View>
            <TextInput
              onChangeText={(username) => this.setState({username})}
              placeholder="Username"
            />
            <TextInput
              onChangeText={(password) => this.setState({password})}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonControl}
              onPress={this.onPressSubmitButton.bind(this)}
              title="Log In"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
