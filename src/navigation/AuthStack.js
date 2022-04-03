import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login, { ScreenOptions as LoginHeader } from '../screens/Auth/Login';
const InitialNav = createStackNavigator();
const AuthNavigator = (props) => {
  console.log('the auth nav props ', props);
  return (

    <InitialNav.Navigator
      // headerMode={'none'}
      headerShown={false}
      initialRouteName={
        props.intitialRoute ? props.intitialRoute : 'Login'
      }>
      <InitialNav.Screen
        name="Login"
        component={Login}
        // options={LoginHeader} 
        options={{ headerShown: false }}
      />

    </InitialNav.Navigator>
  );
};

export default AuthNavigator;
