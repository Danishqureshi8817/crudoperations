import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { moderateScale, textScale } from '../../styles/responsiveSize';
import colors from '../../styles/colors';


const ButtonComp = ({
  onPress = () => { },
  text = '',
  style = {},
  leftImg = null,
  textStyle = {},
  isLoading = false,
  disabled=false,
  bgColor='#F43738'
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style, backgroundColor: disabled ? colors.gray5 : bgColor, }}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >

      {!!leftImg ? <Image source={leftImg} /> : <View />}


      {isLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={{ ...styles.textStyle, ...textStyle }} >{text}</Text>}

      <View />

    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {

    height: moderateScale(52),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16)
  },
  textStyle: {
    color: colors.whiteColor,
    fontSize: textScale(16)
  }
});


export default ButtonComp;