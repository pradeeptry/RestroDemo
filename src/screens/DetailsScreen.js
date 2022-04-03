import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRestroData } from '../store/actions';
import { bindActionCreators } from 'redux';
import {
  View, Text, FlatList,
  StyleSheet, ActivityIndicator, Image, StatusBar, SafeAreaView, Dimensions, TouchableOpacity
} from "react-native";
import { ListItem, Avatar, Card } from "react-native-elements";
import Spinner from 'react-native-spinkit';
import { ms, vs } from '../scalling';
import { Header, AirbnbRating } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import IconLocation from 'react-native-vector-icons/SimpleLineIcons';
import MyCarousel from './HelperFunction/FullScreenCorosal';
import { distance } from './HelperFunction/CalculateDistance';
import CommonColor from '../CommonColor';
import { AppStyles } from '../AppStyles';
import Button from 'react-native-button';
import WatchIcon from 'react-native-vector-icons/MaterialIcons';
import HeaderComp from '../Component/HeaderComp';
import { Title } from 'react-native-paper';
import { Container, Content } from 'native-base';
const { width, height } = Dimensions.get('screen');
const WIDTH80 = width * (80 / 100);

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restro: this.props.route.params.restro,
      lat: false,
      long: false,
      distanceFromHotel: 0,
      startSlideShow: false
    }
  }
  stopSlider = () => {
    this.setState({ startSlideShow: false });
    return true;
  }
  componentDidMount() {
    if (this.props.stateOfHome.latLongStatus) {
      let distanceFromHotel = distance(this.props.stateOfHome.latLong.latitude, this.state.restro.latitude, this.props.stateOfHome.latLong.longitude, this.state.restro.longitude)
      this.setState({ lat: this.props.stateOfHome.latLong.latitude, long: this.props.stateOfHome.latLong.longitude, distanceFromHotel: distanceFromHotel.toFixed(2) })
    }
  }

  render() {
    return (
      <>
        {!this.state.startSlideShow ?
          <SafeAreaView style={styles.container}>

            <HeaderComp title={'Deatils'} navigation={this.props.navigation} />

            <View style={{ flex: 1 }}>
              <Container>
                <Content>
                  <TouchableOpacity onPress={() => { this.setState({ startSlideShow: true }) }}>
                    <View style={this.props.deviceStatus.devicePortrait ? { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height } : { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                      <Image source={{ uri: this.state.restro.images[0].url }} resizeMode={'cover'} style={{ width: '100%', height: '100%' }} />
                    </View>
                  </TouchableOpacity>
                  <View style={{ flex: 1, marginBottom: 80 }}>
                    <View style={{ justifyContent: 'flex-start' }}>
                      <View style={styles.titleContainer}>
                        <Title>
                          {this.state.restro.title}
                        </Title>
                      </View>
                      <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ color: CommonColor.GraySpecific }}>
                          {this.state.restro.address}
                        </Text>
                      </View>
                      <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <View style={{ alignItems: 'center' }}>
                            <View>
                              <Text><WatchIcon name={'watch-later'} size={22} color={'#F0E68C'} /></Text>
                            </View>
                            <View>
                              <Text style={{ color: CommonColor.GraySpecific }}>{`10AM - 8PM`}</Text>
                            </View>

                          </View>
                          <View style={{ alignItems: 'center' }}>
                            <View>
                              <Text>
                                <IconLocation name={'location-pin'} color={'#F0E68C'} size={22} />

                              </Text>
                            </View>
                            <View>{this.state.lat && this.state.long ?
                              <Text style={{ color: CommonColor.GraySpecific }}>{this.state.distanceFromHotel + " K.M"}</Text> :
                              <Text><ActivityIndicator size={16} color={CommonColor.GraySpecific} /></Text>}
                            </View>

                          </View>
                          <View style={{ alignItems: 'center' }}>
                            <View>
                              <Text><WatchIcon name={'delivery-dining'} size={22} color={AppStyles.color.tint} /></Text>
                            </View>
                            <View>
                              <Text style={{ color: CommonColor.GraySpecific }}>{`DELIVERY`}</Text>
                            </View>

                          </View>
                        </View>
                      </View>
                      <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ color: CommonColor.GraySpecific }}>
                          {this.state.restro.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Content>
              </Container>
            </View>

            <View style={{ bottom: 0, position: 'absolute', width: '100%' }}>
              <Button
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={() => {

                }}>
                Call
              </Button>
            </View>

          </SafeAreaView> :
          <MyCarousel images={this.state.restro.images} stopSlider={this.stopSlider} />}
      </>
    )
  }
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
  },
  loginContainer: {
    width: '100%',
    backgroundColor: CommonColor.PrimaryColor,
    // borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: "bold"
  }
});
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
