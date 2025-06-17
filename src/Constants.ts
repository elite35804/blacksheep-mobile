import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const isIphoneX =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896);

/*
*
*/
export const TabBarStyle = {
  top: 'TOP',
  bottom: 'BOTTOM',
};

/*
*
*/
export const Constants = {
  NavBarHeight: 50,
  ToolbarHeight: Platform.OS === 'ios' ? (isIphoneX ? 35 : 22) : StatusBar.currentHeight,
  ScreenWidth: width,
  ScreenHeight: height,
  tabBarStyle: TabBarStyle.top,
};
