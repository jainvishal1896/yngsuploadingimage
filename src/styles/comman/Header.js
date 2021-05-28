import {StyleSheet} from 'react-native';
import {primaryColor, white, headerColor} from './../variables';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: primaryColor,
    paddingLeft: 10,
  },
  headerIcon: {
    height: 22,
    width: 32,
    paddingHorizontal: 5,
    color: white,
  },
  saveIcon: {
    color: white,
    marginRight: 10,
    fontSize: 20,
  },
  headerTitle: {
    marginLeft: 15,
    fontSize: 18,
    color: '#fff',
    // textAlign:'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: white,
    marginRight: 15,
    fontSize: 22,
  },
  saveText: {
    marginRight: 10,
  },
});
