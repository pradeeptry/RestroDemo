
import{
    ORIENTATION,
  
  } from './actionTypes';
  
  
  export const setOrientation = (orientation) => {
      return dispatch=>{ dispatch({
        type: ORIENTATION,
        deviceOrientation: orientation,
      })
    };
   
  };