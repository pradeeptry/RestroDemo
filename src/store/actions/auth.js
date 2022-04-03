import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiEndpoint from './api';
import{
  LOGIN,
AUTHENTICATE,
LOGOUT,
LOGOUT_LOADER,
SIGNUP_ERROR,
SIGNUP,
SET_DID_TRY_AL,
LOGGED_IN,
REDIRECT_TO_LOGIN,
CHANGE_INITIAL_SCREEN,
GO_T0_LOGGED_DASHBOARD,
BYPASS
} from './actionTypes';


export const setDidTryAL = (initialRouteName = null, isVarifiedUser = null) => {
  if (initialRouteName) {
    return {
      type: SET_DID_TRY_AL,
      initialRouteName: initialRouteName,
      isVarifiedUser: isVarifiedUser,
    };
  } else {
    return {type: SET_DID_TRY_AL};
  }
};

export const authenticate = (email, token, isVarifiedUser) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      email,
      token: token,
      isVarifiedUser: isVarifiedUser,
    });
  };
};
export const authenticateTo = (email, initialRouteName) => {
 console.log("the data is in  authenticateTo", email,
 initialRouteName,)
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE_TO_EMAIL,
      email:email,
      initialRouteName:initialRouteName,
    });
  };
};



export const varifiedGotoDashboard = () => {
  return (dispatch) => {
    dispatch({
      type: GO_T0_LOGGED_DASHBOARD,
    });
  };
};
export const redirectToLogin = (status=false) => {
  return async (dispatch) => {
// await AsyncStorage.clear();
    dispatch({
      type: REDIRECT_TO_LOGIN,
      statusForLogin: true,
      screen: 'Login',
      initialPinError: false,
    });
  };
};

export const changeInitialScreen = (initialRouteName) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_INITIAL_SCREEN,
      status: 3033,
      screen: initialRouteName,
    });
  };
};


export const isLoggedIn = (userData, check = null) => {

  return (dispatch) => {
    dispatch({
      type: LOGGED_IN,
      loggedIN: true,
      screen: userData.initialRouteName
        ? userData.initialRouteName
        : `MainScreen`,
      initialRouteName: userData.initialRouteName
        ? userData.initialRouteName
        : `MainScreen`,
      email: userData.email,
      password: userData.password,
    });
  };
};


export const resendEmailApiError = () => {
  return (dispatch) => {
    dispatch({
      type: RESEND_EMAIL_API_ERROR,
      status: 1011,
      message: 'PLEASE CHECK YOUR INTERNET CONNECTION!',
    });
  };
};

// CHECK AUTH CONDITION

export const login = (email, password) => {
  let sendBody = {email, password};
  return async (dispatch) => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts/1`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async (payload) => {
        console.log(
          'LOGIN CATCH -------result LOGIN---------IF',
          payload.data,
        );
        if (payload.status == 200) {
           
            if(email =='pradeep11som@gmail.com'&& password=='Pradeep@123'){
              let userDataTempNew = {};
              userDataTempNew.email = email;
              userDataTempNew.loggedIN = true;
              userDataTempNew.password = password;
              // userDataTempNew.pinCurrent = payload.data.pin;
              // userDataTempNew.pinOld = payload.data.pin;
              userDataTempNew.isVarifiedUser = true;
              userDataTempNew.initialRouteName = 'MainScreen';
              await AsyncStorage.setItem(
                '@AUTH_STATUS',
                JSON.stringify(userDataTempNew),
              );
              dispatch(isLoggedIn(userDataTempNew,true));
            
          

          
        } else {
            console.log(
              'LOGIN CATCH -------result LOGIN---------LAST ELSE',
              payload,
            );

            const errorResData = 'In-valid email-id or password!';
            dispatch(signUpError(errorResData));
          }
        }
      })
      .catch((error) => {
        console.log('LOGIN CATCH -------RED', error);
        dispatch(signUpError('Server Error! Please retry after some time.'));
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    dispatch({type: LOGOUT, logoutLoader: false, didTryAutoLogin: false});
  };
};

export const signUpError = (res = false) => {
  return (dispatch) => {
    dispatch({type: SIGNUP_ERROR, response: res});
  };
};

export const callScreenLoader = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_LOADER,
      logoutLoader: true,
    });
  };
};

const saveDataToStorage = (
  token,
  loggedIN = false,
  initialRouteName,
  isVarifiedUser = false,
) => {
  AsyncStorage.setItem(
    '@AUTH_STATUS',
    JSON.stringify({
      token: token,
      loggedIN: loggedIN,
      initialRouteName: initialRouteName,
      isVarifiedUser: isVarifiedUser,
    }),
  );
};

const saveDataToStorageForToken = (
  email,
  token,
  initialRouteName,
  isVarifiedUser,
) => {
  AsyncStorage.setItem(
    '@AUTH_STATUS_CHECK',
    JSON.stringify({
      email,
      token,
      initialRouteName: initialRouteName,
      isVarifiedUser: isVarifiedUser,
    }),
  );
};
