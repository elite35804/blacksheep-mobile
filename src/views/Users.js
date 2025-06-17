import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import LinearGradient from 'react-native-linear-gradient';
import {Styles} from '@/styles';
import {Images} from '@/styles/Images';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import Feather from 'react-native-vector-icons/Feather'
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Header} from '@/views/Components/Header';
import Item from '@/views/Components/Item';
import {useOvermind} from '@/store';
import {json} from 'overmind';

const Users = (props) => {
  const {state, actions} = useOvermind()
  useEffect(() => {
    getUsers();
  }, [])
  const getUsers = async () => {
    await actions.getUsers()
  }
  return (
    <Container>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <Title style={{textAlign: 'center', marginBottom: 27, marginTop: 10}}>Users</Title>
        <FlatList
          style={{flex: 1}}
          data={json(state.users)?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)}
          renderItem={({item, index}) => <Item {...item} key={index}/>}
        />
      </View>
    </Container>)
};

export default Users;


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
