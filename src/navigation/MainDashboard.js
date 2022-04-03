import React, { Component } from 'react';
import { getRestroData } from '../store/actions';
import {
  Platform,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { ms, s, vs } from '../scalling';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';
import CommonColor from '../CommonColor';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardNav = createStackNavigator();
class MainDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPropsOfApp: false,
    };
  }

  componentDidMount() {
    // this.props.getMainWalletBalance(this.props.stateOfAuth.token);
  }
  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.stateOfHome !== this.props.stateOfHome) {
    //   console.log("this.state. updateNewKyc")
    //     this.props.getMainWalletBalance(this.props.stateOfAuth.token);
    // }
    // if (this.props.stateOfCommon.wallMainAllDataStatus) {
    //   this.props.getMainWalletBalance();
    // }
  }

  render() {


    return (
      <DashboardNav.Navigator
        headerMode={'none'}
        headerShown={false}
        initialRouteName={'MainScreen'}>
        <DashboardNav.Screen
          name="MainScreen"
          component={MainScreen}

        />
        <DashboardNav.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            title: 'Restrorant', //Set Header Title
            headerStyle: {
              backgroundColor: '#0A0A0A',
              borderBottomColor: CommonColor.PrimaryColor,
              borderBottomWidth: 0,
              shadowColor: CommonColor.GrayBackground,
              shadowOffset: {
                width: 1,
                height: 1, // for iOS
              },
            },
            // headerLeftContainerStyle:{paddingHorizontal:ms(2)},
            headerRightContainerStyle: { paddingHorizontal: ms(12) },
            headerLeft: () => (
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  color: CommonColor.White
                }}><Text>BACK</Text>

              </View>
            ),
            headerRight: () => null,
          }}
        />

      </DashboardNav.Navigator>
    )
  }
}

function mapStateToProps(state) {
  return {
    stateOfAuth: state.auth,
    stateOfHome: state.loggedInData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getRestroData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDashBoard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
