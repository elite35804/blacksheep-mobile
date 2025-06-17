import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import {useOvermind} from '@/store';
import Modal from 'react-native-modal';
import {Images, Styles} from '@/styles';
import {
  Image,
  Keyboard,
  Linking,
  PermissionsAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {MainBoldFont, MainMediumFont, MainSemiBoldFont} from '@/views/Components';
import {get} from 'lodash';
import {MaterialIndicator} from 'react-native-indicators';
import {useActionSheet} from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';

const TaskDetailModal = props => {
  const {state, actions} = useOvermind();
  const [isLoading, setLoading] = useState(false)
  const {task} = props;
  const [link, setLink] = useState(null);
  const {showActionSheetWithOptions} = useActionSheet();
  const [logo, setLogo] = useState(null);
  const [localLogo, setLocalLogo] = useState(null);
  const [isOpened, setOpened] = useState(false);

  const onPressLogo = () => {
    const options = ['Take New Photo', 'Photo Library', 'Cancel'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        useModal: true
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
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: "Cool Photo App Camera Permission",
                message:
                  "Cool Photo App needs access to your camera " +
                  "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the camera");
              picked = await ImagePicker.openCamera(options);
            } else {
              console.log("Camera permission denied");
            }

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
    setLoading(true)
    await actions.completeTask({
      wallet: state.currentUser?.wallet,
      taskId: task?._id
    });
    setLoading(false)
    actions.alert.showSuccess({message: 'Confirmed successfully!'});
    onClose()

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

  const onClose = () => {
    setLogo(null);
    setLocalLogo(null);
    setLink(null);
    setOpened(false)
    props.closeModal();
  }
  return (
    <MainModal
      isVisible={props.isOpen}
      onBackdropPress={onClose}
    >
      <Container>
        <Logo source={Images.ic_bird}/>
        <Title>
          Task Details
        </Title>
        <View style={{width: '100%'}}>
          <FormTitle>{task?.title}</FormTitle>
          <TouchableOpacity onPress={onClickLink}>
            <FormLink>{task?.link}</FormLink>
          </TouchableOpacity>
        </View>

        <Input placeholder={'Link of proof Or upload picture'} placeholderTextColor={'rgba(0, 0, 0, 0.58)'} value={link} onChangeText={setLink}/>
        <ScreenBtn onPress={onPressLogo}>
          <Image source={{uri: localLogo || ''}}
                 style={{width: '100%', height: '100%', borderRadius: 20, resizeMode: 'cover', position: 'absolute'}}/>
          {!localLogo && <Image source={Images.ic_add_circle}/>}
        </ScreenBtn>
        <Desc>Screenshot</Desc>
        <Bottom>
          <TouchableOpacity onPress={onClose}>
            <AddText>Decline</AddText>
          </TouchableOpacity>
          <Button onPress={onPressApprove}>
            {isLoading ? <MaterialIndicator color={'white'} size={20}/> : <BtnText style={{color: 'white'}}>Approve</BtnText>}
          </Button>
        </Bottom>
      </Container>
    </MainModal>
  );
};

export default TaskDetailModal;
const FormTitle = styled(MainMediumFont)`
  font-size: 18px;
  color: white;
`


const FormLink = styled(MainMediumFont)`
  font-size: 17px;
  color: #517fe5;
  text-decoration: underline;
  text-decoration-color: #517fe5;
`

const ScreenBtn = styled.TouchableOpacity`
  width: 150px;
  height: 135px;
  border-radius: 20px;
  background-color: #d9d9d9;
  margin-top: 13px;
  ${Styles.center}
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
  font-size: 15px;
  line-height: 24px;
  margin-top: 25px;
`

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
  margin-top: 10px;
  color: #FFFFFF;
`

const Row = styled.View`
  flex-direction: row;
  margin-top: 12px;
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
  ${Styles.center}
  background-color: #04BFCD;
  border-radius: 40px;
  height: 45px;
  width: 130px;
`

const Bottom = styled.View`
  ${Styles.between_center}
  flex-direction: row;
  margin-top: 15;
  width: 100%;
  padding-horizontal: 15px;
`

const MainModal = styled(Modal)`
  flex: 1;
  margin: 0;
`;

const Container = styled.View`
  background-color: #58241B;
  margin-horizontal: 25px;
  padding: 41px 9px 32px 23px;
  border-radius: 40px;
  ${Styles.center}
`;
