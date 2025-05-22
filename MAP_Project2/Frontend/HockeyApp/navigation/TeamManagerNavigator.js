import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Announcement from '../screens/TeamManager/Announcement';
import AnnouncementDetails from '../screens/TeamManager/AnnouncementDetails';
import Team from '../screens/TeamManager/Team';
import AddPlayer from '../screens/TeamManager/AddPlayer';
import RemovePlayer from '../screens/TeamManager/RemovePlayer';
import EventsScreen from '../screens/TeamManager/EventsScreen';
import EventDetailsScreen from '../screens/TeamManager/EventDetailsScreen';
const Stack = createNativeStackNavigator();

export default function TeamPlayerNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Announcement"
      screenOptions={{
        headerShown: false, // all custom headers & back arrows are handled in screens
      }}
    >
      <Stack.Screen name="Announcement" component={Announcement} />
      <Stack.Screen name="AnnouncementDetails" component={AnnouncementDetails} />
      <Stack.Screen name="Team" component={Team} />
      <Stack.Screen name="AddPlayer" component={AddPlayer} />
      <Stack.Screen name="RemovePlayer" component={RemovePlayer} />
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}
