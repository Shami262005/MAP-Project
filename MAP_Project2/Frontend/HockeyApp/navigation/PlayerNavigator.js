import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnnouncementScreen from '../screens/Player/AnnouncementScreen';
import AnnouncementDetails from '../screens/Player/AnnouncementsDetails';
import TeamScreen from '../screens/Player/TeamScreen';
import Events from '../screens/Player/Events'; 
import EventDetailsScreen from '../screens/TeamManager/EventDetailsScreen';

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
       <Stack.Screen name="AnnouncementDetails" component={AnnouncementDetails} />
      <Stack.Screen name="Team" component={TeamScreen} />
      <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}
