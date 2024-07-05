import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from '@tanstack/react-query';
import FlashMessage,{showMessage} from 'react-native-flash-message';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity
    },
    mutations: {
      onError: console.log,
      // onSuccess: console.log,
    },
  },
});


async function setAccessToken(name:string,data:any) {

  await AsyncStorage.setItem(
   name,
   data,
 );


}
async function getAccessToken(name:string) {
 const value = await AsyncStorage.getItem(name);
 return value;



}

async function removeAccessToken(name:string) {
 const token = await AsyncStorage.removeItem(name);
     console.log("Token Removed",name)
 return token;
}


 const showError = (message:string) =>{
  showMessage({
      type: 'danger',
      icon:"danger",
      message,
      duration: 2500
  })
}

 const showSucess = (message:string) =>{
  showMessage({
      type: 'success',
      icon:"success",
      message,
      duration: 2500
  })
}

export { setAccessToken , getAccessToken,removeAccessToken,showError,showSucess , queryClient };