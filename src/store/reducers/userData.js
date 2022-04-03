import {
  GET_RESTRO_DATA_FALIURE,
  GET_RESTRO_DATA,
  GET_RESTRO_DONE,
  LAT_LONG,
NO_LOCATION
} from '../actions/actionTypes';

const initialState = {
  restroData: false,
  restroDataStatus: false,
  restroDataSuccess:false,
restroDataFailure:false,
latLong:false,
latLongStatus:false
};

export default (state = initialState, action) => {
  switch (action.type) {
  
    case GET_RESTRO_DATA:
      console.log("the reducer",action.restroData)
      return {
        ...state,
        restroData: action.restroData,
        restroDataStatus: true,
        restroDataSuccess: true,

      };

    case GET_RESTRO_DATA_FALIURE:
      return {
        ...state,
        restroDataFailure: false,
      };
    case GET_RESTRO_DONE:
      return{
        ...state,
        restroDataStatus:false
      } 
      case LAT_LONG:
        return{
          ...state,
          latLong:action.latLong,
          latLongStatus:action.latLongStatus
        }  
          case NO_LOCATION:
        return{
          ...state,
          latLongStatus:action.latLongStatus

        }   

    default:
      return state;
  }
};
