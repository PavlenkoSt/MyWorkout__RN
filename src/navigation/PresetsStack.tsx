import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {PresetsParams} from './types';

import Preset from '@app/screens/Preset';
import Presets from '@app/screens/Presets';

const Stack = createStackNavigator<PresetsParams>();

const PresetsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PresetsList"
        component={Presets}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Preset"
        component={Preset as FC}
        initialParams={{id: '0', name: 'Preset'}}
        options={({route}) => ({
          headerTitle: route.params.name,
          headerStyle: {
            backgroundColor: EStyleSheet.value('$primaryColor'),
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};

export default PresetsStack;
