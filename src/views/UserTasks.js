import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Images, Styles} from '@/styles';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Item from '@/views/Components/Item';
import {useOvermind} from '@/store';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import TaskDetail from '@/views/TaskDetail';
import TaskDetailModal from '@/views/Components/Modal/TaskDetailModal';
import Menu from '@/views/Components/Modal/Menu';

const UserTasks = (props) => {
  const {state, actions} = useOvermind();
  const [isOpen, setOpen] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  useEffect(() => {
    getTasks();

  }, []);
  const getTasks = async () => {
    await actions.getTasks();
    setInterval(async () => await actions.getCurrentUser(), 10000)
  };
  const getTodayTasks = () => {
    // return state.tasks;
    return state.tasks?.filter(t => !t.users?.find(u => u === state.currentUser?._id) && moment(t.createdAt).format('MM/DD/YY') === moment().format('MM/DD/YY'))
  };

  const onDetail = (item) => {
    console.log(item, 'item');
    setSelectedTask(item)
    setOpen(true)
    // props.navigation.navigate('TaskDetail', {task: item});
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity style={{flex: 1}} onPress={() => setOpenMenu(true)}>
          <Image source={Images.ic_menu}/>
        </TouchableOpacity>
        <Title>Tasks</Title>
        <Desc>Current Sheep: {state.currentUser?.amount}</Desc>
      </Header>
      <View style={{paddingHorizontal: 15, paddingTop: 22}}>
        {getTodayTasks().map((item, i) => <Item {...item} key={i} onPress={() => onDetail(item)}/>)}
      </View>
      <TaskDetailModal isOpen={isOpen} closeModal={() => setOpen(false)} task={selectedTask}/>
      <Menu isOpen={isOpenMenu} closeModal={() => setOpenMenu(false)} navigation={props.navigation}/>
    </Container>
  );
};

export default UserTasks;

const Desc = styled(MainSemiBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  flex: 1;
  text-align: right;
  /* identical to box height */


  color: #FFFFFF;
`;

const Header = styled.View`
  width: 100%;
  height: 90px;
  background-color: rgba(88, 36, 27, 0.76);
  flex-direction: row;
  ${Styles.center}
  padding-horizontal: 18px;
  padding-top: 30px;
`;


const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 100;
`;

const Title = styled(MainBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */


  color: #FFFFFF;
`;
const Container = styled.View`
  background-color: #2E3031;
  flex: 1;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #1546A0;
  border-radius: 40px;
  width: 60px;
  height: 60px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-color: rgb(21, 70, 160);
  padding-vertical: 12px;
  padding-horizontal: 15px;
  ${Styles.center};
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
