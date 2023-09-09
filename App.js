import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import AboutScreen from './screens/aboutScreen';
import AvailAbleNotesScreen from './screens/availablenotesScreen';
import BooksScreen from './screens/booksScreen';
import DepartmentsScreen from './screens/departmentsScreen';
import NotificationScreen from './screens/notificationScreen';
import Unipedia from './screens/uniPediaScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#CB61C5',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen
        name="Unipedia"
        component={Unipedia}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="university" size={24} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: '#CB61C5',
          headerTitle: () => null,
        }}
      />
      <Tab.Screen
        name="Books"
        component={BooksScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Entypo name="open-book" size={24} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: '#CB61C5',
          headerTitle: () => null,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="notifications" size={24} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: '#CB61C5',
          headerTitle: () => null,
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="information-circle" size={24} color={color} />;
          },
          tabBarActiveTintColor: '#CB61C5',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  const [fontsLoaded] = useFonts({
    RB: require('./assets/fonts/Roboto-Bold.ttf'),
    RM: require('./assets/fonts/Roboto-Medium.ttf'),
    RR: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  return fontsLoaded ? (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'RB',
          },
        }}>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
            headerTitleStyle: {
              fontFamily: 'RR',
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="Departments"
          component={DepartmentsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AvailAbleNotes"
          component={AvailAbleNotesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
