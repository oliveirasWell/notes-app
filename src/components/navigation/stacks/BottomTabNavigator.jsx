import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { NotesNavigator } from "./NotesNavigator";

const { Navigator, Screen } = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Navigator initialRouteName="Notes" screenOptions={{ headerShown: false }}>
      <Screen name="Notes" component={NotesNavigator} />
    </Navigator>
  );
};
