import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import ChecklistIcon from '@app/components/Icons/ChecklistIcon';
import ProgressIcon from '@app/components/Icons/ProgressIcon';
import SettingsIcon from '@app/components/Icons/SettingsIcon';

import Records from '@app/screens/Records';
import Settings from '@app/screens/Settings';
import Training from '@app/screens/Training';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderColor: '#000',
        },
        tabBarInactiveTintColor: EStyleSheet.value('$primaryColor'),
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: EStyleSheet.value('$primaryColor'),
        tabBarLabel: ({children, color}) => (
          <Text style={{color}}>{children}</Text>
        ),
        headerShown: false,
      }}>
      <Tab.Screen
        name="Training"
        component={Training}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ProgressIcon fill={color} width={20} height={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Records"
        component={Records}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ChecklistIcon fill={color} width={20} height={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <SettingsIcon fill={color} width={20} height={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
