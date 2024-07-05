import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './MainStack';
import { AuthContext } from '../utiles/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes() {

  return (
    <NavigationContainer >


      {<MainStack />}

    </NavigationContainer>
  );
}