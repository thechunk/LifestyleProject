import { StackNavigator } from 'react-navigation';
import FirstView from './FirstView';
import LogInView from './LogInView';
import LoadingView from './LoadingView';
import CommonStyles from './CommonStyles';

export default StackNavigator({
  Loading: {
    screen: LoadingView,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  First: {
    screen: FirstView,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  LogIn: {
    screen: LogInView,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
}, {
  initialRouteName: 'Loading',
});
