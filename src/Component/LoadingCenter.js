
import React, { Component } from 'react';
import { View, Text } from "react-native";
import Spinner from 'react-native-spinkit';
import { AppStyles } from '../AppStyles';
import { ms, vs } from '../scalling';


const LoadingCenter = () => {

  return (<>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
          color={AppStyles.color.tint}
          size={30}
          type={'Circle'}
        />
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: AppStyles.color.tint,
              fontFamily: 'Roboto-Medium',
              fontSize: vs(18),
              fontWeight: 'bold'
            }}>
            Loading...
          </Text>
        </View>
      </View>
    </View>
  </>
  );
}

export default LoadingCenter;