import React from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {Text, Icon, Badge} from 'native-base';

import Styles from '../../styles/comman/Header';
import PropTypes from 'prop-types';
import {primaryColor, textColor, white} from '../../styles/variables';
// import {useSelector} from 'react-redux';
const StackHeader = ({
  hideDrawer,
  visibleColumn,
  mycart,
  OnVisibleColumn,
  navigation,
  mailsend,
  onSendMail,
  title,
  onPress,
  attechment,
  borderTopLeftRadius,
  borderTopRightRadius,
  onAttechment,
  iconcolor,
  bgcolor,
  justifyContent,
  deleteEmail,
  onDeleteEmail,
  wishList,
  hideMenu,
  showMenu,
  setMenuRef,
  thankyou,
}) => {
  // const counter = useSelector(state => state.count.count);
  let icons = (
    <Icon
      type="AntDesign"
      name="arrowleft"
      style={[Styles.headerIcon, {color: iconcolor}]}
      onPress={() => navigation.goBack(null)}
    />
  );
  if (hideDrawer) icons = null;
  if (thankyou) icons = null;
  return (
    <View
      style={[
        Styles.header,
        {
          justifyContent: 'space-between',
          backgroundColor: bgcolor,
          borderTopLeftRadius,
          borderTopRightRadius,
        },
      ]}>
      <View style={[Styles.leftContainer]}>{icons}</View>
      <TouchableWithoutFeedback onPress={onPress.bind(this)}>
        <View style={{flex: 1, justifyContent, flexDirection: 'row'}}>
          {title && (
            <Text numberOfLines={1} style={[Styles.headerTitle]}>
              {title}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {attechment == true && (
          <Icon
            style={[Styles.icon, {fontSize: 26, marginRight: 20}]}
            onPress={onAttechment.bind(this)}
            type="MaterialIcons"
            name="attachment"
          />
        )}
        {mailsend && (
          <Icon
            style={[Styles.icon, {fontSize: 20, marginRight: 10}]}
            onPress={onSendMail.bind(this)}
            type="MaterialIcons"
            name="send"
          />
        )}
        {deleteEmail && (
          <Icon
            style={[Styles.icon, {fontSize: 22, marginRight: 10, marginTop: 4}]}
            onPress={onDeleteEmail.bind(this)}
            type="MaterialIcons"
            name="delete"
          />
        )}
        {visibleColumn && (
          <Icon
            style={[Styles.icon, {fontSize: 22, marginRight: 15, marginTop: 4}]}
            onPress={OnVisibleColumn.bind(this)}
            type="Entypo"
            name="eye"
          />
        )}
        {wishList && (
          <Icon
            style={Styles.icon}
            onPress={() => navigation.navigate('WishList')}
            type="AntDesign"
            name="hearto"
          />
        )}
        {mycart && (
          // <View style={{padding: 12}}>
          //   {/* <View
          // 		style={{
          // 			position: "absolute",
          // 			backgroundColor: "white",
          // 			borderWidth: 1,
          // 			borderRadius: 30,
          // 			padding: 5,
          // 		}}
          // 	>
          // 		<Text style={{ fontSize: 12, color: primaryColor }}>
          // 			{counter}
          // 		</Text>
          // 	</View> */}
          //   <Badge
          //     style={{
          //       position: 'absolute',
          //       backgroundColor: 'white',
          //       marginRight: 1,
          //       width: 25,
          //       height: 25,
          //     }}>
          //     <Text style={{color: primaryColor, fontSize: 14}}>{counter}</Text>
          //   </Badge>
          <Icon
            style={Styles.icon}
            onPress={() => navigation.navigate('MyCart')}
            type="AntDesign"
            name="shoppingcart"
          />
          // </View>
        )}
      </View>
    </View>
  );
};

StackHeader.defaultProps = {
  title: null,
  hideSave: true,
  onPress: () => null,
  onSkip: () => null,
  onAttechment: () => null,
  onSendMail: () => null,
  onDeleteEmail: () => null,
  OnVisibleColumn: () => null,
  hideMenu: () => null,
  showMenu: () => null,
  setMenuRef: () => null,
  textAlign: 'left',
  bgcolor: primaryColor,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  headerContent: null,
  alignItems: 'center',
  justifyContent: 'flex-start',
  iconcolor: 'white',
  attechment: false,
  mailsend: false,
  deleteEmail: false,
  visibleColumn: false,
  multipalui: false,
  wishList: false,
  mycart: false,
  thankyou: false,
};
StackHeader.propTypes = {
  title: PropTypes.string,
};

export default StackHeader;
