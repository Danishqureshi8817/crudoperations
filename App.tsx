
import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from "react-native-flash-message";

import Routes from './src/navigation'
import { textScale } from './src/styles/responsiveSize';
import { AuthProvider } from './src/utiles/authContext';
import { queryClient } from './src/utiles/helpers';


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
        <FlashMessage
          position={'top'}
          titleStyle={{
            fontSize: textScale(14)
          }}
        />
      </AuthProvider>

    </QueryClientProvider>
  )
}

export default App