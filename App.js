import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";

import { BottomTabNavigator } from "./src/components/navigation/stacks/BottomTabNavigator";

import { NotesProvider } from "@/services/Notes/NotesProvider";

export default () => {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NotesProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </NotesProvider>
  );
};
