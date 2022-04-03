import Carousel from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRestroData } from '../../store/actions';
import { bindActionCreators } from 'redux';
import CloseIcon from 'react-native-vector-icons/AntDesign'
import {
  View, Text, FlatList,
  StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity
} from "react-native";
const { width, height } = Dimensions.get('screen');
const LandscapePageInfo = ({ index, total }) => {
  return (
    <View style={{ position: 'absolute', left: Dimensions.get('screen').width - 150, bottom: 60, backgroundColor: 'grey', height: 50, width: 50, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignSelf: 'center', justifyContent: 'center' }}><Text style={{ color: 'white' }}>{`${index}/${total}`}</Text>
      </View>
    </View>
  )
}
const PortraitPageInfo = ({ index, total }) => {
  return (
    <View style={{ position: 'absolute', right: 20, bottom: 60, backgroundColor: 'grey', height: 50, width: 50, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignSelf: 'center', justifyContent: 'center' }}><Text style={{ color: 'white' }}>{`${index}/${total}`}</Text>
      </View>
    </View>
  )

}
class MyCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _renderItem = ({ item, index }) => {
    console.log(item)
    return (
      <View >
        <View style={styles.closeDiv}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => { this.props.stopSlider() }}>

            <CloseIcon name='closecircle' size={30} color={'white'} />

          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.url }} resizeMode={'cover'} style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }} />
        {this.props.deviceStatus.devicePortrait ? <PortraitPageInfo index={index + 1} total={this.props.images.length} /> : <LandscapePageInfo index={index + 1} total={this.props.images.length} />}
      </View>
    );
  }

  render() {
    return (<SafeAreaView style={styles.body}>{this.props.deviceStatus.devicePortrait ?

      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.props.images}
        renderItem={this._renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        layout={'tinder'} layoutCardOffset={`9`}
        slideStyle={{ width: Dimensions.get('screen').width }}
        onSnapToItem={index => this.setState({ activeIndex: index })}
      /> :
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.props.images}
        renderItem={this._renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}

        layout={'tinder'} layoutCardOffset={`9`}
        slideStyle={{ width: Dimensions.get('screen').width }}
        onSnapToItem={index => this.setState({ activeIndex: index })}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}

      />}
    </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  closeDiv: {
    position: 'absolute',
    top: 60,
    left: 10,
    zIndex: 9999
  },
  closeBtn: {
    margin: 0,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: '#ffffff'
  },
})
function mapStateToProps(state) {
  return {
    stateOfAuth: state.auth,
    stateOfHome: state.userData,
    deviceStatus: state.deviceStatus

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getRestroData },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel);