import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {TrainingParams, TrainingRoutesStack} from '../types';

import Training from '@app/screens/Training';
import {Exercise} from '@app/screens/Exercise';
import {ColorVars} from '@app/utilts/theme';

const Stack = createStackNavigator<TrainingParams>();

export default function TrainingStack() {
  return (
    <Stack.Navigator initialRouteName={TrainingRoutesStack.Training}>
      <Stack.Screen
        name={TrainingRoutesStack.Training}
        component={Training}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={TrainingRoutesStack.Exercise}
        component={Exercise as FC}
        initialParams={{id: '0', name: 'Exercise'}}
        options={({route}) => ({
          headerTitle: route.params.name,
          headerStyle: {
            backgroundColor: EStyleSheet.value(ColorVars.$primaryColor),
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}
