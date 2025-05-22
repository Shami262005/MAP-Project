import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboard from '../screens/Admin/Dashboard';
import TeamsScreen from '../screens/Admin/ManageTeams';
import TeamDetailsScreen from '../screens/Admin/TeamDetailsScreen';
import RegisterTeamScreen from '../screens/Admin/RegisterTeam';
import EventsScreen from '../screens/Admin/ManageEvents';
import RegisterEventScreen from '../screens/Admin/RegisterEvent';
import EventDetailsScreen from '../screens/Admin/EventDetails';
import AnnouncementsScreen from '../screens/Admin/ManageAnnouncments';
import AddAnnouncementScreen from '../screens/Admin/AddAnnouncement';
import AnnouncementDetailsScreen from '../screens/Admin/AnnouncementDetails';
import SettingsScreen  from '../screens/Admin/Settings';
import Profile   from '../screens/Admin/ProfileScreen';
import UserManagement   from '../screens/Admin/UserManagement';
const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="Teams" component={TeamsScreen} />
      <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} />
      <Stack.Screen name="RegisterTeam" component={RegisterTeamScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="RegisterEvent" component={RegisterEventScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AddAnnouncement" component={AddAnnouncementScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AnnouncementDetails" component={AnnouncementDetailsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UserManagement" component={UserManagement} />
    </Stack.Navigator>
  );
}


<Stack.Screen name="Teams" component={TeamsScreen} />
