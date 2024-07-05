
import { fetcher } from '../utiles/fetcher';

class AuthService {

  queryKeys = {
    loginByPassword: 'loginByPassword',
    loginOtpVerify: 'loginOtpVerify',

  };

  loginByPassword = async (data: any) => {

    return fetcher({
      url: '/admin/login',
      method: 'POST',
      data
    });

  }

  loginOtpVerify = async (data: any) => {
console.log({data});

    return fetcher({
      url: '/admin/verify_otp',
      method: 'POST',
      data
    });

  }



}

export default new AuthService();