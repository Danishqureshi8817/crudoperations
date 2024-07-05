import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import navigationStrings from "./navigationStrings";
import Home from "../screens/Home";
import EditProduct from "../screens/EditProduct";
import ShowProduct from "../screens/ShowProduct";
import CreateNewPassword from "../screens/CreateNewPassword";
import Login from "../screens/Login";
import OtpVerification from "../screens/OtpVerification";
import ForgetPassword from "../screens/ForgetPassword";
import { AuthContext } from "../utiles/authContext";


const Stack = createNativeStackNavigator();

export default function () {

  const authContext: any = React.useContext(AuthContext);

  return (

    <Stack.Navigator initialRouteName={authContext?.authState?.accessToken !== null ? navigationStrings.HOME : navigationStrings.LOGIN}>
      {authContext?.authState?.accessToken === null && <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />}
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name={navigationStrings.OTPVERIFY}
        component={OtpVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ForgetPassword}
        component={ForgetPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={navigationStrings.EDIT}
        component={EditProduct}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name={navigationStrings.ShowProduct}
        component={ShowProduct}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name={navigationStrings.CreateNewPassword}
        component={CreateNewPassword}
        options={{ headerShown: false }}

      />

    </Stack.Navigator>
  );
}