import React, {useState} from 'react';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import { filter, isEmpty } from 'lodash';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { json } from 'overmind';

import {Colors, Images, Styles} from '@/styles';
import {MainMediumFont, MainRegularFont} from '@/views/Components/controls/Text';
import LinearGradient from 'react-native-linear-gradient';
import AddTaskModal from '@/views/Components/Modal/AddTaskModal';

/*
*
*/
export const BottomTabBar = (props) => {
  const [isOpen, setOpen] = useState(false)
  console.log(props.state.index)
  return (
    <BottomTabBarContainer>
      <TabItem onPress={() => props.navigation.navigate('Tasks')} isSelected={props.state.index === 0}>
        <Image source={Images.ic_task} style={{width: 50, height: 50, tintColor: props.state.index === 0 ? '#04BFCD' : 'white'}}/>
        {props.state.index === 0 && <TabText>Tasks</TabText>}
      </TabItem>
      <TabItem onPress={() => props.navigation.navigate('Reward')} isSelected={props.state.index === 2}>
        <Image source={Images.ic_coin} style={{width: 50, height: 50, tintColor: props.state.index === 2 ? '#04BFCD' : 'white'}}/>
        {props.state.index === 2 && <TabText>Reward</TabText>}
      </TabItem>

      <TabItem onPress={() => props.navigation.navigate('Users')}>
        <Image source={Images.ic_users} style={{width: 40, height: 40, tintColor: props.state.index === 1 ? '#04BFCD' : 'white'}}/>
        {props.state.index === 1 && <TabText style={{marginTop: 5}}>Users</TabText>}
      </TabItem>

    </BottomTabBarContainer>
  )
}

const BtnText = styled(MainMediumFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
`
const ConfirmGradient = styled(LinearGradient)`
  height: 100px;
  width: 100px;
  ${Styles.center}
  border-radius: 50px;
  ${Styles.center}
`

const AddView = styled.View`
  background-color: #2E3031;
  width: 150px; height: 150px; border-radius: 90px;
  position: absolute;
  ${Styles.center};
  left: ${Dimensions.get('window').width / 2 - 75}px;
  bottom: 25px;
`

const TabItem = styled.TouchableOpacity`
  ${Styles.start_center};
  height: 60px;
`

const TabText = styled(MainRegularFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */


  color: #04BFCD;
`

const BottomTabBarContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 18px;
  flex-direction: row;
  justify-content: space-between;
  background-color: #401E1C;
  align-items: center;
  width: ${Dimensions.get('window').width};
  padding-horizontal: 30px;
`
