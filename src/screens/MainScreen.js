import React, { Component } from 'react';
import {
  View, Text, FlatList,
  StyleSheet, ActivityIndicator, Image, SafeAreaView, Dimensions, TouchableOpacity
} from "react-native";
import CommonColor from '../CommonColor';
import { ms, vs } from '../scalling';
import { connect } from 'react-redux';
import { getRestroData, setLatLong } from '../store/actions';
import { bindActionCreators } from 'redux';
import { Card } from "react-native-elements";
import { AirbnbRating } from '@rneui/themed';
import IconLocation from 'react-native-vector-icons/SimpleLineIcons';
import HeaderComp from '../Component/HeaderComp';
import LoadingCenter from '../Component/LoadingCenter';
import { findLocaton } from './HelperFunction/CalculateDistance';
const { width, height } = Dimensions.get('screen');
const WIDTH80 = width * (80 / 100);
class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: null,
      refreshing: false,
      callChangeUI: false,
      statusLandscape: 1

    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      minimumViewTime: 300,
      viewAreaCoveragePercentThreshold: 95
    }

  }

  componentDidMount() {
    this.checkPermission();
  }
  checkPermission = async () => {
    try {
      let flag = await findLocaton();
      console.log("the data is ", flag)
      if (flag) {
        this.props.getRestroData(true);
        this.props.setLatLong(flag);
      }
    } catch (error) {
      this.props.getRestroData(true);
      this.props.setLatLong(false);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stateOfHome !== this.props.stateOfHome) {
      if (this.state.loading) {
        if (this.props.stateOfHome.restroDataFailure) {
          this.setState({ showError: true });
        } else if (this.props.stateOfHome.restroDataSuccess) {
          this.props.getRestroData();// for resetting flag
          const restroData = this.props.stateOfHome.restroData;
          if (this.state.data.length == 0) {
            this.setState({ loading: false, data: [...restroData] })
          } else {
            let data = this.state.data;
            data.concat(restroData);
            this.setState({ loading: false, data: [...data] })
          }
        }
      }
    } if (prevProps.deviceStatus !== this.props.deviceStatus) {
      this.setState({ callChangeUI: !this.state.callChangeUI, statusLandscape: this.state.statusLandscape + 1 });
    }
  }



  // handleRefresh = () => {
  //   this.setState(
  //     {
  //       refreshing: true
  //     },
  //     () => {
  //       this.makeRemoteRequest();
  //     }
  //   );
  // };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };


  renderItemPortrait = ({ item }) => {
    return (
      <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <Card wrapperStyle={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
          containerStyle={{
            borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, borderRadius: 4, shadowColor: '#080808', marginBottom: 0,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 4,
          }}>
          <View style={{ marginHorizontal: 10, marginVertical: 5, borderRadius: 5, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.push('DetailsScreen', { restro: item }) }}>
              <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ height: 65, width: 65, borderRadius: 10 }}>
                    <Image resizeMode={'cover'} source={{ uri: item.images[0].url }} style={{ height: '100%', width: '100%', borderRadius: 10 }} />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', paddingLeft: 10, justifyContent: 'space-between', alignContent: 'center' }}>
                    {this.props.deviceStatus.devicePortrait ?
                      <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'flex-start', }}><Text style={{ fontSize: ms(14) }}>{item.title}</Text></View>
                        <View><AirbnbRating reviewSize={0} showRating={false} count={item.rating}
                          size={14} /></View>
                      </View> : <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View><Text style={{ fontSize: ms(18) }}>{item.title}</Text></View>
                        <View style={{ marginRight: 20 }}><AirbnbRating count={item.rating}
                          size={10} /></View>
                      </View>}
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                      <View
                        style={{ paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: CommonColor.PrimaryColor }}>
                        <Text>
                          <IconLocation name={'location-pin'} color={'#FFF'} size={28} />
                        </Text>
                      </View>
                    </View>

                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    )
  }



  render() {
    return (

      <SafeAreaView style={styles.container}>
        <HeaderComp title={'Restaurant List'} navigation={this.props.navigation} />
        {this.state.loading ?
          <LoadingCenter /> : this.state.showError ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: CommonColor.Red }}>{this.state.showError}</Text>
              </View>
            </View>) :
            (<FlatList
              data={this.state.data}
              renderItem={this.renderItemPortrait}
              viewabilityConfig={this.viewabilityConfig}
              ListFooterComponent={this.renderFooter}
              extraData={this.state.statusLandscape}
            // onRefresh={this.handleRefresh}
            // refreshing={this.state.refreshing}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={50}
            />)}
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColor.White
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColor.PrimaryColor,
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
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
function mapStateToProps(state) {
  return {
    stateOfAuth: state.auth,
    stateOfHome: state.userData,
    deviceStatus: state.deviceStatus

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getRestroData, setLatLong },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
