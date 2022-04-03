import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/reduxStore';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  
  return (
    <SafeAreaProvider>

    <Provider store={store}>
      <AppNavigator />
    </Provider>
    </SafeAreaProvider>
  );
}
