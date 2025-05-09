// navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Common/LoginScreen';
import SetupAccountScreen from '../screens/Common/SetupAccountScreen';
import CreateCredentialsScreen from '../screens/Common/CreateCredentialsScreen';
import AdminNavigator from './AdminNavigator';
// ✅ This creates the Stack navigator instance
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SetupAccount" component={SetupAccountScreen} />
      <Stack.Screen name="CreateCredentials" component={CreateCredentialsScreen} />
      <Stack.Screen name="AdminNavigator" component={AdminNavigator} /> 
    </Stack.Navigator>
  );
}
