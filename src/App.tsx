/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

import store from './store';

import Home from './screens/Home';

const App = (): JSX.Element => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MenuProvider>
        <Provider store={store}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <Home />
          <Toast />
        </Provider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
};

export default App;

EStyleSheet.build({
  $primaryColor: '#08639c',
  $white: '#c7c7c7',
  $bgColor: '#333',
});
