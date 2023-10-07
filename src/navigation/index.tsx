import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import ChecklistIcon from '@app/components/Icons/ChecklistIcon';
import HandstandIcon from '@app/components/Icons/HandstandIcon';
import ProgressIcon from '@app/components/Icons/ProgressIcon';
import SettingsIcon from '@app/components/Icons/SettingsIcon';

import PresetsStack from './PresetsStack';
import {BottomTabScreenPropsType} from './types';

import Records from '@app/screens/Records';
import Settings from '@app/screens/Settings';
import Training from '@app/screens/Training';

const Tab = createBottomTabNavigator<BottomTabScreenPropsType>();

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
          lazy: false,
        }}
      />
      <Tab.Screen
        name="Records"
        component={Records}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ChecklistIcon fill={color} width={20} height={20} />
          ),
          lazy: true,
        }}
      />
      <Tab.Screen
        name="Presets"
        component={PresetsStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <HandstandIcon fill={color} width={20} height={20} />
          ),
          lazy: true,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <SettingsIcon fill={color} width={20} height={20} />
          ),
          lazy: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
