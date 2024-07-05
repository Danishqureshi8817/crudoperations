import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import authService from '../../services/auth-service';
import { showError } from '../../utiles/helpers';

export default function useForgetPasswordverifyEmailOtp() {

  return useMutation({
    mutationFn: authService.forgetPasswordverifyEmailOtp,
    onError: (error: any) => {
      showError('Something went wrong while Forget Password Otp Verify')

    },
  });

}