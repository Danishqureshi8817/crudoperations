
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveSize';
import colors from '../../styles/colors';


const TextInputComp = ({
    value = '',
    onChangeText,
    placeholder = '',
    secureText = false,
    onPressSecure = () => {},
    inputStyle = {},
    textStyle = {},
    placeholderTextColor = colors.whiteColorOpacity70,
    ...props
}:any) => {


    return (
        <View style={{
            ...styles.inputStyle,
            ...inputStyle
            
        }}>
            <TextInput 
            style={{
                ...styles.textStyle,
                ...textStyle,
                textAlign:  'left'
            }}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}

            {...props}
            />
            {!!secureText? <Text style={{...styles.textStyle,flex:0}} onPress={onPressSecure}>{secureText}</Text>:null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
     height:moderateScale(52),
     borderRadius:moderateScale(8),
     flexDirection:'row',
     justifyContent:'space-between',
     paddingHorizontal:moderateScale(16),
     alignItems:'center',
     backgroundColor: colors.gray2,
     marginBottom:moderateScaleVertical(16)
    },
    textStyle:{
        fontSize:textScale(14),
        flex:1,
        color: colors.whiteColor
    }
});


export default TextInputComp;