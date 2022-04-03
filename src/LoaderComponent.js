import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';
import {ms, vs} from './scalling';
import CommonColor from './CommonColor';

const WIDTH = Dimensions.get('window').width;
export default function LoaderComponent({props}) {
  return (
    <View>
      <Modal hasBackdrop={false} isVisible={props.start}>
        <View style={{flex: 1}}>
          <View
            style={{
              padding: ms(3),
              backgroundColor: CommonColor.SecondaryColor,
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderColor: CommonColor.SecondaryColor,
                borderWidth: 0.8,
                justifyContent: 'center',
                borderRadius: 4,
                width: '100%',
                minHeight: vs(55),
                alignItems: 'center',
                backgroundColor: CommonColor.PrimaryColorShade,
                elevation: 5,
                padding: ms(4),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'flex-end',
                  marginRight: ms(15),
                  color: CommonColor.GraySpecific,
                  fontFamily: 'Roboto-Medium',
                  fontSize: ms(16),
                }}>
                Loading...
              </Text>
              <Spinner
                color={CommonColor.GraySpecific}
                size={30}
                type={'Circle'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
