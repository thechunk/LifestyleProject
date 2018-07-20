import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  Picker,
  TouchableNativeFeedback,
  View
} from 'react-native';
import Api from './Api';
import CommonStyles from './CommonStyles';
import { formatDate } from './FormatHelper';

const ConditionalButton = ({hidden, onPress, title, textStyle}) => {
  if (hidden === false) {
    return (
      <TouchableNativeFeedback
        onPress={onPress}>
        <View style={CommonStyles.touchableSubmitButton}>
          <Text style={[textStyle, CommonStyles.touchableSubmitButtonText, {fontWeight: '500'}]}>{title.toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  } else {
    return null;
  }
};

const onConfirmPress = (data, state, navigation) => {
  const date = new Date(data.date).toISOString();
  let apiFn = Api.postBookings;
  if (data.booking_id >= 1) { //!== null) {
    apiFn = Api.patchBookings;

    apiFn(data.date, selectedTime, data.booking_id)
    .then((r) => {
      //if (r instanceof Error) throw r;
      navigation.push('GymBookSuccessView', {
        data: data,
        result: state,
        param: state,
      });
    })
    .catch();
  } else {
    apiFn(data.date, state.time, data.quota_full)
    .then((r) => {
      //if (r instanceof Error) throw r;
      navigation.push('GymBookSuccessView', {
        data: data,
        result: state,
        param: state,
      });
    })
    .catch();
  }
}

let selectedTime = 'am';

export default class GymBookConfirmView extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const editMode = navigation.state.params.data.booking_id >= 1;
    return {
      headerRight: !editMode ? (
        <TouchableNativeFeedback
          onPress={() => {
            onConfirmPress(navigation.state.params.data, navigation.state.params.state, navigation)
          }}>
          <View style={styles.headerButton}>
            <Text style={[styles.headerButtonText, CommonStyles.fontTitleBarButton, CommonStyles.colorWhite]}>
              CONFIRM
            </Text>
          </View>
        </TouchableNativeFeedback>
      ) : null,
    };
  };

  constructor(props) {
    super(props);
    this.data = props.navigation.getParam('data');
    this.state = {
      editMode: this.data.booking_id >= 1, //!== null,
      time: this.data.time ? this.data.time : 'am',
      quota_full: this.data.quota_full ? this.data.quota_full : false
    };
    this.props.navigation.setParams({state: this.state});
  }

  error({message}) {
    Alert.alert('Error', message, [
      {text: 'Close'},
    ])
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
      <View style={[styles.formContainer]}>
        <View style={[styles.formDateView, CommonStyles.bgWhite, CommonStyles.bottomSeparator]}>
          <Text style={CommonStyles.fontFormLabel}>
            Date
          </Text>
          <Text style={[CommonStyles.fontFormLargeInput, CommonStyles.formInputStyle]}>
            {formatDate(this.data.date)}
          </Text>
        </View>
        <View style={[styles.formTimeView, CommonStyles.bgWhite, CommonStyles.bottomSeparator]}>
          <Text style={CommonStyles.fontFormLabel}>
            Time
          </Text>
          <Picker
            selectedValue={this.state.time}
            onValueChange={(v, i) => {
              selectedTime = v;
              this.setState({time: v})
            }}
            enabled={!this.state.editMode}
          >
            <Picker.Item label="AM" value="am" />
            <Picker.Item label="PM" value="pm" />
          </Picker>
        </View>
        <View style={[styles.buttonContainer, CommonStyles.bgWhite, CommonStyles.bottomSeparator]}>
          <ConditionalButton
            hidden={!this.state.editMode}
            onPress={this.onDeletePress.bind(this)}
            textStyle={CommonStyles.colorRed}
            title="Delete"
          />
          <TouchableNativeFeedback
            onPress={this.onCancelPress.bind(this)}>
            <View style={CommonStyles.touchableSubmitButton}>
              <Text style={[CommonStyles.colorBrightBlue, CommonStyles.touchableSubmitButtonText, {fontWeight: '500'}]}>{'RETURN'}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerButton: {
    flex: 1,
  },
  headerButtonText: {
    flex: 1,
    paddingLeft: 22,
    paddingRight: 22,
    textAlignVertical: 'center',
  },
  buttonContainer: {
    padding: 11,
    flex: 1,
    flexBasis: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  formDateView: {
    padding: 22,
    flexBasis: '60%',
  },
  formTimeView: {
    padding: 22,
    flexBasis: '40%',
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
