import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { NotesNavigator } from "./NotesNavigator";
import { NoteScreens } from "../screensNames/Notes";

const { Navigator, Screen } = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Navigator
      initialRouteName={NoteScreens.NOTES}
      screenOptions={{ headerShown: false }}
    >
      <Screen name={NoteScreens.NOTES} component={NotesNavigator} />
    </Navigator>
  );
};
