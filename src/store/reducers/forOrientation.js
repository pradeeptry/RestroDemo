import {
    ORIENTATION
  } from '../actions/actionTypes';
  
  const initialState = {
    deviceOrientation:'PORTRAIT',
    devicePortrait:true
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
    
      case ORIENTATION:
        console.log("the orientation is",action.deviceOrientation)
        return {
          ...state,
          deviceOrientation: action.deviceOrientation,
          devicePortrait:action.deviceOrientation=='PORTRAIT'?true:false
        };
      default:
        return state;
    }
  };