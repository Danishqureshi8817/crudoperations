import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import authService from '../../services/auth-service';
import { showError, showSucess } from '../../utiles/helpers';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import navigationStrings from '../../navigation/navigationStrings';

export default function useForgetPasswordEmailVerify() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return useMutation({
    mutationFn: authService.forgetPasswordEmailVerify,
    onError: (error: any) => {
      showError('Something went wrong while Forget Password')

    }
  });

}