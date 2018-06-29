import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { setTermsAgree } from '../storage/StorageUtils';

export default class FirstView extends Component {
  constructor() {
    super();
    this.state = {
      agreed: false,
    };
  }

  onChangeAgreeSwitch(v) {
    this.setState({ agreed: v });
  }

  onPressAgreeButton() {
    if (this.state.agreed === true) {
      setTermsAgree(true);
      this.props.navigation.push('LogIn');
    } else {
      this.cancel();
    }
  }

  onPressCancelButton() {
    this.cancel();
  }

  cancel() {
    Alert.alert('Error', 'You must agree to proceed.', [
      {text: 'Close'},
    ])
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>
            Welcome to Lifestyle App
          </Text>
          <Text>
            Terms and Conditions
          </Text>
          <Text>{`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt in lacus ac euismod. Nulla a maximus mauris. Fusce eu pellentesque sem. Aliquam fringilla enim a leo consequat molestie. Nam vel efficitur nibh. Suspendisse potenti. Vestibulum volutpat placerat tellus, vel varius ante egestas et.
  Duis sit amet mollis tortor, ac mollis eros. Nulla quis quam imperdiet, eleifend ipsum ac, ultrices tellus. Quisque nec molestie turpis. Pellentesque ornare odio eget viverra rhoncus. Mauris varius nisl a magna venenatis, a eleifend tortor aliquet. Aliquam ornare metus sit amet eleifend facilisis. Aenean elementum non ligula nec rhoncus. Nunc dapibus venenatis velit, et egestas tellus porttitor vulputate. Pellentesque nec mauris eu augue cursus varius ac et neque. Morbi ut lorem sagittis, tristique ex ac, hendrerit sem. Morbi eu velit sodales, blandit libero molestie, malesuada lectus. In hac habitasse platea dictumst. Cras cursus cursus luctus. In sollicitudin iaculis ornare.
          `}</Text>

          <View style={styles.switchContainer}>
            <Switch
              style={styles.switchControl}
              onValueChange={this.onChangeAgreeSwitch.bind(this)}
              value={this.state.agreed}
            />
            <Text style={styles.switchText}>I&rsquo;ve read and agreed to the Terms of Service and Privacy Policy</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonControl}
              onPress={this.onPressAgreeButton.bind(this)}
              title="Agree"
            />
            <Button
              style={styles.buttonControl}
              onPress={this.onPressCancelButton.bind(this)}
              title="Cancel"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  switchControl: {
    flexGrow: 0,
  },
  switchText: {
    flex: 1,
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  buttonControl: {},
});
