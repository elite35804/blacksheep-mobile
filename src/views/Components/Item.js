import {Image, View} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components/controls/Text';
import {Styles} from '@/styles';
import moment from 'moment';
const Item = (props) => {
 return (<ItemContainer style={{shadowOffset: {width: 0, height: 10}}} key={props.i?.toString()} onPress={props.onPress}>
   <View>
     <RectView>
       <Count>{props.amount}</Count>
     </RectView>
     <ItemDate style={{marginTop: 3, textAlign: 'center'}}>Sheep</ItemDate>
   </View>

   <View style={{marginLeft: 12, marginTop: 3, flex: 1}}>
     <ItemTitle numberOfLines={2}>{props.title || ((props.wallet).substring(0, 7) + '***' + (props.wallet).substring(props.wallet?.length - 7, props.wallet?.length))}</ItemTitle>
     <Row>
       <ItemDate>Created At: {moment(props.createdAt).format('YYYY-MM-DD')} {'\t\t\t'}{moment(props.createdAt).format('hh:mm A')}</ItemDate>

     </Row>
   </View>
 </ItemContainer>)
};

export default Item;

const Row = styled.View`
  flex-direction: row;
  ${Styles.between_center}
`

const Count = styled(MainSemiBoldFont)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */


  color: #000000;
`

const RectView = styled.View`
  width: 60px; height: 60px;
  border-radius: 15px;
  background-color: #d9d9d9;
  ${Styles.center}
`

const ItemLogo = styled.Image`
  margin-right: 16px;
  width: 30px;
  resize-mode: contain;
`

const ItemDate = styled(MainRegularFont)`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */


  color: #FFFFFF;
`

const ItemTitle = styled(MainBoldFont)`
  font-style: normal;
  font-size: 14px;
  line-height: 17px;
  height: 37px;
  /* identical to box height */


  color: #FFFFFF;
`

const ItemContainer = styled.TouchableOpacity`
  background-color: rgba(88, 36, 27, 0.47);
  border-radius: 12px;
  shadow-opacity: 0.5;
  shadow-radius: 1px;
  shadow-color: rgba(0, 0, 0, 0.25);
  padding: 20px 42px 2px 7px;
  margin-bottom: 27px;
  flex-direction: row;
`
