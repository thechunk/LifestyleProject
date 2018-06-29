import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { formatDate } from './FormatHelper';

const SuccessText = ({data, result, param}) => {
  console.log(result);
  if (result.waitlist === true) {
    return (
      <Text>
        You are on the gym waitlist for {formatDate(data.date)} ({param.time}).
      </Text>
    );
  } else {
    return (
      <Text>
        Successfully booked on {formatDate(data.date)} ({param.time}).
      </Text>
    );
  }
}

export default class GymBookSuccessView extends Component {
  constructor(props) {
    super(props);
    this.data = props.navigation.getParam('data');
    this.result = props.navigation.getParam('result');
    this.param = props.navigation.getParam('param');
  }

  onDonePress() {
    this.props.navigation.popToTop();
  }

  onEditPress(d) {
    this.props.navigation.push('GymBookConfirmView', {
      data: this.data
    });
  }

  render() {
    return (
      <View>
        <SuccessText data={this.data} result={this.result} param={this.param} />
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onEditPress.bind(this)}
            title="Review Booking"
          />
          <Button
            onPress={this.onDonePress.bind(this)}
            title="Done"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
