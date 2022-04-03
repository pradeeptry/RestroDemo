import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { setDidTryAL, setOrientation } from '../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// MainDashboardNavigator,
import MainDashBoard from './MainDashboard';
import AuthNavigator from './AuthStack';
import StartupScreen from '../screens/Auth/SplashScreen';

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defLoader: false,
      didTryAutoLogin: this.props.stateOfAuth.didTryAutoLogin ? this.props.stateOfAuth.didTryAutoLogin : false,
      loggedIN: this.props.stateOfAuth.loggedIN ? this.props.stateOfAuth.loggedIN : false,
      initialRouteName: this.props.stateOfAuth.initialRouteName ? this.props.stateOfAuth.initialRouteName : 'Login'
    };
    this._onOrientationDidChange = this._onOrientationDidChange.bind(this)
    let initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      this.props.setOrientation('PORTRAIT');

      //do stuff
    } else if (initial === 'LANDSCAPE' || initial == 'LANDSCAPE-LEFT' || initial == 'LANDSCAPE-RIGHT') {
      //do other stuff
      this.props.setOrientation('LANDSCAPE');

    }
  }
  _onOrientationDidChange = (orientation) => {
    console.log("the _onOrientationDidChange is APP----", orientation);

    if (orientation == 'LANDSCAPE' || orientation == 'LANDSCAPE-LEFT' || orientation == 'LANDSCAPE-RIGHT') {
      this.props.setOrientation('LANDSCAPE');
      //do something with landscape left layout
    } else if (orientation == 'PORTRAIT') {
      this.props.setOrientation('PORTRAIT');

      //do something with portrait layout
    }
  };
  componentDidMount() {

    Orientation.addOrientationListener(this._onOrientationDidChange);

  }
  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }
  render() {
    const { didTryAutoLogin, initialRouteName, loggedIN, goToDashboard } = this.props.stateOfAuth;
    return (
      <NavigationContainer>
        {goToDashboard && <MainDashBoard />}
        {!goToDashboard && didTryAutoLogin && <AuthNavigator
          intitialRoute={loggedIN ? initialRouteName : initialRouteName ? initialRouteName : null} />}

        {!goToDashboard && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
    );
  };
}
function mapStateToProps(state) {
  return {
    stateOfAuth: state.auth,
    stateOfHome: state.loggedInData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDidTryAL, setOrientation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
