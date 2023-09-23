/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';

import 'react-native-gesture-handler';
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => App);
