import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components';
import { tabBarScreenOptions, tabBarOptions, BottomTabBar } from '@/views/Components/TabBar';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {enableScreens} from 'react-native-screens';
import Splash from '@/views/Splash';
import SignIn from '@/views/SignIn';
import Tasks from '@/views/Tasks';
import AddTask from '@/views/AddTask';
import Users from '@/views/Users'
import Home from '@/views/Home'
import UserTasks from '@/views/UserTasks'
import TaskDetail from '@/views/TaskDetail'
import Reward from '@/views/Reward'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

enableScreens();
export const iosModalOptions = ({route, navigation}) => ({
  ...TransitionPresets.ModalPresentationIOS,
  cardOverlayEnabled: true,
  gestureEnabled: true,
  headerShown: false,
  headerStatusBarHeight: navigation.dangerouslyGetState().routes.indexOf(route) > 0 ? 0 : undefined,
});

const Tab = createBottomTabNavigator();
const Router: React.FC = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    setInitialized(true);

    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === 'android') StatusBar.setBackgroundColor("#FFEC00");
    StatusBar.setHidden(true);
  }, []);

  if (!initialized) return null;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFEC00"/>
      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="UserTasks" component={UserTasks}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="TaskDetail" component={TaskDetail}/>
        <Stack.Screen name="Main">
          {() =>
            <TabNavigatorContainer>
              <Tab.Navigator
                tabBar={props => <BottomTabBar {...props}/>}
                tabBarOptions={tabBarOptions}
                screenOptions={tabBarScreenOptions}>
                <Tab.Screen name="Tasks">
                  {() =>
                    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
                      <Stack.Screen name="Tasks" component={Tasks}/>
                      <Stack.Screen name="AddTask" component={AddTask}/>
                    </Stack.Navigator>}
                </Tab.Screen>
                <Tab.Screen name="Users" component={Users} />
                <Tab.Screen name="Reward" component={Reward} />
              </Tab.Navigator>
            </TabNavigatorContainer>
          }
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Router;

const TabNavigatorContainer = styled.View`
  flex: 1;
`
