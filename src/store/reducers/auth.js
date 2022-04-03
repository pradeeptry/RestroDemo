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
GO_T0_LOGGED_DASHBOARD,
CHANGE_INITIAL_SCREEN,
BYPASS
} from '../actions/actionTypes';

const initialState = {
  email: null,
  initialRouteName: null,
  userId: null,
  loggedIN: false,
  didTryAutoLogin: false,
  goToDashboard: false,
  password:false
};

export default (state = initialState, action) => {
  switch (action.type) {
  
    case AUTHENTICATE:
      return {
        ...state,
        email: action.email,
        token: false,
        signUpSuccess: true,
        isVarifiedUser: action.isVarifiedUser,
      };
    case CHANGE_INITIAL_SCREEN:
      return {
        ...state,
        status: action.status,
        screen: action.screen,
      };

    case SET_DID_TRY_AL:
      if (action.initialRouteName) {
        return {
          ...state,
          initialRouteName: action.initialRouteName,
          isVarifiedUser: action.isVarifiedUser,
          didTryAutoLogin: true,
        };
      } else {
        return {
          ...initialState,
          initialRouteName: false,
          didTryAutoLogin: true,
        };
      }
    case REDIRECT_TO_LOGIN:
      return {
        ...state,
        initialPinError: action.initialPinError,
        signUpErrorRes: false,
        screen: action.screen,
        statusForLogin: action.statusForLogin,
        didTryAutoLogin: true,
      };

    case GO_T0_LOGGED_DASHBOARD:
      return {
        ...state,
        goToDashboard: true,
        didTryAutoLogin: true,
      };
   case LOGGED_IN:
      return {
        ...state,
        screen: action.screen,
        signUpErrorRes: false,
        loggedIN: action.loggedIN,
        password: action.password,
        email: action.email,
        initialRouteName: action.initialRouteName,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        initialState,
        didTryAutoLogin: false,
        token: false,
      };
    case LOGOUT_LOADER:
      return {
        ...state,
        logoutLoader: true,
      };

   
    case SIGNUP_ERROR:
      return {
        ...state,
        signUpErrorRes: action.response ? action.response : false,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
