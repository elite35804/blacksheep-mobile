import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Styles} from '@/styles';
import {Images} from '@/styles/Images';
import {useOvermind} from '@/store';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import {KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import ConfirmButton from '@/views/Components/ConfirmButton';
import axios from 'axios'
import Feather from 'react-native-vector-icons/Feather';

const AddTask = props => {
  const {state, actions} = useOvermind();
  const {window, isLoggedIn} = state;
  const navigation = useNavigation();
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
    actions.hud.show();
    const res = await axios.post('http://137.184.113.150:3003/api/add_task', {
      title,
      amount,
      link,
      users: [],
      createdAt: new Date().getTime()
    });
    await actions.getTasks();
    actions.alert.showSuccess({message: 'Added Successfully!'});

    actions.hud.hide();
    props.navigation.pop();
    console.log(res, 'res')
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
      <Container contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        <CloseBtn onPress={() => props.navigation.pop()}>
          <Feather name={'x'} style={{paddingVertical: 20, fontSize: 25}}/>
        </CloseBtn>
        <Title>Add Task</Title>
        <Body>
          <Label>Title</Label>
          <Input
            placeholder={'Enter the title'}
            placeholderTextColor='#24365650'
            value={title}
            onChangeText={setTitle}
          />
          <Divider size={30}/>
          <Label>Amount of Sheep</Label>
          <Input
            placeholder={'Enter the amount of sheep'}
            placeholderTextColor='#24365650'
            keyboardType={'number-pad'}
            value={amount}
            onChangeText={setAmount}
          />
          <Divider size={30}/>
          <Label>Link</Label>
          <Input
            placeholder={'Enter the link'}
            placeholderTextColor='#24365650'
            value={link}
            onChangeText={setLink}
            autoCapitalize={'none'}
            multiline={true}
            style={{height: 140}}
          />
          <ConfirmButton text={'Add'} onPress={onPressAdd}/>
        </Body>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AddTask;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
`

const Label = styled(MainSemiBoldFont)`
  font-size: 15px;
  color: black;
  margin-bottom: 5px;
`

const Title = styled(MainBoldFont)`
  font-size: 30px;
  color: black;
`

const Divider = styled.View`
  height: ${props => props.size}px;
`;
const Body = styled.View`
  margin-top: 20px;
  width: 90%;
`;

const Input = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: #dadadd;
  border-radius: 10px;
  padding-vertical: 15px;
  padding-horizontal: 10px;
  font-family: Manrope-Regular;
  color: black;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  ${Styles.start_center}
  
`;
