import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import authService from '../../services/auth-service';
import { showError } from '../../utiles/helpers';

export default function useLoginOtpVerify() {

  return useMutation({
    mutationFn: authService.loginOtpVerify,
    onError: (error: any) => {
      showError('Something went wrong while otp Verify')
      console.log(error);
      
    },
  });

}