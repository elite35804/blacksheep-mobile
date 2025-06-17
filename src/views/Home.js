import React, {useEffect, useState} from 'react';
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
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ConfirmButton from '@/views/Components/ConfirmButton';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import WalletModal from '@/views/Components/Modal/WalletModal';

const Home = props => {
  const {state, actions} = useOvermind();
  const {window, isLoggedIn} = state;
  const navigation = useNavigation();
  const [wallet, setWallet] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    getWallet()
  }, [])

  const getWallet = async () => {
    const data = await AsyncStorage.getItem('blacksheep_user_wallet');
    setWallet(data)
  }

  const onSave = async (isSave)  => {
    if (isSave) {
      await AsyncStorage.setItem('blacksheep_user_wallet', wallet);
    }
    setOpen(false)
    await onPressTasks()
  }

  const onPressTasks = async () => {
    if (!wallet) {
      actions.alert.showError({message: 'Please input your BEP20 wallet address!'});
      return false;
    }
    if (!isChecked) {
      actions.alert.showError({message: 'Please confirm Terms & Condition!'});
      return false;
    }
    const data = await AsyncStorage.getItem('blacksheep_user_wallet');
    if (data !== wallet) {
      setOpen(true);
      return false;
    }
    try {
      const params = {
        wallet,
        amount: 0,
        total: 0,
        createdAt: new Date().getTime()
      }
      const playerId = await AsyncStorage.getItem('playerId');
      if (playerId) {
        params.playerId = playerId
      }
      console.log(params, 'params')
      await actions.createUser(params)

      props.navigation.navigate("UserTasks")
    } catch (e) {
      console.log(e)
    }

  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Logo source={Images.bg_circle} style={{width: Dimensions.get('window').width, height: 150, resizeMode: 'stretch'}}/>
          <Title>Almost There!</Title>
          <BirdsLogo source={Images.ic_birds}/>
          <Form>
            <Image source={Images.ic_wallet}/>
            <Input
              placeholder={'Enter your wallet'}
              placeholderTextColor='rgba(0, 0, 0, 0.58)'
              value={wallet}
              onChangeText={setWallet}
            />
          </Form>
          <CheckView>
            <CheckBtn onPress={() => setChecked(!isChecked)}>
              {isChecked && <View style={{width: 15, height: 15, backgroundColor: 'rgb(88,36,27)'}}/>}
            </CheckBtn>
            <CheckText>Terms & Condition</CheckText>
          </CheckView>
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 40}} onPress={onPressTasks}>
            <ConfirmGradient colors={['#7731E7', '#04BFCD']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
              <BtnText>Continue</BtnText>
            </ConfirmGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 40, alignSelf: 'center'}} onPress={() => props.navigation.navigate('SignIn')}>
            <AdminText>Admin Login</AdminText>
          </TouchableOpacity>
          <WalletModal isOpen={isOpen} closeModal={() => setOpen(false)} onSave={onSave}/>
        </Container>
      </TouchableWithoutFeedback>
  );
};

export default Home;

const AdminText = styled(MainMediumFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;

  color: #04BFCD;
`

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

const CheckText = styled(MainMediumFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: white;
  margin-left: 21px;
`

const CheckBtn = styled.TouchableOpacity`
  width: 20px; height: 20px;
  ${Styles.center}
  background-color: #d9d9d9;
`

const CheckView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 64px;
  margin-top: 21px;
`

const Form = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #d9d9d9;
  padding-horizontal: 20px;
  padding-vertical: 8px;
  margin-horizontal: 20px;
  border-radius: 40px;
  margin-top: 30px;
`

const BirdsLogo = styled.Image`
  align-self: flex-end;
  margin-top: 40px;
`

const Logo = styled.Image`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
`

const Title = styled(MainSemiBoldFont)`
  font-size: 32px;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
`
const Input = styled.TextInput`
  padding-left: 8px;
  font-family: Manrope-Medium;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.58);
  flex: 1;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2E3031;
  padding-horizontal: 20px;
  
`;
