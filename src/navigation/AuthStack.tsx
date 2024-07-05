import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import navigationStrings from "./navigationStrings";
import Login from "../screens/Login";
import Home from "../screens/Home";
import OtpVerification from "../screens/OtpVerification";

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.OTPVERIFY}
        component={OtpVerification}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>
  );
}