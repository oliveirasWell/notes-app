import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { palette } from "@/theme/palette";

const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const CircleCheckBox = ({ active, onPress, size }) => {
  const activeColor = palette.primary[500];
  const inactiveColor = palette.global.white;

  const circleStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: active ? activeColor : inactiveColor,
    borderColor: !active && palette.global.black,
    borderWidth: !active && 1,
  };

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.circle, circleStyle]} />
    </Pressable>
  );
};
