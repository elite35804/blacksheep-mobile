import env from 'react-native-config';

export const AppDetails = {
  appName: 'Black Sheep',
  updateDescription: 'A new version of this app is available. For best experience, update your app by tapping "Update".'
}

export const EndPoint = {
  apiUrl: env.API_URL,
  fileUrl: env.FILE_URL,
  wssUrl: env.WSS_URL,
};

export const OneSignal = {
  appId: '34fe0350-a8bf-401d-8409-06a0ef79ede7',
};

export const SentryConfig = {
  dsn: 'https://7ac68653b6474e308106f2cc844c3ec1@o327848.ingest.sentry.io/1839566'
}

export const google = {
  webkey: 'AIzaSyA5W2NuRWgrWtyM7HEz06xi_NCTWyWmlrU',
}
