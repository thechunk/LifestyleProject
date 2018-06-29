import { StackNavigator } from 'react-navigation';
import FirstView from './FirstView';
import LogInView from './LogInView';
import LoadingView from './LoadingView';

export default StackNavigator({
  Loading: {
    screen: LoadingView,
  },
  First: {
    screen: FirstView,
    navigationOptions: ({ navigation }) => ({
      title: 'Lifestyle',
    }),
  },
  LogIn: {
    screen: LogInView,
    navigationOptions: ({ navigation }) => ({
      title: 'Log In',
    }),
  },
}, {
  initialRouteName: 'Loading',
});
