import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Styles} from '@/styles';
import {Images} from '@/styles/Images';
import {useOvermind} from '@/store';
import {MainRegularFont} from '@/views/Components';
import {Dimensions, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import ConfirmButton from '@/views/Components/ConfirmButton';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

const Splash = props => {
  const {state, actions} = useOvermind();
  const {window, isLoggedIn} = state;
  const navigation = useNavigation();
  useEffect(() => {
    SplashScreen.hide();
    actions.pushNotification.initialize();
    OneSignal.addEventListener('received', async (data) => {
      console.log(data, 'received data =============================================================================');
      // const id = data?.payload?.additionalData?.data?.mediaId;
      actions.getTasks()
    });
    setTimeout(() => navigation.navigate('Home'), 2000)
  }, [])

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
      <Container>
        <Logo source={Images.bg_logo}/>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Splash;

const Logo = styled.Image`
  ${Styles.absolute_full};
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  resize-mode: cover;
`

const Container = styled.View`
  flex: 1;
  background-color: white;
  ${Styles.end_center}
  padding-bottom: 20px;
  padding-horizontal: 40px;
`;
