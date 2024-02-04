import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Notes } from "../../screens/Notes";
import { Tasks } from "../../screens/Tasks";
import { NoteScreens } from "../screensNames/Notes";

const { Navigator, Screen } = createNativeStackNavigator();

export const NotesNavigator = () => {
  return (
    <Navigator
      initialRouteName={NoteScreens.NOTES}
      screenOptions={{ headerShown: false }}
    >
      <Screen name={NoteScreens.NOTES} component={Notes} />
      <Screen name={NoteScreens.TASKS} component={Tasks} />
    </Navigator>
  );
};
