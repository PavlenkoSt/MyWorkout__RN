import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import ChecklistIcon from '@app/components/Icons/ChecklistIcon';
import GoalIcon from '@app/components/Icons/GoalIcon';
import HandstandIcon from '@app/components/Icons/HandstandIcon';
import ProgressIcon from '@app/components/Icons/ProgressIcon';
import SettingsIcon from '@app/components/Icons/SettingsIcon';

import PresetsStack from './PresetsStack';
import {BottomTabScreenPropsType, TabRoutesEnum} from './types';

import Goals from '@app/screens/Goals';
import Records from '@app/screens/Records';
import Settings from '@app/screens/Settings';
import TrainingStack from './TrainingStack';

const Tab = createBottomTabNavigator<BottomTabScreenPropsType>();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={TabRoutesEnum.TrainingStack}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderColor: '#000',
          minHeight: 55,
        },
        tabBarInactiveTintColor: EStyleSheet.value('$primaryColor'),
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: EStyleSheet.value('$primaryColor'),
        tabBarLabel: ({children, color}) => (
          <Text style={{color, marginBottom: 5}}>{children}</Text>
        ),
        tabBarIconStyle: {marginTop: 5},
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name={TabRoutesEnum.TrainingStack}
        component={TrainingStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ProgressIcon fill={color} width={20} height={20} />
          ),
          lazy: false,
          title: 'Training',
        }}
      />
      <Tab.Screen
        name={TabRoutesEnum.Goals}
        component={Goals}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <GoalIcon fill={color} width={20} height={20} />
          ),
          lazy: true,
        }}
      />
      <Tab.Screen
        name={TabRoutesEnum.Records}
        component={Records}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ChecklistIcon fill={color} width={20} height={20} />
          ),
          lazy: true,
        }}
      />
      <Tab.Screen
        name={TabRoutesEnum.Presets}
        component={PresetsStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <HandstandIcon fill={color} width={20} height={20} />
          ),
          lazy: true,
        }}
      />
      <Tab.Screen
        name={TabRoutesEnum.Settings}
        component={Settings}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <SettingsIcon fill={color} width={20} height={20} />
          ),
          lazy: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
