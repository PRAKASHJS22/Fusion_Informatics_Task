import React,{useEffect} from 'react';
import {Text, View,LogBox} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import AuthStackScreen from './src/navigation/AuthStack';

const App = () => {
useEffect(() => {
 LogBox.ignoreAllLogs();
}, [])

  return (
  <NavigationContainer>
    <AuthStackScreen/>
  </NavigationContainer>
      

    
  );
};

export default App;
