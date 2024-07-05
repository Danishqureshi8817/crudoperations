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

const Login = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  // api call
  const useLoginByEmailMutation = useLoginByEmail()

  const onSubmit = () => {
    // navigation.navigate(navigationStrings.OTPVERIFY,{useremail:email})
    if (email === '') {
      showError('please enter email')

    } else if (password === '') {
      showError('please enter password')

    } else {
      const payload = {
        email: email,
        password: password
      }
      console.log(payload);

      useLoginByEmailMutation.mutate(payload, {
        onSuccess: (data) => {
          showSucess('Login Successfully')
          navigation.navigate(navigationStrings.OTPVERIFY, { useremail: email })
        }
      })
    }

  }

  return (
    <Container statusBarStyle='dark-content'>
      <View style={{ flex: 1, marginHorizontal: moderateScale(20), alignItems: 'center', }}>

        <Text style={styles.headerStyle}>Welcome</Text>
        <Text style={{ fontSize: textScale(22), color: colors.whiteColor, marginTop: moderateScale(15) }}>Crud Operation Task</Text>
        <Text style={styles.descStyle}>We are happy to see. You can login to continue</Text>

        <View style={{ marginTop: moderateScale(150) }}>
          <TextInputComp
            value={email}
            placeholder={'Enter Email'}
            onChangeText={(value: string) => setEmail(value)}
            keyboardType='email-address'
          />
          <TextInputComp
            value={password}
            placeholder={'Enter Password'}
            onChangeText={(value: string) => setPassword(value)}
            secureTextEntry={secureText}
            secureText={secureText ? 'Show' : 'Hide'}
            onPressSecure={() => { setSecureText(!secureText) }}

          />
          <ButtonComp onPress={() => { onSubmit() }} text='Login' style={{ width: moderateScale(340), }} isLoading={useLoginByEmailMutation?.isPending} disabled={useLoginByEmailMutation?.isPending} />
        </View>

      </View>

    </Container>
  )
}

export default Login

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    color: colors.whiteColor,
    marginTop: moderateScale(70)

  },
  descStyle: {
    fontSize: textScale(12),
    marginTop: moderateScaleVertical(8),
    color: colors.whiteColor,
  }
})