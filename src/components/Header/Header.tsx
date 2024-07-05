//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale, textScale } from '../../styles/responsiveSize';

import { useNavigation } from '@react-navigation/native';

import colors from '../../styles/colors';


// create a component
const HeaderComp = ({
  onPressLeft = ()=>{},
  leftText = '',
  isLeftImage = true,
  style = {},
  rightTextStyle = {},
  rightText = '',
  onPressRight = () => { },
  rightImage = null
}) => {
  const navigation = useNavigation()




  return (
    <View style={{ ...styles.container, ...style }}>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isLeftImage ? <TouchableOpacity
          style={{ marginRight: moderateScale(16) }}
          onPress={onPressLeft}
        >
          <Image style={{ tintColor: colors.whiteColor }} source={require('../../assets/images/ic_back_arrow.png')} />
        </TouchableOpacity> : null}

        {!!leftText ? <Text style={styles.textStyle}>{leftText}</Text> : null}
      </View>

      {!!rightText ?
        <TouchableOpacity
          onPress={onPressRight}
        >
          <Text style={{ ...styles.textStyle, ...rightTextStyle }}>{rightText}</Text>
        </TouchableOpacity> : null}

      {!!rightImage ?
        <TouchableOpacity
          onPress={onPressRight}
        >
          <Image style={{ tintColor: colors.whiteColor }} source={rightImage} />
        </TouchableOpacity> : null}

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: moderateScale(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16)
  },
  textStyle: {
    fontSize: textScale(16),
  }
});

//make this component available to the app
export default HeaderComp;