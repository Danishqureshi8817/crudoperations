
import { fetcher } from '../utiles/fetcher';

class AuthService {

  queryKeys = {
    loginByPassword: 'loginByPassword',
    loginOtpVerify: 'loginOtpVerify',
    forgetPasswordEmailVerify : 'forgetPasswordEmailVerify',
    forgetPasswordCreateNewPassword: 'forgetPasswordCreateNewPassword',
    forgetPasswordverifyEmailOtp : 'forgetPasswordverifyEmailOtp',

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

  
  forgetPasswordEmailVerify = async (data: any) => {
console.log(data);

    return fetcher({
      url: '/admin/verify_email',
      method: 'POST',
      data
    });

  }

  
  forgetPasswordverifyEmailOtp = async (data: any) => {

    return fetcher({
      url: '/admin/verify_email_otp',
      method: 'POST',
      data
    });

  }

  
  forgetPasswordCreateNewPassword = async (data: any) => {

    return fetcher({
      url: '/admin/create_verify_email_password',
      method: 'POST',
      data
    });

  }



}

export default new AuthService();