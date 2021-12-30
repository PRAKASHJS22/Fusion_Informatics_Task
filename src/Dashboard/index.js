import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';

const DashboardScreen = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={()=>props.navigation.navigate('Map')}>
        <Text style={styles.loginButtonText}>MapView</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={()=>props.navigation.navigate('ListView')}>
        <Text style={styles.loginButtonText}> List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  loginButton: {
    width:"30%",
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
})