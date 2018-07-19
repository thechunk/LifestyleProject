import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  Picker,
  View
} from 'react-native';
import Api from './Api';
import { formatDate } from './FormatHelper';

const ConditionalButton = ({hidden, onPress, title}) => {
  if (hidden === false) {
    return (
      <Button
        onPress={onPress}
        title={title}
      />
    );
  } else {
    return null;
  }
};

export default class GymBookConfirmView extends Component {
  constructor(props) {
    super(props);
    this.data = props.navigation.getParam('data');
    this.state = {
      editMode: this.data.booking_id >= 1, //!== null,
      time: this.data.time ? this.data.time : 'am',
      quota_full: this.data.quota_full ? this.data.quota_full : false
    };
  }

  error({message}) {
    Alert.alert('Error', message, [
      {text: 'Close'},
    ])
  }

  onConfirmPress() {
    const date = new Date(this.data.date).toISOString();
    let apiFn = Api.postBookings;
    if (this.data.booking_id >= 1) { //!== null) {
      apiFn = Api.patchBookings;

      apiFn(this.data.date, this.state.time, this.data.booking_id)
        .then((r) => {
          //if (r instanceof Error) throw r;
          this.props.navigation.push('GymBookSuccessView', {
            data: this.data,
            result: this.state,
            param: this.state,
          });
        })
        .catch(this.error);
    } else {
      apiFn(this.data.date, this.state.time, this.data.quota_full)
        .then((r) => {
          //if (r instanceof Error) throw r;
          this.props.navigation.push('GymBookSuccessView', {
            data: this.data,
            result: this.state,
            param: this.state,
          });
        })
        .catch(this.error);
    }

    // apiFn(date, this.state.time, this.data.booking_id)
  }

  onDeletePress() {
    Api.deleteBookings(this.data.booking_id)
      .then((r) => {
        //if (r instanceof Error) throw r;
        this.props.navigation.popToTop();
      })
      .catch(this.error);
  }

  onCancelPress() {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <View>
        <View>
          <Text>
            Date:
          </Text>
          <Text>
            {formatDate(this.data.date)}
          </Text>
        </View>
        <View>
          <Text>
            Time:
          </Text>
          <Picker
            selectedValue={this.state.time}
            onValueChange={(v, i) => this.setState({time: v})}
            enabled={!this.state.editMode}
          >
            <Picker.Item label="AM" value="am" />
            <Picker.Item label="PM" value="pm" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <ConditionalButton
            hidden={this.state.editMode}
            onPress={this.onConfirmPress.bind(this)}
            title="Confirm"
          />
          <ConditionalButton
            hidden={!this.state.editMode}
            onPress={this.onDeletePress.bind(this)}
            title="Delete"
          />
          <Button
            onPress={this.onCancelPress.bind(this)}
            title="Return"
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
