import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnnouncementScreen from '../screens/Player/AnnouncementScreen';
import TeamScreen from '../screens/Player/TeamScreen';
import Events from '../screens/Player/Events'; 

const Stack = createNativeStackNavigator();

export default function PlayerNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AnnouncementScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
      <Stack.Screen name="Team" component={TeamScreen} />
      <Stack.Screen name="Events" component={Events} />
    </Stack.Navigator>
  );
}
