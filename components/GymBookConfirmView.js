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

const DeleteButton = ({editMode, onDeletePress}) => {
  if (editMode === true) {
    return (
      <Button
        onPress={onDeletePress}
        title="Delete"
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
      editMode: this.data.booking_id !== null,
      time: this.data.time ? this.data.time : 'am',
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
    if (this.data.booking_id !== null) {
      apiFn = Api.patchBookings;
    }

    apiFn(date, this.state.time, this.data.booking_id)
      .then((r) => {
        if (r instanceof Error) throw r;
        this.props.navigation.push('GymBookSuccessView', {
          data: this.data,
          result: r.data,
          param: this.state,
        });
      })
      .catch(this.error);
  }

  onDeletePress() {
    Api.deleteBookings(this.data.booking_id)
      .then((r) => {
        if (r instanceof Error) throw r;
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
            {this.data.date}
          </Text>
        </View>
        <View>
          <Text>
            Time:
          </Text>
          <Picker
            selectedValue={this.state.time}
            onValueChange={(v, i) => this.setState({time: v})}
          >
            <Picker.Item label="AM" value="am" />
            <Picker.Item label="PM" value="pm" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onConfirmPress.bind(this)}
            title="Confirm"
          />
          <DeleteButton
            editMode={this.state.editMode}
            onDeletePress={this.onDeletePress.bind(this)}
          />
          <Button
            onPress={this.onCancelPress.bind(this)}
            title="Cancel"
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
