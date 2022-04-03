import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { login, signUpError, varifiedGotoDashboard } from '../../store/actions/auth';
import { bindActionCreators } from 'redux';
import IconUssed from 'react-native-vector-icons/Entypo';
import SplashScreen from 'react-native-splash-screen';
import React, { Component } from 'react';
import { Input, Avatar } from 'react-native-elements';
import { ms, s, vs } from '../../scalling';
import CommonColor from '../../CommonColor';
import FontNameTxt from '../../CommonFonts';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import LoaderComponent from '../../LoaderComponent';

const { width, height } = Dimensions.get('screen');
const WIDTH80 = width * (80 / 100);

const CustLabel = (text) => (
  <View style={{ flexDirection: 'row' }}>
    <Text
      style={{
        color: CommonColor.PrimaryColorShade,
        fontFamily: 'Roboto-Medium',
        fontSize: ms(14),
      }}>
      {text}
    </Text>
  </View>
);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 'one',
      email: '',
      txtEmail: false,
      txtPassword: false,
      password: '',
      showPasswordError: false,
      showPassword: false,
      loader: false,
      error: null,
      showError: false,
      showEmailError: false,
      passVarified: false,
      emailVarified: false,
      createAccClicked: false,
      eyePressed: false,
      callChangeUI: false
    };
    SplashScreen.hide();
  }
  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {


    if (prevProps !== this.props) {
      console.log(
        'the data is LOGIN ERROR ---',
        this.props.stateOfAuth.signUpErrorRes,
      );
      // console.log("the data is LOGIN OTHER ---",this.props.stateOfAuth.screen);
      if (this.state.loader)
        if (this.props.stateOfAuth.signUpErrorRes) {
          this.props.signUpError();
          this.setState({
            loader: false,
            error: this.props.stateOfAuth.signUpErrorRes,
          });
        } else {
          this.props.varifiedGotoDashboard();
        }
      if (prevProps.deviceStatus !== this.props.deviceStatus) {
        this.setState({ callChangeUI: !this.state.callChangeUI });
      }
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.navigate('InitialScreen');
    //this.props.navigation.popToTop();
    return true;
  };


  callApi = async () => {
    this.props.login(this.state.email, this.state.password);

  };

  checkPassword = (str) => {
    if (
      str.match(/[a-z]/g) &&
      str.match(/[A-Z]/g) &&
      str.match(/[0-9]/g) &&
      str.match(/[^a-zA-Z\d]/g) &&
      str.length >= 9
    ) {
      this.setState({
        showPasswordError: null,
        showError: false,
        passVarified: true,
      });

      return;
    } else {
      this.setState({
        showPasswordError: `password must contain 1 uppercase, 1 lowercase, 1 special character, 1 digit and atleast 9 characters !`,
      });
      return;
    }
  };
  checkEmail = (text) => {
    if (this.validate(text)) {
      this.setState({ showEmailError: null, emailVarified: true });
    } else {
      this.setState({
        showEmailError: `Please enter valid email-id !`,
      });
    }
  };

  validate = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  render() {

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={CommonColor.PrimaryColor}
          barStyle="dark-content"
        />
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        <View style={this.props.deviceStatus.devicePortrait ? styles.nothing : styles.spaceBetween}>
          <View style={{ width: this.props.deviceStatus.devicePortrait ? (Dimensions.get('window').width) * (80 / 100) : ((Dimensions.get('window').width) * (80 / 100)) / 2 }}>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="Please enter your email-id"
                onChangeText={(text) => { this.setState({ email: text }); this.checkEmail(text) }}
                value={this.state.email}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            {this.state.showEmailError || (!this.state.emailVarified && this.state.createAccClicked) ? <View><Text style={{
              color: CommonColor.Red
            }}>{this.state.showEmailError ? this.state.showEmailError : 'Please enter valid email-id !'}</Text></View> : null}
          </View>
          <View style={{ width: this.props.deviceStatus.devicePortrait ? (Dimensions.get('window').width) * (80 / 100) : ((Dimensions.get('window').width) * (80 / 100)) / 2 }}>
            <View style={[styles.InputContainer, { marginLeft: this.props.deviceStatus.devicePortrait ? 0 : 14 }]}>
              <TextInput
                style={styles.body}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(text) => { this.setState({ password: text }); this.checkPassword(text); }}
                value={this.state.password}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            {this.state.showPasswordError || (!this.state.passVarified && this.state.createAccClicked) ? <View><Text style={{
              color: CommonColor.Red
            }}>{this.state.showPasswordError ? this.state.showPasswordError : `password must contain 1 uppercase, 1 lowercase, 1 special character, 1 digit and atleast 9 characters !`}</Text></View> : null}
          </View>
        </View>
        {this.state.error && this.state.createAccClicked ? <View style={{ paddingVertical: 15 }}><Text style={{
          color: CommonColor.Red
        }}>{this.state.error}</Text></View> : null}
        {!this.state.loader ? <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => {
            this.setState({ createAccClicked: true });
            if (this.state.emailVarified && this.state.passVarified) {
              this.setState({ loader: true });
              this.callApi();
            }
          }}>
          Log in
        </Button> : <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
        >
          <ActivityIndicator color={CommonColor.White} size={vs(20)} />
        </Button>}

      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  or: {
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  nothing: {
    flexDirection: 'column',

  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: '100%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },

});

export const ScreenOptions = (navData) => {
  return {
    title: null,
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
    headerLeft: () => null,
    headerRight: () => null
  };
};

function mapStateToProps(state) {
  return {
    stateOfAuth: state.auth,
    deviceStatus: state.deviceStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, signUpError, varifiedGotoDashboard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
