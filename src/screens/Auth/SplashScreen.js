import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import {
  setDidTryAL,
  isLoggedIn,
  login,
  varifiedGotoDashboard
} from '../../store/actions/auth';
import { bindActionCreators } from 'redux';
import SplashScreen from 'react-native-splash-screen';

class SplashStartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      userData: false,
      loader: false,
      flag: false,
    };
  }

  componentDidMount() {
    this.getTokenStatus();
  }

  getTokenStatus = async () => {
    await AsyncStorage.getItem(`@AUTH_STATUS`)
      .then(async (res) => {
        let response;
        if (res) {
          response = JSON.parse(res); // response = token, intialRouteName, loggedIn, userData
          const { email, password } = response;
          console.log('the auth state STORAGE DATa sis   ', response);
          if (email && password) {
            let data = {
              email: email,
              password: password,
              initialRouteName: 'MainScreen',
              screen: 'MainScreen',
            };
            console.log('logged in ', data);
            await this.props.isLoggedIn(data, true);
            await this.props.varifiedGotoDashboard()
          } else {
            this.props.setDidTryAL();
          }


        } else {
          this.props.setDidTryAL();

          console.log('not logged in');
        }

      })
      .catch((err) => {
        console.log('error 0', err);

        this.props.setDidTryAL();
      });
  };


  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={'white'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    stateOfAuth: state.auth,
    stateOfHome: state.loggedInData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { isLoggedIn, setDidTryAL, login, varifiedGotoDashboard },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashStartScreen);
