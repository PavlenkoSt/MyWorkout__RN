import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Preset from '@app/screens/Preset';
import Presets from '@app/screens/Presets';

const Stack = createStackNavigator();

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
        component={Preset}
        initialParams={{id: '0'}}
      />
    </Stack.Navigator>
  );
};

export default PresetsStack;
