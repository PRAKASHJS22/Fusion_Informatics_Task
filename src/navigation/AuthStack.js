import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Login';
import RegisterScreen from '../Register';
import DashboardScreen from '../Dashboard';
import Map from '../Dashboard/MapView';
import ListView from '../Dashboard/ListView';

const AuthStack = createNativeStackNavigator();


const AuthStackScreen = () => (
    <AuthStack.Navigator> 
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="DashBoard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ListView"
        component={ListView}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
  
  export default AuthStackScreen;

 