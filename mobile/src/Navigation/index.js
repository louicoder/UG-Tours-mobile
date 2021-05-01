import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Header from '../Components/Header';
import {
  Home,
  Login,
  Account,
  Search,
  InfoTab,
  Doctors,
  Suggestions,
  CreateBlog,
  MyaPlus,
  Blog,
  MyaBlogsList,
  EditAccount,
  SingleDoctorProfile,
  Reviews,
  MyAppointments,
  Booking,
  EditAppointment
} from '../Screens';
import IconComp from '../Components/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontIcons from 'react-native-vector-icons/FontAwesome5';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import Drawer from '../Screens/Drawer';
import FinishRegistration from '../Screens/FinishRegistration';
import Splash from '../Screens/Splash';
import OwnedBlogs from '../Screens/Account/Blogs';
import { Constants } from '../Utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stacks = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const MyaPlusStack = createStackNavigator();
const DoctorStack = createStackNavigator();
const InfoStack = createStackNavigator();
const SearchStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

const Tab = createMaterialBottomTabNavigator();

const LoginScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name="Login" component={Login} />
  </LoginStack.Navigator>
);

const AccountScreens = () => (
  <AccountStack.Navigator initialRouteName="Account">
    <AccountStack.Screen
      name="EditAccount"
      component={EditAccount}
      options={{ header: (props) => <Header {...props} back /> }}
    />
    <AccountStack.Screen name="Account" component={Account} />
    <MyaPlusStack.Screen
      name="MyaPlusHome"
      component={MyaPlus}
      options={{ header: (props) => <Header {...props} back /> }}
    />
    <AccountStack.Screen
      name="OwnedBlogs"
      component={OwnedBlogs}
      options={{ header: (props) => <Header {...props} back /> }}
    />
    <AccountStack.Screen
      name="MyAppointments"
      component={MyAppointments}
      options={{ header: (props) => <Header {...props} back /> }}
    />
  </AccountStack.Navigator>
);

const MyaPlusScreens = () => (
  <MyaPlusStack.Navigator initialRouteName="MyaBlogsList">
    <MyaPlusStack.Screen name="MyaPlus" component={MyaBlogsList} />
    <MyaPlusStack.Screen name="MyaPlusHome" component={MyaPlus} />
    <MyaPlusStack.Screen name="CreateBlog" component={CreateBlog} />
  </MyaPlusStack.Navigator>
);

const InfoScreens = () => (
  <InfoStack.Navigator initialRouteName="MyaBlogsList">
    <InfoStack.Screen name="Info" component={InfoTab} />
  </InfoStack.Navigator>
);

const SearchScreens = () => (
  <SearchStack.Navigator initialRouteName="Search">
    <SearchStack.Screen name="Search" component={Search} />
    <DoctorStack.Screen name="DoctorProfile" component={SingleDoctorProfile} />
  </SearchStack.Navigator>
);

const SplashScreen = () => (
  <HomeStack.Navigator screenOptions={{ header: (props) => null }}>
    <HomeStack.Screen name="Splash" component={Splash} />
  </HomeStack.Navigator>
);

const DoctorScreens = () => (
  <DoctorStack.Navigator screenOptions={{}}>
    <DoctorStack.Screen name="Doctors" component={Doctors} />
    <DoctorStack.Screen name="DoctorProfile" component={SingleDoctorProfile} />
    <DoctorStack.Screen name="Reviews" component={Reviews} />
  </DoctorStack.Navigator>
);

const HomeScreens = () => (
  <HomeStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <HomeStack.Screen name="MildMayHome" component={Home} />
    <HomeStack.Screen name="MyaPlus" component={MyaPlusScreens} />
  </HomeStack.Navigator>
);

function MyTabs () {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{}}
      shifting={false}
      // labeled={false}
      barStyle={{ backgroundColor: 'green', zIndex: 20 }}
      style={{ justifyContent: 'space-between' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarIcon: ({ color, size }) => <Icon color={color} name="home-outline" size={RFValue(20)} />
        }}
      />
      <Tab.Screen
        name="Doctors"
        component={DoctorScreens}
        options={{
          tabBarLabel: 'Doctors',
          tabBarIcon: ({ color, size }) => <Icon name="access-point" color={color} size={RFValue(20)} />
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreens}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="magnify" color={color} size={RFValue(20)} />
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreens}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size }) => <Icon name="information" color={color} size={RFValue(20)} />
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreens}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account" color={color} size={RFValue(20)} />
        }}
      />
    </Tab.Navigator>
  );
}

const AllStacks = () => (
  <Stacks.Navigator screenOptions={{}} initialRouteName="Splash" headerMode="screen">
    <Stacks.Screen name="HomeScreens" component={DrawerScreens} options={{ header: () => null }} />
    <Stacks.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
    <Stacks.Screen name="Booking" component={Booking} options={{ header: () => null }} />
    <Stacks.Screen name="EditAppoinment" component={EditAppointment} options={{ header: () => null }} />
    <Stacks.Screen name="Splash" component={Splash} options={{ header: () => null }} />
    <Stacks.Screen name="Suggestions" component={Suggestions} options={{ header: () => null }} />
  </Stacks.Navigator>
);
const DrawerScreens = () => (
  <DrawerStack.Navigator
    statusBarAnimation="fade"
    drawerStyle={{ backgroundColor: '#fff' }}
    drawerContent={(props) => <Drawer {...props} />}
  >
    <DrawerStack.Screen name="HomeScreens" component={MyTabs} />
    <DrawerStack.Screen name="FinishRegistration" component={FinishRegistration} />
  </DrawerStack.Navigator>
);

export default () => (
  <NavigationContainer theme={{ colors: { background: '#fff' } }}>
    <AllStacks />
  </NavigationContainer>
);
