import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Icon} from 'react-native-elements';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const login = async () => {
    try {
      const loginUrl = `http://15.184.22.192/backoffice/backend/web/index.php/v1/users/user-login-password`;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      let bodyFormData = new FormData();

      bodyFormData.append(
        'json',
        JSON.stringify([
          {
            userPassword: password,
            userMobile: mobileNumber,
            languageID: '1',
            userDeviceID: 'token',
            apiType: 'Android',
            apiVersion: '1.0',
          },
        ]),
      );

      const response = await axios.post(loginUrl, bodyFormData, headers);
      console.log('response', JSON.stringify(response.data));
      if(response.data){
        alert('Succesfully Logged In');
        navigation.navigate('DashBoard');
      }
     
    } catch (error) {
     alert('error', error);
    }
    
    
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                onChangeText={(text)=>setPassword(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                onChangeText={(text)=>setMobileNumber(text)}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={login}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.registerText}>
                Don't have an account? Register Now
              </Text>
            </TouchableOpacity>
        
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});
