import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

const Map = props => {
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);

  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);

  const userLocation = async () => {
    // navigator.geolocation.getCurrentPosition(pos=>{
    //   alert(JSON.stringify(pos))
    // })
    setLoading(true);
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setLoading(false);
        console.log(location);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        console.log(Latitude, Longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const currentAddress = async (Latitude, Longitude) => {
    setLoading(true);

    Geocoder.init('AIzaSyAPBC1c0caifG0oOZukRGzhkcMwWLECkRA', {language: 'en'});

    await Geocoder.from(Latitude, Longitude)
      .then(json => {
        setLoading(false);
        let addressComponent = json.results[0].formatted_address;
        alert(JSON.stringify(addressComponent));
        console.log('current address', JSON.stringify(addressComponent));
        setAddress(JSON.stringify(addressComponent));
      })
      .catch(error => console.log(error));
  };

  const address_field = async () => {
    try {
      setLoading(true);
      const userAddressUrl = `http://15.184.22.192/backoffice/backend/web/index.php/v1/useraddress/add-address`;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      let bodyFormData = new FormData();

      bodyFormData.append(
        'json',
        JSON.stringify([
          {
            languageID: 1,
            loginuserID: 1,
            addressTitle: '',
            addressAddressLine1: address.slice(1, 10),
            addressAddressLine2: address.slice(2),
            cityID: 3,
            stateID: 2,
            countryID: 1,
            areaID: 4,
            addressLandmark: '',
            addressType: 'Other',
            addressIsDefault: 'No',
            addressLatitude: Latitude,
            addressLogitude: Longitude,
            apiType: 'Android',
            apiVersion: 1.0,
          },
        ]),
      );

      const response = await axios.post(userAddressUrl, bodyFormData, headers);
      console.log('response', JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  useEffect(() => {
    userLocation();
    currentAddress(Latitude, Longitude);
    address_field();
  }, [Latitude, Longitude]);

  return (
    <View style={styles.body}>
      {loading ? (
        <ActivityIndicator
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
          size={30}
          color={'blue'}
        />
      ) : null}
      {Latitude != 0 && Longitude != 0 ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: Latitude,
            longitude: Longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard">
          <Marker
            coordinate={{
              latitude: Latitude,
              longitude: Longitude,
            }}
            title="Prakash"
            description="Is here"
            // image={require('../../assests/imagemarker.png')}
          >
            <MaterialCommunityIcons
              name={'google-maps'}
              color={'red'}
              size={75}
            />
          </Marker>
        </MapView>
      ) : null}
      {address !== undefined ? (
        <View style={{flex: 0.1}}>
          <Text
            onPress={() =>
              props.navigation.push('ListView', {
                address,
              })
            }>
            {address}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
export default Map;
