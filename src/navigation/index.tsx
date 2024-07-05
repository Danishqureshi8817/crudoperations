import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { AuthContext } from '../utiles/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes() {

  const authContext: any = React.useContext(AuthContext);
 console.log(authContext, 'auth');

  return (
    <NavigationContainer >


      {authContext?.authState?.accessToken !== null ? <MainStack /> : <AuthStack />}

    </NavigationContainer>
  );
}