/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {Provider} from 'react-redux';

import store from './store';

import Home from './screens/Home';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Home />
    </Provider>
  );
};

export default App;

EStyleSheet.build({
  $primaryColor: '#08639c',
});
