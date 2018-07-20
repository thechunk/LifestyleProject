import React, { Component } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import Api from './Api';
import CommonStyles from './CommonStyles';
import { formatDate, getWeekday } from './FormatHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookButton = ({data, onPressBookButton}) => {
  let title = "Book";
  let color = "rgb(0, 111, 207)";
  if (data.booking_id >= 1) {//!== null) {
    title = "Review";
    color = "rgb(0, 155, 187)";
  } else if (data.quota_full === true) {
    title = "Waitlist";
    color = "rgb(248, 153, 34)";
  }
  return (
    <TouchableNativeFeedback
      onPress={() => onPressBookButton(data)}>
      <View style={CommonStyles.touchableSubmitButton}>
        <Text style={[CommonStyles.touchableSubmitButtonText, {fontWeight: '500', color: color}]}>{title.toUpperCase()}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const StatusCell = ({data}) => {
  let icon = null;
  if (data.booking_id >= 1) {
    icon = <Icon style={{flexBasis: 22, textAlignVertical: 'center'}} name="check" size={20} color="rgb(63, 156, 53)" />;
  }
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {icon}
      <Text style={[styles.tableCellText, CommonStyles.fontBody]}>
        {typeof data.time === 'string' ? data.time.toUpperCase() : null}
      </Text>
    </View>
  );
};

export default class GymDatesView extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      Api.dates()
        .then((r) => {
          if (r instanceof Error) throw r;
          this.setState(r);
        })
        .catch(this.error);
    });
  }

  error({message}) {
    Alert.alert('Error', message, [
      {text: 'Close'},
    ])
  }

  onPressBookButton(d) {
    this.props.navigation.push('GymBookConfirmView', {
      data: d
    });
  }

  renderRow() {
    return this.state.data.map((d, i) => (
      <View key={i} style={[styles.tableRowBase, styles.tableRow, CommonStyles.bottomSeparator]}>
        <View style={[styles.tableCell, styles.tableCellWeekday]}>
          <Text style={[styles.tableCellText, CommonStyles.fontBody]}>{getWeekday(d.date)}</Text>
        </View>
        <View style={[styles.tableCell, styles.tableCellDate]}>
          <Text style={[styles.tableCellText, CommonStyles.fontBodyEm]}>{formatDate(d.date)}</Text>
        </View>
        <View style={[styles.tableCell, styles.tableCellTime]}>
          <StatusCell
            data={d}
          />
        </View>
        <View style={[styles.tableCell, styles.tableCellAction, {alignItems: 'center'}]}>
          <BookButton
            data={d}
            onPressBookButton={this.onPressBookButton.bind(this)}
          />
        </View>
      </View>
    ));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={[styles.tableRowBase, styles.tableHeader, CommonStyles.bgWhite]}>
          <View style={[styles.tableCell, styles.tableCellWeekday]}></View>
          <View style={[styles.tableCell, styles.tableCellDate]}>
            <Text style={[CommonStyles.colorBrightBlue, styles.tableCellText, CommonStyles.fontTableHeadingEm]}>Date</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellTime]}>
            <Text style={[CommonStyles.colorBrightBlue, styles.tableCellText, CommonStyles.fontTableHeading]}>Booked</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellAction]}>
            <Text style={[CommonStyles.colorBrightBlue, styles.tableCellText, CommonStyles.fontTableHeading, {textAlign: 'center'}]}>Actions</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={[styles.tableContainer]}>
          {this.renderRow.bind(this)()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tableContainer: {flexGrow: 1},
  tableHeader: {
    height: 56,
    alignItems: 'center',
    alignContent: 'center',
    elevation: 4,
  },
  tableRow: {
    backgroundColor: 'white',
  },
  tableRowBase: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tableCell: {
    flex: 1,
    paddingTop: 4,
    paddingRight: 11,
    paddingBottom: 4,
    paddingLeft: 11,
  },
  tableCellWeekday: {
    flexGrow: 0.2,
  },
  tableCellDate: {
    flexGrow: 0.4,
  },
  tableCellTime: {
    flexGrow: 0.3,
  },
  tableCellAction: {
    flexGrow: 0.4,
  },
  tableCellText: {
    flex: 1,
    textAlignVertical: 'center',
  }
});
