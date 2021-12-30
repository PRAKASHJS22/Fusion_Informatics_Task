import React, {useState,useEffect} from 'react';
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
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {Icon} from 'react-native-elements';
import axios from 'axios';

const RegisterScreen = ({navigation}) => {

const[firstname,setFirstName]=useState('')
const[lastname,setLastName]=useState('')
const[email,setEmail]=useState('')
const[mobileNumber,setMobileNumber]=useState('')
const[password,setPassword]=useState('')


  const register = async () => {
    try {
      const registerUrl = `http://15.184.22.192/backoffice/backend/web/index.php/v1/users/user-registration`;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      let bodyFormData = new FormData();

      bodyFormData.append(
        'json',
        JSON.stringify([
          {
            languageID: '1',
            userFirstName: firstname,
            userLastName: lastname,
            userEmail: email,
            userMobile: mobileNumber,
            userPassword: password,
            userProfilePicture: '',
            userSignedReferKey: '',
            userDeviceType: 'Android',
            userDeviceID: 'xyz',
            apiType: 'Android',
            apiVersion: '1.0',
          },
        ]),
      );

      const response = await axios.post(registerUrl, bodyFormData, headers);
      console.log('response', JSON.stringify(response.data));
    } catch (error) {
      console.log('error', error);
    }
    alert("Succesfully Registered")
    navigation.navigate('LoginScreen')
  };
  
  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     {/* <KeyboardAvoidingView behavior={"position"} > */}
  <ScrollView>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>       
          <View style={styles.authBox}>
            <Text style={styles.loginTitleText}>Register</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                onChangeText={(text)=>setFirstName(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}

                onChangeText={(text)=>setLastName(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                keyboardType="email-address"
                onChangeText={(text)=>setEmail(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
              maxLength={10}
              onChangeText={(text)=>setMobileNumber(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={(text)=>setPassword(text)}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={register}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.registerText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
     
      {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </TouchableWithoutFeedback>

   
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  centerizedView: {
    width: '100%',
    top: '3%',
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
