import {
    check,
    checkMultiple,
    requestMultiple,
    PERMISSIONS,
    RESULTS,
} from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';

import GetLocation from 'react-native-get-location'

export const findLocaton = () => {
    return new Promise(async (resolve, reject) => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                resolve(location);
            })
            .catch(error => {
                const { code, message } = error;

                console.warn(code, message);
                resolve(false);
            })
    });
}
export const distance = (lat1, lat2, lon1, lon2) => {

    // Distance code   

    // let lat1 = 53.32055555555556;
    // let lat2 = 53.31861111111111;
    // let lon1 = -1.7297222222222221;
    // let lon2 = -1.6997222222222223;
    // distance(lat1, lat2,
    //           lon1, lon2) + " K.M");
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return (c * r);
};





export const CheckLocationPermission = async () => {
    if (Platform.OS === 'android') {
        await checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
            .then(async (result) => {
                if (result[`android.permission.ACCESS_FINE_LOCATION`] == PermissionsAndroid.RESULTS.GRANTED && result[`android.permission.WRITE_EXTERNAL_STORAGE`] == PermissionsAndroid.RESULTS.GRANTED) {

                    return true;
                } else {
                    await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(res1 => {
                        if (result[`android.permission.ACCESS_FINE_LOCATION`] == PermissionsAndroid.RESULTS.GRANTED &&
                            result[`android.permission.WRITE_EXTERNAL_STORAGE`] == PermissionsAndroid.RESULTS.GRANTED) {

                            return true;
                        } else {
                            return false;
                        }
                    })
                }

            })
            .catch((error) => {
                return false;
                // …
            });
    }

};
