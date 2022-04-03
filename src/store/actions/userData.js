import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiEndpoint from './api';
import {GET_RESTRO_DATA,GET_RESTRO_DONE,GET_RESTRO_DATA_FALIURE,
  LAT_LONG,
  NO_LOCATION} from './actionTypes';

// flag =true call api   , id = true send countryName


export const getRestroData = (data = false) => {
  return async (dispatch) => {
    console.log("called getRestroData")
    if(data){

    
    await axios
      .get(`http://205.134.254.135/~mobile/interview/public/api/restaurants_list`)
      .then( (payload) => {
        console.log(
          'LOGIN CATCH -------result LOGIN---------IF',
          payload.data.status,
        );
        if (payload.data.status == 1) {
      dispatch({
        type: GET_RESTRO_DATA,
        restroData: payload.data.data,
        restroDataStatus: true,
        restroDataSuccess:true
      });
    
  } else {
    return (dispatch) => {
      dispatch({
        type: GET_RESTRO_DATA_FALIURE,
        restroDataFailure:  true,
      });
    };
  }
}).catch(err=>{
  console.log("error in main api",err)
  dispatch({
    type: GET_RESTRO_DATA_FALIURE,
    restroDataFailure:  true,
  });
});
    }else{
      dispatch({
        type: GET_RESTRO_DONE,
        restroDataStatus: false,});
    }
  }

};


export const setLatLong = (data = false) => {
  return async (dispatch) => {
    console.log("called getRestroData")
    if(data){
      dispatch({
        type: LAT_LONG,
        latLong: data,
        latLongStatus:true
      });
    }else{
      dispatch({
        type: NO_LOCATION,
        latLong: data,
        latLongStatus:true
      });
    }
    }
  }
