import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import RootStackNavigator from './components/RootStackNavigator';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default RootStackNavigator;
