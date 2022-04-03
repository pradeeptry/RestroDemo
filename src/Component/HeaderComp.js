import React, { Component } from 'react';
import {
  View, Text,
  StyleSheet, Dimensions, TouchableOpacity
} from "react-native";
import { Header } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import CommonColor from '../CommonColor';
const { width, height } = Dimensions.get('screen');
const WIDTH80 = width * (80 / 100);





const HeaderComp = (props) => {
  return (
    <Header
      statusBarProps={{ backgroundColor: CommonColor.PrimaryColor }}
      ViewComponent={LinearGradient} // Don't forget this!
      containerStyle={{ alignItems: 'center', justifyContent: 'center', barStyle: 'light-content' }}
      linearGradientProps={{
        colors: [CommonColor.PrimaryColor, CommonColor.PrimaryColor],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      leftContainerStyle={{ justifyContent: 'center' }}
      leftComponent={() => <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => { props.navigation.goBack() }}><Text style={{ color: CommonColor.White, fontWeight: '700' }}>BACK</Text></TouchableOpacity>
      </View>}
      rightComponent={
        <View style={styles.headerRight}>

        </View>
      }
      centerComponent={{ text: `${props.title}`, style: styles.heading }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColor.White
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  leftComponent: {
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default HeaderComp;