import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import CommonStyles from './CommonStyles';
import { formatDate } from './FormatHelper';

const SuccessText = ({data, resp, textStyle}) => {
  if (data.quota_full === true) {
    return (
      <Text style={textStyle}>
        You are on the gym waitlist for {formatDate(data.date)} ({data.time}).
      </Text>
    );
  } else {
    return (
      <Text style={textStyle}>
        Successfully booked on {formatDate(data.date)} ({data.time}).
      </Text>
    );
  }
}

export default class GymBookSuccessView extends Component {
  constructor(props) {
    super(props);
    this.data = props.navigation.getParam('data');
    this.resp = props.navigation.getParam('resp');
  }

  onDonePress() {
    this.props.navigation.popToTop();
  }

  onEditPress(d) {
    this.data.booking_id = this.resp.data.booking_id;
    this.props.navigation.push('GymBookConfirmView', {
      data: this.data
    });
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <View style={[styles.textContainer, CommonStyles.bgWhite, CommonStyles.bottomSeparator]}>
          <SuccessText textStyle={[CommonStyles.fontFormInput, {color: 'black'}]} data={this.data} resp={this.resp} />
        </View>
        <View style={[styles.buttonContainer, CommonStyles.bgWhite, CommonStyles.bottomSeparator]}>
          <TouchableNativeFeedback
            onPress={this.onEditPress.bind(this)}>
            <View style={CommonStyles.touchableSubmitButton}>
              <Text style={[CommonStyles.colorBrightBlue, CommonStyles.touchableSubmitButtonText, {fontWeight: '500'}]}>{'REVIEW BOOKING'}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this.onDonePress.bind(this)}>
            <View style={CommonStyles.touchableSubmitButton}>
              <Text style={[CommonStyles.colorBrightBlue, CommonStyles.touchableSubmitButtonText, {fontWeight: '500'}]}>{'DONE'}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    padding: 22,
  },
  buttonContainer: {
    padding: 11,
    flex: 1,
    flexBasis: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
