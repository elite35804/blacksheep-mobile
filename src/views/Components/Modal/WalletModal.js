import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import {useOvermind} from '@/store';
import Modal from 'react-native-modal';
import {Images, Styles} from '@/styles';
import {Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {MainBoldFont, MainSemiBoldFont} from '@/views/Components';
import {get} from 'lodash';
import {MaterialIndicator} from 'react-native-indicators';

const WalletModal = props => {
  const {state, actions} = useOvermind();
  return (
    <MainModal
      isVisible={props.isOpen}
      onBackdropPress={() => {props.closeModal()}}
    >
      <Container>
        <Logo source={Images.ic_bird}/>
        <Title>
          Save Wallet?
        </Title>
        <Row>
          <Image source={Images.ic_info}/>
          <Desc>The information will be saved on secure Local storage in your phone.</Desc>
        </Row>
        <Bottom>
          <TouchableOpacity onPress={() => props.onSave(false)}>
            <AddText>Decline</AddText>
          </TouchableOpacity>
          <Button onPress={() => props.onSave(true)}>
            <BtnText style={{color: 'white'}}>Save</BtnText>
          </Button>
        </Bottom>
      </Container>
    </MainModal>
  );
};

export default WalletModal;

const BtnText = styled(MainSemiBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
`

const Desc = styled(MainSemiBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-left: 14px;
  color: #FFFFFF;
`

const Row = styled.View`
  flex-direction: row;
  margin-top: 12px;
`

const Title = styled(MainSemiBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
`

const Logo = styled.Image`
  position: absolute;
  left: -26px; top: -24px
`

const AddText = styled(MainBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;

  color: #D9D9D9;
`

const Button = styled.TouchableOpacity`
  padding-horizontal: 40px;
  padding-vertical: 10px;
  ${Styles.center}
  background-color: #04BFCD;
  border-radius: 40px;
`

const Bottom = styled.View`
  ${Styles.between_center}
  flex-direction: row;
  margin-top: 80px;
  width: 100%;
  padding-horizontal: 15px;
`

const MainModal = styled(Modal)`
  flex: 1;
  margin: 0;
`;

const Container = styled.View`
  background-color: #58241B;
  margin-horizontal: 48px;
  padding: 41px 9px 32px 23px;
  border-radius: 40px;
  ${Styles.center}
`;
