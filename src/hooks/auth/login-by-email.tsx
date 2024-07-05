import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import authService from '../../services/auth-service';
import { showError } from '../../utiles/helpers';

export default function useLoginByEmail() {

  return useMutation({
    mutationFn: authService.loginByPassword,
    onError: (error: any) => {
      showError('Something went wrong while Login')

    },
  });

}