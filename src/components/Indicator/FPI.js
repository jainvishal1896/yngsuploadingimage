import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import ContentLoader from 'react-native-content-loader';
import {Circle, Rect} from 'react-native-svg';
import {primaryColor} from '../../styles/variables';
import StackHeader from '../Header/StackHeader';

const window = Dimensions.get('window');
export default FPIndicator = ({Main, Categories, Wishlistt, loader}) => (
  <View style={styles.root}>
    {loader && (
      <View
        style={{
          width: window.width,
          height: window.height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    )}
    {Main && (
      <ContentLoader
        width={window.width}
        height={window.height}
        duration={1000}>
        <StackHeader mycart={false} wishList={false} thankyou={true} />
        <Circle cx="30" cy="78" r="30" />
        <Circle cx="100" cy="78" r="30" />
        <Circle cx="170" cy="78" r="30" />
        <Circle cx="240" cy="78" r="30" />
        <Circle cx="310" cy="78" r="30" />
        <Circle cx="380" cy="78" r="30" />
        <Rect x="0" y="130" rx="4" ry="4" width="100" height="20" />
        <Rect
          x="0"
          y="160"
          rx="5"
          ry="5"
          width={window.width}
          height={window.height / 2.3}
        />
        <Rect x="0" y="510" rx="4" ry="4" width="100" height="20" />
        <Rect
          x="0"
          y="540"
          rx="4"
          ry="4"
          width={window.width / 1}
          height={window.height / 5}
        />
        {/* <Rect x="100" y="500" rx="4" ry="4" width="100" height="100" /> */}
      </ContentLoader>
    )}
    {Categories && (
      <ContentLoader
        width={window.width}
        height={window.height}
        duration={1000}>
        <Rect
          x="0"
          y="0"
          rx="4"
          ry="4"
          width={window.width}
          height={window.height}
        />
      </ContentLoader>
    )}
    {Wishlistt && (
      <ContentLoader
        width={window.width}
        height={window.height}
        duration={1000}>
        <Rect x="0" y="0" rx="4" ry="4" width={window.width} height="190" />
        <Rect x="0" y="200" rx="5" ry="5" width={window.width} height="190" />
        <Rect x="0" y="400" rx="6" ry="6" width={window.width} height="190" />
        {/* <Rect
					x="0"
					y="0"
					rx="5"
					ry="5"
					width={window.width}
					height={window.height / 3}
				/> */}
      </ContentLoader>
    )}
  </View>
);
FPIndicator.defaultProps = {
  Main: false,
  Categories: false,
  Wishlistt: false,
  loader: false,
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

    marginLeft: 2,
    backgroundColor: 'white',
  },
});
