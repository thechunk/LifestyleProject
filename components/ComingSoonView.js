import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

export default class ComingSoonView extends Component {
  static navigationOptions = {
    drawerLabel: 'Coming Soon',
  };

  onBackPress() {
    this.props.navigation.navigate('Gym');
  }

  render() {
    return (
      <View>
        <Text>
          Coming Soon
        </Text>
        <Button
          onPress={this.onBackPress.bind(this)}
          title="Go back"
        />
      </View>
    );
  }
}
