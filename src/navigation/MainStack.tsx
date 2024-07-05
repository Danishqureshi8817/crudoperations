import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import navigationStrings from "./navigationStrings";
import Home from "../screens/Home";
import EditProduct from "../screens/EditProduct";
import ShowProduct from "../screens/ShowProduct";


const Stack = createNativeStackNavigator();

export default function () {

  return (

    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
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

    </Stack.Navigator>
  );
}