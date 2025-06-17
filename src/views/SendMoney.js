import React, {useState} from 'react';
import styled from 'styled-components'
import {Header} from '@/views/Components/Header';
import {Styles} from '@/styles';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import Feather from 'react-native-vector-icons/Feather';
import {chunk} from 'lodash';
import ConfirmButton from '@/views/Components/ConfirmButton';
const SendMoney = (props) => {
  const {data} = props.route.params;
  const [price, setPrice] = useState('');
  let nums = [1,2,3,4,5,6,7,8,9,0,'.',''];
  nums = chunk(nums, 3).map(num => num);
  const onPressNum = (num) => {
    let oriPrice = price;
    if (num === '.' && oriPrice.includes('.')) return;
    oriPrice = num === '' ? oriPrice.slice(0, -1) : oriPrice + num;
    setPrice(oriPrice)
  };

  return (<Container>
    <Header title={'Send Money'} isBlack {...props}/>
    <Body>
      <TopView>
        <LogoView style={{shadowOffset:{width: 0, height: 1}}}>
          <Title>{data.name.charAt(0).toUpperCase()}</Title>
        </LogoView>
        <DetailView>
          <To>To:</To>
          <Name>{data.name}</Name>
          <To>{data.email}</To>
        </DetailView>
      </TopView>
      <PriceView>
        <Sign>$</Sign>
        <Input>{price}</Input>
      </PriceView>
      {nums.map(num => <CalView>
        {num.map(n => <ItemBtn style={{shadowOffset: {width: 10, height: 15}}} onPress={() => onPressNum(n)} key={n.toString()}>
          {n === '' ? <Feather name={'delete'} size={24} color={'#243656'}/>:  <ItemText>{n}</ItemText>}
        </ItemBtn>)}
      </CalView>)}
      <ConfirmButton onPress={() => {}} text={'Send'}/>
    </Body>
  </Container>)
}
export default SendMoney;
const ItemText = styled(MainSemiBoldFont)`
  font-size: 24px;
  line-height: 33px;
  color: #243656;
`
const ItemBtn = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  border-radius: 40px;
  background-color: white;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: rgb(21, 70, 160);
  ${Styles.center}
`

const CalView = styled.View`
  margin-horizontal: 16px;
  flex-direction: row;
  ${Styles.between_center}
  margin-top: 12px;
`
const Input = styled(MainBoldFont)`
  padding-horizontal: 10px;
  font-size: 40px;
  line-height: 55px;
  color: #243656;
  width: 100%;
`
const Sign = styled(MainBoldFont)`
  font-size: 40px;
  line-height: 55px;
  color: #243656;
`
const PriceView = styled.View`
  height: 72px;
  border-width: 2px;
  border-color: #0070ba;
  border-radius: 20px;
  margin-top: 35px;
  padding-horizontal: 20px;
  ${Styles.start_center}
  flex-direction: row;
  margin-bottom: 36px;
`
const Name = styled(MainRegularFont)`
  font-size: 16px;
  line-height: 22px;
  color: #243656;
`
const To = styled(MainRegularFont)`
  font-size: 12px;
  line-height: 16px;
  color: #24365650
`
const DetailView = styled.View`
  margin-left: 18px;
`
const Title = styled(MainBoldFont)`
  font-size: 17px;
  line-height: 23px;
  color: #243656;
`
const LogoView = styled.View`
  width: 50px;
  height: 50px; border-radius: 20px;
  background-color: #f5f7fa;
  border-width: 2px;
  border-color: white;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: rgb(21, 70, 160);
  ${Styles.center}
`
const TopView = styled.View`
  flex-direction: row;
  ${Styles.start_center}
  margin-top: 30px;
`
const Body = styled.View`
  margin-horizontal: 32px;
`

const Container = styled.View`
  flex: 1;
  background-color: white;
`
