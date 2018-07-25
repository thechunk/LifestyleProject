import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import CommonStyles from './CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
      <View style={styles.container}>
        <View style={[CommonStyles.bigHeaderContainer, CommonStyles.bgBrightBlue, styles.bgContainer]}>
          <Icon style={{marginTop: '10%'}} name="bike" size={80} color="white" />
        </View>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.termsContainer}>
            <Text style={[CommonStyles.fontStandardHeader, CommonStyles.colorBrightBlue, {fontWeight: '500', marginBottom: 11}]}>
              Welcome to Lifestyle app!
            </Text>
            <Text style={[CommonStyles.fontBody, {marginBottom: 11}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt in lacus ac euismod. Nulla a maximus mauris. Fusce eu pellentesque sem. Aliquam fringilla enim a leo consequat molestie. Nam vel efficitur nibh. Suspendisse potenti. Vestibulum volutpat placerat tellus, vel varius ante egestas et.</Text>
            <Text style={CommonStyles.fontBody}>Duis sit amet mollis tortor, ac mollis eros. Nulla quis quam imperdiet, eleifend ipsum ac, ultrices tellus. Quisque nec molestie turpis. Pellentesque ornare odio eget viverra rhoncus. Mauris varius nisl a magna venenatis, a eleifend tortor aliquet. Aliquam ornare metus sit amet eleifend facilisis. Aenean elementum non ligula nec rhoncus. Nunc dapibus venenatis velit, et egestas tellus porttitor vulputate. Pellentesque nec mauris eu augue cursus varius ac et neque. Morbi ut lorem sagittis, tristique ex ac, hendrerit sem. Morbi eu velit sodales, blandit libero molestie, malesuada lectus. In hac habitasse platea dictumst. Cras cursus cursus luctus. In sollicitudin iaculis ornare.</Text>

            <View style={styles.switchContainer}>
              <Switch
                style={styles.switchControl}
                onValueChange={this.onChangeAgreeSwitch.bind(this)}
                value={this.state.agreed}
              />
              <Text style={[styles.switchText, CommonStyles.fontBodyEm]}>I&rsquo;ve read and agreed to the Terms of Service and Privacy Policy</Text>
            </View>
          </View>

        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            onPress={this.onPressCancelButton.bind(this)}>
            <View style={CommonStyles.touchableSubmitButton}>
              <Text style={[CommonStyles.touchableSubmitButtonText, {fontWeight: '500'}]}>DECLINE</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this.onPressAgreeButton.bind(this)}>
            <View style={CommonStyles.touchableSubmitButton}>
              <Text style={[CommonStyles.touchableSubmitButtonText, CommonStyles.colorBrightBlue, {fontWeight: '500'}]}>ACCEPT</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    height: 220,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  termsContainer: {
    marginTop: 160,
    marginRight: 22,
    marginBottom: 33,
    marginLeft: 22,
    padding: 22,
    backgroundColor: 'white',
    borderRadius: 2,
    elevation: 1,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 11,
  },
  switchControl: {
    flexGrow: 0,
  },
  switchText: {
    flex: 1,
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollViewContainer: {
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  buttonControl: {},
});
