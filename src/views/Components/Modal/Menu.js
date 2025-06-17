import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import {useOvermind} from '@/store';
import Modal from 'react-native-modal';
import {Images, Styles} from '@/styles';
import {Dimensions, Image, Keyboard, Linking, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {MainBoldFont, MainMediumFont, MainSemiBoldFont} from '@/views/Components';
const AddTaskModal = props => {
  const {state, actions} = useOvermind();

  const onSignOut = () => {
    props.closeModal();
    props.navigation.navigate('Home')
  }

  const onBuy = () => {
    Linking.openURL('https://pancakeswap.finance')
  }

  const joinTelegram = () => {
    Linking.openURL('https://telegram.com')
  }
  return (
    <MainModal
      isVisible={props.isOpen}
      onBackdropPress={() => {props.closeModal()}}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <Container>
        <Image source={Images.bg_sheep} style={{width: Dimensions.get('window').width * 0.6, height: Dimensions.get('window').height * 0.25, resizeMode: 'contain'}}/>
        <Divider/>
        <Text>Current Sheep: {state.currentUser?.amount || 0}</Text>
        <Button onPress={() => props.closeModal()}>
          <Image source={Images.ic_tasks} style={{marginRight: 10, width: 30, resizeMode: 'contain'}}/>
          <BtnText>Tasks</BtnText>
        </Button>
        <Button onPress={() => {props.closeModal(); actions.alert.showSuccess({message: `Your total earnings are ${state.currentUser?.total || 0} blacksheep tokens!`})}}>
          <Image source={Images.ic_stack} style={{marginRight: 10, width: 30, resizeMode: 'contain'}}/>
          <BtnText>Earnings</BtnText>
        </Button>
        <Button onPress={onBuy}>
          <Image source={Images.ic_cart} style={{marginRight: 10, width: 30, resizeMode: 'contain'}}/>
          <BtnText>Buy Token</BtnText>
        </Button>
        <Button onPress={joinTelegram}>
          <Image source={Images.ic_telegram} style={{marginRight: 10, width: 30, resizeMode: 'contain'}}/>
          <BtnText>Join Telegram</BtnText>
        </Button>
        <Bottom>
          <Button style={{backgroundColor: '#d9d9d9', paddingHorizontal: 40}} onPress={onSignOut}>
            <Image source={Images.ic_signout}/>
            <BtnText style={{color: 'black', marginLeft: 10}}>Sign Out</BtnText>
          </Button>
        </Bottom>
      </Container>
    </MainModal>
  );
};

export default AddTaskModal;

const Text = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-top: 20px;
  color: #FFFFFF;
`

const Bottom = styled.View`
  position: absolute;
  bottom: 50px;
  ${Styles.center}
`

const BtnText = styled(MainBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 39px;
  /* identical to box height */


  color: #FFFFFF;
`

const Button = styled.TouchableOpacity`
  height: 55px;
  flex-direction: row;
  background-color: #3f3f3f;
  border-radius: 62px;
  width: ${Dimensions.get('window').width * 0.7}
  margin-top: 20px;
  align-items: center;
  padding-left: 20px;
`

const Divider = styled.View`
  width: 100%; height: 1px;
  background-color: black;
`
const MainModal = styled(Modal)`
  flex: 1;
  margin: 0;
`;

const Container = styled.View`
  background-color: #6A433E;
  width: ${Dimensions.get('window').width * 0.8}
  padding-top: 30px;
  flex: 1;
  height: 100%;
  ${Styles.start_center}
`;
