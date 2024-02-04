import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Notes } from "../../screens/Notes";
import { Tasks } from "../../screens/Tasks";

const { Navigator, Screen } = createNativeStackNavigator();

export const NotesNavigator = () => {
  return (
    <Navigator initialRouteName="Notes" screenOptions={{ headerShown: false }}>
      <Screen name="Notes" component={Notes} />
      <Screen name="Tasks" component={Tasks} />
    </Navigator>
  );
};
