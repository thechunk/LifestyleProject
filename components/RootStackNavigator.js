import { SwitchNavigator } from 'react-navigation';
import WelcomeStackNavigator from './WelcomeStackNavigator';
import ActivitiesDrawerNavigator from './ActivitiesDrawerNavigator';

export default SwitchNavigator({
  Welcome: { screen: WelcomeStackNavigator },
  Activities: { screen: ActivitiesDrawerNavigator },
}, {
  initialRouteName: 'Welcome',
});
