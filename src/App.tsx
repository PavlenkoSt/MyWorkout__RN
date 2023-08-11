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

import useRealmContext from './hooks/useRealmContext';

import store from './store';

import Home from './screens/Home';

const App = (): JSX.Element => {
  const {RealmProvider} = useRealmContext();

  return (
    <Provider store={store}>
      <RealmProvider>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Home />
      </RealmProvider>
    </Provider>
  );
};

export default App;

EStyleSheet.build({
  $primaryColor: '#08639c',
});
