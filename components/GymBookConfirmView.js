import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Picker,
  ProgressBarAndroid,
  TouchableNativeFeedback,
  View
} from 'react-native';
import Api from './Api';
import CommonStyles from './CommonStyles';
import { formatDate } from './FormatHelper';

const ConditionalButton = ({hidden, onPress, title, textStyle, disabled}) => {
  if (hidden === false) {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        disabled={disabled}>
        <View style={CommonStyles.touchableSubmitButton}>
          <Text style={[textStyle, CommonStyles.touchableSubmitButtonText, {fontWeight: '500'}]}>{title.toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  } else {
    return null;
  }
};

const onConfirmPress = (data, navigation) => {
  const date = new Date(data.date).toISOString();
  Api.postBookings(data.date, selectedTime, data.quota_full)
  .then((resp) => {
    //if (r instanceof Error) throw r;
    navigation.push('GymBookSuccessView', { data, resp });
  })
  .catch();
}

let selectedTime = 'am';
let confirmLoading = false;

export default class GymBookConfirmView extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const editMode = navigation.state.params.data.booking_id >= 1;
    return {
      headerRight: !editMode ? (
        <TouchableNativeFeedback
          onPress={() => {
            if (confirmLoading === false) {
              confirmLoading = true;
              navigation.state.params.instance.setState({ loading: true });
              onConfirmPress(navigation.state.params.data, navigation);
            }
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
      quota_full: this.data.quota_full ? this.data.quota_full : false,
      loading: false,
    };
    this.props.navigation.setParams({instance: this});
  }

  componentDidMount() {
    selectedTime = 'am';
    confirmLoading = false;
  }

  error({message}) {
    Alert.alert('Error', message, [
      {text: 'Close'},
    ])
  }

  onDeletePress() {
    this.setState({ loading: true });
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
        <View style={CommonStyles.progressBar}>
          {this.state.loading ? <ProgressBarAndroid styleAttr="Horizontal" color="rgb(0, 111, 207)" /> : null}
        </View>
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
            disabled={this.state.loading}
            title="Delete"
          />
          <TouchableNativeFeedback
            onPress={this.onCancelPress.bind(this)}
            disabled={this.state.loading}>
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
