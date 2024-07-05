import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'

import { Container } from '../components/Container/Container'
import ButtonComp from '../components/Button/Button'
import { moderateScale, moderateScaleVertical, textScale } from '../styles/responsiveSize'
import colors from '../styles/colors'
import TextInputComp from '../components/TextInput/TextInput'
import navigationStrings from '../navigation/navigationStrings'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useLoginByEmail from '../hooks/auth/login-by-email'
import { showError, showSucess } from '../utiles/helpers'
import useForgetPasswordEmailVerify from '../hooks/auth/forget-email-verify'

const ForgetPassword = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  // api call
  const useForgetPasswordEmailVerifyMutation = useForgetPasswordEmailVerify()

  const onSubmit = () => {
    // navigation.navigate(navigationStrings.OTPVERIFY,{useremail:email})
    if (email === '') {
      showError('please enter email')

    } else {
      const payload = {
        email: email,
      }
      console.log(payload);

      useForgetPasswordEmailVerifyMutation.mutate(payload,
        {
          onSuccess:(data)=>{
           if (data?.data?.message === 'Successfully Confirm') {

              navigation.navigate(navigationStrings.OTPVERIFY, { useremail: email, type: 'forget' })
              showSucess('OTP Sent')

            }
          }
        }
      )
     }

  }

  return (
    <Container statusBarStyle='dark-content'>
      <View style={{ flex: 1, marginHorizontal: moderateScale(20), alignItems: 'center', }}>

        <Text style={styles.headerStyle}>Welcome</Text>
        <Text style={{ fontSize: textScale(22), color: colors.whiteColor, marginTop: moderateScale(15) }}>Crud Operation Task</Text>
        <Text style={styles.descStyle}>Forget Password</Text>

        <View style={{ marginTop: moderateScale(150) }}>
          <TextInputComp
            value={email}
            placeholder={'Enter Email'}
            onChangeText={(value: string) => setEmail(value)}
            keyboardType='email-address'
          />

          <ButtonComp onPress={() => { onSubmit() }} text='Forget Password' style={{ width: moderateScale(340), }} isLoading={useForgetPasswordEmailVerifyMutation?.isPending} disabled={useForgetPasswordEmailVerifyMutation?.isPending} />
        </View>

      </View>

    </Container>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    color: colors.whiteColor,
    marginTop: moderateScale(70)

  },
  descStyle: {
    fontSize: textScale(16),
    marginTop: moderateScaleVertical(8),
    color: colors.whiteColor,
  }
})