import React, { Component } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Api from './Api';
import CommonStyles from './CommonStyles';
import { formatDate } from './FormatHelper';

const BookButton = ({data, onPressBookButton}) => {
  let title = "Book";
  let color = "green";
  if (data.booking_id !== null) {
    title = "Review";
    color = null;
  } else if (data.quota_full === true) {
    title = "Waitlist";
    color = "orange";
  }
  return (
    <Button
      color={color}
      onPress={() => onPressBookButton(data)}
      title={title}
    />
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
      <View key={i} style={[styles.tableRowBase, styles.tableRow]}>
        <View style={styles.tableCell}>
          <Text>{formatDate(d.date)}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{d.time}</Text>
        </View>
        <View style={styles.tableCell}>
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
      <ScrollView contentContainerStyle={[CommonStyles.standardContainer, styles.tableContainer]}>
        <View style={[styles.tableRowBase, styles.tableHeader, CommonStyles.bgDeepBlue]}>
          <View style={styles.tableCell}>
            <Text style={CommonStyles.colorWhite}>Date</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={CommonStyles.colorWhite}>Time</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={CommonStyles.colorWhite}>Actions</Text>
          </View>
        </View>
        {this.renderRow.bind(this)()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tableContainer: {},
  tableHeader: {
    height: 56,
    alignItems: 'center',
    alignContent: 'center',
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
    padding: 4,
  },
});
