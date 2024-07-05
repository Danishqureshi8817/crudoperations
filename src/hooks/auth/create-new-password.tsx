import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import authService from '../../services/auth-service';
import { showError } from '../../utiles/helpers';

export default function useForgetPasswordCreateNewPassword() {

  return useMutation({
    mutationFn: authService.forgetPasswordCreateNewPassword,
    onError: (error: any) => {
      showError('Something went wrong while Create new Password')
console.log(error);

    },
  });

}