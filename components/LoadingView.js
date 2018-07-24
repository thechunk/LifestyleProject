import { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { getAuthToken, getTermsAgree } from '../storage/StorageUtils';

export default class LoadingView extends Component {
  componentDidMount() {
    let routeName = 'First';
    getTermsAgree()
      .then((result) => {
        if (result === true) {
          routeName = 'LogIn'
        }
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        getAuthToken()
          .then((result) => {
            if (0 < result || !!result.length) {
              this.props.navigation.navigate('Activities');
            } else {
              throw new Error('No auth token');
            }
          })
          .catch(e => {
            const actionToDispatch = StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({routeName})]
            })
            this.props.navigation.dispatch(actionToDispatch)
          });

      });
  }

  render() {
    return null;
  }
}
