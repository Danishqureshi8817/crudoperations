import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'

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
import useForgetPasswordCreateNewPassword from '../hooks/auth/create-new-password'
import { AuthContext } from '../utiles/authContext'

const CreateNewPassword = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authContext: any = useContext(AuthContext);
  const route = useRoute()
  const { useremail }: any = route.params

  // states
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  // api call
  const useForgetPasswordCreateNewPasswordMutation = useForgetPasswordCreateNewPassword()

  const onSubmit = () => {
    // navigation.navigate(navigationStrings.OTPVERIFY,{useremail:email})
    if (password === '') {
      showError('please enter New password')

    } else if (cpassword === '') {
      showError('please enter confirm password')
    }else {
      const payload = {
        email: useremail,
        password : password,
        confirmPassword : cpassword

      }
      console.log(payload);
      
      useForgetPasswordCreateNewPasswordMutation.mutate(payload,
        {
          onSuccess:(data)=>{
        
              navigation.navigate(navigationStrings.HOME)
              showSucess('Password Changed Successfully')
            
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
        <Text style={styles.descStyle}>Create New Password</Text>

        <View style={{ marginTop: moderateScale(150) }}>
          <TextInputComp
            value={password}
            placeholder={'Enter New Password'}
            onChangeText={(value: string) => setPassword(value)}
          />
             <TextInputComp
            value={cpassword}
            placeholder={'Enter Confirm Password'}
            onChangeText={(value: string) => setCPassword(value)}
          />

          <ButtonComp onPress={() => { onSubmit() }} text='Create New Password' style={{ width: moderateScale(340), }} isLoading={useForgetPasswordCreateNewPasswordMutation?.isPending} disabled={useForgetPasswordCreateNewPasswordMutation?.isPending} />
        </View>

      </View>

    </Container>
  )
}

export default CreateNewPassword

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