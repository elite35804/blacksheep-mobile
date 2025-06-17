import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Styles} from '@/styles';
import {Images} from '@/styles/Images';
import {useOvermind} from '@/store';
import {MainBoldFont, MainMediumFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ConfirmButton from '@/views/Components/ConfirmButton';
import Feather from 'react-native-vector-icons/Feather';
import WalletModal from '@/views/Components/Modal/WalletModal';
import LinearGradient from 'react-native-linear-gradient';

const SignIn = props => {
  const {state, actions} = useOvermind();
  const {window, isLoggedIn} = state;
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isShow, setShow] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef()

  const onPressLogin = () => {
    if (!email) {
      actions.alert.showError({message: 'Please input email'});
      return false;
    }
    if (!password) {
      actions.alert.showError({message: 'Please input password'});
      return false;
    }
    if (email !== 'blacksheep.eth@gmail.com') {
      actions.alert.showError({message: "Email doesn't exist"})
      return false
    }
    if (password !== 'admin') {
      actions.alert.showError({message: 'Invalid password'});
      return false;
    }
    navigation.navigate('Main');
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}} behavior={'padding'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Logo source={Images.bg_circle} style={{width: Dimensions.get('window').width, height: 150, resizeMode: 'stretch'}}/>

          <Title>Welcome{'\n'}Back</Title>
          <BirdsLogo source={Images.ic_birds}/>
          <Form>
            <Image source={Images.ic_email}/>
            <Input
              ref={emailRef}
              placeholder={'Email'}
              placeholderTextColor='rgba(0, 0, 0, 0.58)'
              value={email}
              autoCapitalize={'none'}
              onChangeText={setEmail}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
          </Form>
          <Form>
            <Image source={Images.ic_pass}/>
            <Input
              ref={passwordRef}
              style={{width: 'auto', flex: 1}}
              placeholder={'Password'}
              placeholderTextColor='rgba(0, 0, 0, 0.58)'
              secureTextEntry={!isShow}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShow(!isShow)}>
              <Image source={Images.ic_eye}/>
            </TouchableOpacity>

          </Form>
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 40}} onPress={onPressLogin}>
            <ConfirmGradient colors={['#7731E7', '#04BFCD']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
              <BtnText>Login</BtnText>
            </ConfirmGradient>
          </TouchableOpacity>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const BtnText = styled(MainMediumFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
`
const ConfirmGradient = styled(LinearGradient)`
  align-self: flex-start;
  height: 70px;
  ${Styles.center}
  border-radius: 35px;
  padding-horizontal: 75px;
`

const Form = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #d9d9d9;
  padding-horizontal: 20px;
  padding-vertical:  8px;
  margin-horizontal: 20px;
  border-radius: 40px;
  margin-top: 30px;
`

const BirdsLogo = styled.Image`
  align-self: flex-end;
`

const Logo = styled.Image`
  position: absolute;
  left: 0;
  top: 0;
`

const Title = styled(MainSemiBoldFont)`
  font-size: 32px;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
`
const Input = styled.TextInput`
  width: 100%;
  padding-left: 8px;
  padding-right: 30px;
  font-family: Manrope-Medium;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.58);
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2E3031;
  padding-horizontal: 20px;
  
`;
