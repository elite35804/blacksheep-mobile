import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import {useOvermind} from '@/store';
import Modal from 'react-native-modal';
import {Images, Styles} from '@/styles';
import {Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {MainBoldFont, MainMediumFont, MainSemiBoldFont} from '@/views/Components';
import {get} from 'lodash';
import {MaterialIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const AddTaskModal = props => {
  const {state, actions} = useOvermind();
  const [isLoading, setLoading] = useState(false)
  const [title, setTitle] = useState(null);
  const [amount, setAmount] = useState(null);
  const [link, setLink] = useState(null);

  const onPressAdd = async () => {
    if (!title) {
      actions.alert.showError({message: 'Please input email'});
      return false;
    }
    if (!amount) {
      actions.alert.showError({message: 'Please input password'});
      return false;
    }
    if (!link) {
      actions.alert.showError({message: "Please input link"})
      return false
    }
    setLoading(true)
    const res = await axios.post('http://137.184.113.150:3003/api/add_task', {
      title,
      amount,
      link,
      users: [],
      createdAt: new Date().getTime()
    });
    await actions.getTasks();
    actions.alert.showSuccess({message: 'Added Successfully!'});
    setLoading(false)
    props.closeModal();
    console.log(res, 'res')
  };
  return (
    <MainModal
      isVisible={props.isOpen}
      onBackdropPress={() => {props.closeModal()}}
    >
      <Container>
        <Logo source={Images.ic_bird}/>
        <Title>
          Add Task
        </Title>
        <Input placeholder={'Title'} placeholderTextColor={'rgba(0, 0, 0, 0.58)'} value={title} onChangeText={setTitle}/>
        <Input placeholder={'Amount of Sheep'} placeholderTextColor={'rgba(0, 0, 0, 0.58)'} value={amount} onChangeText={setAmount}/>
        <Input placeholder={'Link'} autoCapitalize={'none'} placeholderTextColor={'rgba(0, 0, 0, 0.58)'} value={link} onChangeText={setLink}/>

        <Button onPress={onPressAdd}>
          <ConfirmGradient colors={['#7731E7', '#04BFCD']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            {isLoading ? <MaterialIndicator color={'white'} size={20}/> : <BtnText style={{color: 'white'}}>Add</BtnText>}
          </ConfirmGradient>
        </Button>
      </Container>
    </MainModal>
  );
};

export default AddTaskModal;
const ConfirmGradient = styled(LinearGradient)`
  align-self: flex-start;
  height: 47px;
  width: 240px;
  ${Styles.center}
  border-radius: 35px;
`

const Input = styled.TextInput`
  height: 60px;
  padding-horizontal: 25px;
  background-color: #d9d9d9;
  width: 100%;
  border-radius: 15px;
  color: rgba(0, 0, 0, 0.58);
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-vertical: 25px;
`

const BtnText = styled(MainSemiBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
`

const Title = styled(MainSemiBoldFont)`
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */


  color: #FFFFFF;
`

const Logo = styled.Image`
  position: absolute;
  top: -40px;
  margin-right: -5px;
`

const Button = styled.TouchableOpacity`
  margin-top: 10px;
`

const MainModal = styled(Modal)`
  flex: 1;
  margin: 0;
`;

const Container = styled.View`
  background-color: rgba(88, 36, 27, 0.9);
  margin-horizontal: 17px;
  padding: 41px 40px 32px 40px;
  border-radius: 40px;
  ${Styles.center}
`;
