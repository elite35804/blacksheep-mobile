import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import { OneSignal as Config } from '@/Config';
import { _ } from 'lodash';

/*
*
*/
export const initialize = async ({ actions, state }) => {
  try {
    OneSignal.init(Config.appId, {kOSSettingsKeyInFocusDisplayOption: 0});
    OneSignal.provideUserConsent(true);
    // OneSignal.inFocusDisplaying(2)
    OneSignal.addEventListener('ids', (device) => {
      actions.pushNotification.setPlayerId(device);
      console.log(device, 'device')
      AsyncStorage.setItem('playerId', device?.userId)
    });
  } catch (ex) {
    console.log('PushNotification:: initialize() - ', 'Exception occurred', ex);
  }
}

/*
*
*/
export const subscribe = async ({ state, actions }) => {
  // Clear all current cache
  state.pushNotification.notification = undefined;
  state.pushNotification.playerId = undefined;
  state.pushNotification.openResult = undefined;

  try {
    OneSignal.addEventListener('received', actions.pushNotification.setNotification);
    OneSignal.addEventListener('opened', actions.pushNotification.setOpenResult);

  } catch (error) {
    console.log('PushNotification::subscribe() - Error Occurred', error);
  }
}

/*
*
*/
export const unsubscribe = async ({ state, actions }) => {
  // Clear all current cache
  state.pushNotification.notification = undefined;
  state.pushNotification.playerId = undefined;
  state.pushNotification.openResult = undefined;

  try {
    OneSignal.removeEventListener('received', actions.pushNotification.setNotification);
    OneSignal.removeEventListener('opened', actions.pushNotification.setOpenResult);

  } catch (error) {
    console.log('PushNotification::unsubscribe() - Error Occurred', error);
  }
}

/*
*
*/
export const setPlayerId = async ({ state }, playerId) => {
  state.pushNotification.playerId = playerId;
}

/*
*
*/
export const setNotification = async ({ state }, notification) => {
  console.log('received message =================>')
  state.pushNotification.notification = notification;
}

/*
*
*/
export const setOpenResult = async ({ state }, openResult) => {
  console.log('------------')
  state.pushNotification.openResult = openResult;
}
