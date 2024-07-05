import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container } from '../components/Container/Container'
import HeaderComp from '../components/Header/Header'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { moderateScale, textScale } from '../styles/responsiveSize'
import colors from '../styles/colors'

const ShowProduct = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const DataParam: any = route.params
  console.log(DataParam);
  let pprice = String(DataParam?.price)
  let pstock = String(DataParam?.stock)

  return (
    <Container statusBarStyle='dark-content'>
      <HeaderComp onPressLeft={() => { navigation.goBack() }} /> 

      <View style={{ padding: moderateScale(10),gap:moderateScale(20) }} >
        <Text style={{alignSelf:'center',color:colors.whiteColor,fontSize:textScale(20)}}>Product Details</Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:moderateScale(10)}}>
          <Text style={styles.heading} >Product Name : </Text>
          <Text style={styles.text} numberOfLines={1}>{DataParam.name}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:moderateScale(10)}}>
          <Text style={styles.heading} > Price : </Text>
          <Text style={styles.text} numberOfLines={1}>{DataParam.price}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:moderateScale(10)}}>
          <Text style={styles.heading} > Description : </Text>
          <Text style={styles.text} numberOfLines={1}>{DataParam.description}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:moderateScale(10)}}>
          <Text style={styles.heading} > Category : </Text>
          <Text style={styles.text} numberOfLines={1}>{DataParam.category}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:moderateScale(10)}}>
          <Text style={styles.heading} > Stock : </Text>
          <Text style={styles.text} numberOfLines={1}>{DataParam.stock}</Text>
        </View>
        </View>
  
   </Container>
  )
}

export default ShowProduct

const styles = StyleSheet.create({

  heading : {
    color:colors?.redColor,
    fontSize:textScale(18),

  },
  text:{
    color:colors?.whiteColor,
    fontSize:textScale(14),
    width:moderateScale(210)
  }
})