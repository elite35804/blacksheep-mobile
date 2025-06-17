import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Styles} from '@/styles';
import {Images} from '@/styles/Images';
import {useOvermind} from '@/store';
import {MainBoldFont, MainMediumFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components';
import {Image, KeyboardAvoidingView, Linking, TouchableOpacity} from 'react-native';
import ConfirmButton from '@/views/Components/ConfirmButton';
import axios from 'axios'
import Feather from 'react-native-vector-icons/Feather';
import {useActionSheet} from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';

const TaskDetail = props => {
  const {state, actions} = useOvermind();
  const {window, isLoggedIn} = state;
  const navigation = useNavigation();
  const {task} = props.route.params;
  const [link, setLink] = useState(null);
  const {showActionSheetWithOptions} = useActionSheet();
  const [logo, setLogo] = useState(null);
  const [localLogo, setLocalLogo] = useState(null);
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    Linking.addEventListener('url', res => {
      console.log(res,'res')
    });
    return () => Linking.removeEventListener('url', res => {
      console.log(res, 'res ====')
    })
  }, [])

  const onPressLogo = () => {
    const options = ['Take New Photo', 'Photo Library', 'Cancel'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        const options = {
          cropping: false,
          mediaType: 'photo',
          includeBase64: true,
        };

        try {
          let picked = null;
          if (buttonIndex === 1) {
            picked = await ImagePicker.openPicker(options);
          } else if (buttonIndex === 0) {
            picked = await ImagePicker.openCamera(options);
          }
          if (picked) {
            console.log(picked, 'picked')
            setLogo(picked.data);
            setLocalLogo(picked.path);
          }
        } catch (e) {
          console.log('UserSetting::_onPressAvatar failed: ', e);
        }
      },
    );
  };

  const onPressApprove = async ()  => {
    console.log('========', state.currentUser, 'currentUser');
    console.log()
    // if (!isOpened) {
    //   actions.alert.showError({message: 'Please complete the task clicking link below title.'});
    //   return false;
    // }
    // if (!logo) {
    //   actions.alert.showError({message: 'Please attach screenshot for proof'});
    //   return false;
    // }
    // if (!link) {
    //   actions.alert.showError({message: "Please paste proof URL!"});
    //   return false;
    // }
    await actions.completeTask({
      wallet: state.currentUser?.wallet,
      taskId: task?._id
    });
    actions.alert.showSuccess({message: 'Confirmed successfully!'});
    props.navigation.pop();

  }

  const onClickLink = () => {
    Linking.canOpenURL(task.link)
      .then(res => {
        console.log(res);
        if (res) {
          Linking.openURL(task.link);
          setOpened(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log(localLogo, 'localLogo')

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
      <Container contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        <CloseBtn onPress={() => props.navigation.pop()}>
          <Feather name={'x'} style={{paddingVertical: 20, fontSize: 25}}/>
        </CloseBtn>
        <Title>Task Detail</Title>
        <Body>
          <Form>
            <FormTitle>{task.title}</FormTitle>
            <TouchableOpacity onPress={onClickLink}>
              <FormLink>{task.link}</FormLink>
            </TouchableOpacity>
          </Form>

          <Divider size={20}/>
          <Label>Attach Screenshot</Label>
          <Form as={TouchableOpacity} style={{height: 150, paddingHorizontal: 0, paddingVertical: 0}} onPress={onPressLogo}>
            <Image source={{uri: localLogo || ''}}
                            style={{width: '100%', height: '100%', borderRadius: 6, resizeMode: 'cover'}}/>
          </Form>
          <Divider size={20}/>
          <Label>Paste proof URL</Label>
          <Input
            placeholder={'Enter the link'}
            placeholderTextColor='#24365650'
            value={link}
            onChangeText={setLink}
            autoCapitalize={'none'}
            multiline={true}
            style={{height: 130}}
          />
          <ConfirmButton text={'Approve'} onPress={onPressApprove}/>
        </Body>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default TaskDetail;

const Form = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #dadadd;
  border-radius: 10px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  color: black;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
`

const Label = styled(MainSemiBoldFont)`
  font-size: 15px;
  color: black;
  margin-bottom: 5px;
  text-align: center;
`

const Title = styled(MainBoldFont)`
  font-size: 30px;
  color: black;
`

const FormTitle = styled(MainBoldFont)`
  font-size: 20px;
  color: black;
`

const FormLink = styled(MainMediumFont)`
  font-size: 17px;
  color: #517fe5;
  text-decoration: underline;
  text-decoration-color: #517fe5;
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
