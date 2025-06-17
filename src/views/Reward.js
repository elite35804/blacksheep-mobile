import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Images, Styles} from '@/styles';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import {FlatList, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import Item from '@/views/Components/Item';
import {useOvermind} from '@/store';
import {json} from 'overmind';
import {MaterialIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

const Reward = (props) => {
  const {state, actions} = useOvermind()
  const [isLoading, setLoading] = useState(false)
  const [amount, setAmount] = useState(false);
  useEffect(() => {
    getTasks();
  }, [])
  const getTasks = async () => {
    await actions.getWeekAmount()
  }

  const onPress = async ()  => {
    if (!amount || amount === 0) {
      actions.alert.showError('Please type amount');
      return false
    }
    setLoading(true)
    await actions.setWeekAmount(amount)
    await actions.getWeekAmount()
    setLoading(false);
    actions.alert.showSuccess('Set amount successfully!');
  }
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{paddingHorizontal: 20, flex: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
          <Title style={{textAlign: 'center', marginBottom: 27, marginTop: 10}}>Reward</Title>
          <ItemContainer>
            <Logo source={Images.ic_bird}/>
            <ItemTitle>
              Put BlackSheep Tokens?
            </ItemTitle>
            <Input placeholder={'Amount of Sheep'} keyboardType={'number-pad'} placeholderTextColor={'rgba(0, 0, 0, 0.58)'} value={amount} onChangeText={setAmount}/>
          </ItemContainer>
          <Button onPress={onPress}>
            <ConfirmGradient colors={['#7731E7', '#04BFCD']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
              {isLoading ? <MaterialIndicator color={'white'} size={20}/> : <BtnText style={{color: 'white'}}>Save</BtnText>}
            </ConfirmGradient>
          </Button>
        </View>
      </TouchableWithoutFeedback>

    </Container>)
};

export default Reward;

const ConfirmGradient = styled(LinearGradient)`
  align-self: flex-start;
  height: 65px;
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

const ItemTitle = styled(MainSemiBoldFont)`
  font-weight: 500;
  font-size: 24px;
  line-height: 39px;
  margin-top: 20px;
  /* identical to box height */


  color: #FFFFFF;
`

const Logo = styled.Image`
  position: absolute;
  top: -40px;
  margin-right: -5px;
`

const Button = styled.TouchableOpacity`
  margin-bottom: 70px;
  align-self: center;
`

const ItemContainer = styled.View`
  background-color: rgba(88, 36, 27, 0.9);
  padding: 41px 20px 92px 20px;
  border-radius: 40px;
  ${Styles.center}
`;

const Title = styled(MainBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */


  color: #FFFFFF;
`
const Container = styled.SafeAreaView`
  background-color: #2E3031;
  flex: 1;
`;
