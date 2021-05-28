import React from 'react';
import {View} from 'react-native';
import {Text, Icon, Badge} from 'native-base';
import PropTypes from 'prop-types';
import Styles from './../../styles/comman/Header';
// import {useSelector} from 'react-redux';
import {primaryColor} from '../../styles/variables';
const header = ({navigation, title}) => {
  // const counter = useSelector(state => state.count.count);
  let icons = (
    <Icon
      type="Entypo"
      name="menu"
      size={20}
      style={Styles.headerIcon}
      onPress={() => navigation.toggleDrawer()}
    />
  );
  return (
    <View style={Styles.header}>
      <View style={[Styles.leftContainer, {flex: 1}]}>
        {icons}
        <Text style={[Styles.headerTitle, {fontSize: 24}]}>{title}</Text>
      </View>
      {/* <Icon onPress={() => navigation.navigate('Notifications')} style={Styles.icon} ios="ios-notifications" android="md-notifications" /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Icon style={Styles.icon} type="AntDesign" name="search1" /> */}
        <Icon
          style={Styles.icon}
          onPress={() => navigation.navigate('WishList')}
          type="AntDesign"
          name="hearto"
        />
        <View style={{padding: 10}}>
          {/* <View
						style={{
							position: "absolute",
							backgroundColor: "white",
							borderWidth: 1,
							borderRadius: 20,
							padding: 5,
						}}
					>
						<Text style={{ fontSize: 12, color: primaryColor }}>{counter}</Text>
					</View> */}
          {/* <Badge
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              marginRight: 1,
              width: 25,
              height: 25,
            }}>
            <Text style={{color: primaryColor, fontSize: 14}}>{counter}</Text>
          </Badge> */}
          <Icon
            style={{color: 'white', marginRight: 5, fontSize: 22}}
            onPress={() => navigation.navigate('MyCart')}
            type="AntDesign"
            name="shoppingcart"
          />
        </View>
        <Icon
          style={Styles.icon}
          type="Ionicons"
          name="notifications-outline"
        />
      </View>
    </View>
  );
};

header.defaultProps = {
  title: 'Home',
};
header.propTypes = {
  title: PropTypes.string,
};

export default header;
