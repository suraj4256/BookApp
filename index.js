/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';
// Ensure Firebase is initialized
if (!firebase.apps.length) {
    console.log('Initializing Firebase');
} else {
    console.log('Firebase already initialized');
}
AppRegistry.registerComponent(appName, () => App);
