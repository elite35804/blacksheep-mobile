import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Images, Styles} from '@/styles';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import Item from '@/views/Components/Item';
import {useOvermind} from '@/store';
import {json} from 'overmind';
import LinearGradient from 'react-native-linear-gradient';
import AddTaskModal from '@/views/Components/Modal/AddTaskModal';

const Tasks = (props) => {
  const {state, actions} = useOvermind()
  const [isOpen, setOpen] = useState(false)
  useEffect(() => {
    getTasks();
  }, [])
  const getTasks = async () => {
    await actions.getTasks();

  }

  console.log(json(state.tasks)?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1))
  return (
    <Container>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <Title style={{textAlign: 'center', marginBottom: 27, marginTop: 10}}>Tasks</Title>
        <FlatList
          style={{flex: 1}}
          data={json(state.tasks)?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)}
          renderItem={({item, index}) => <Item {...item} key={index}/>}
        />
        <TouchableOpacity onPress={() => setOpen(true)} style={{justifyContent: 'flex-end', alignSelf: 'flex-end', marginBottom: 10}}>
          <ConfirmGradient colors={['#7731E7', '#04BFCD']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            <Image source={Images.ic_add}/>
          </ConfirmGradient>
        </TouchableOpacity>
      </View>
      <AddTaskModal isOpen={isOpen} closeModal={() => setOpen(false)}/>
    </Container>)
};

export default Tasks;

const ConfirmGradient = styled(LinearGradient)`
  height: 80px;
  width: 80px;
  ${Styles.center}
  border-radius: 50px;
  ${Styles.center}
`

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

const AddButton = styled.TouchableOpacity`
  background-color: #1546A0;
  border-radius: 40px;
  width: 60px; height: 60px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-color: rgb(21, 70, 160);
  padding-vertical: 12px;
  padding-horizontal: 15px;
  ${Styles.center};
  position: absolute;
  bottom: 20px; right: 20px;
`
