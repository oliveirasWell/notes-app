import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

const screenHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.global.white,
    padding: spacing.large,
    flexDirection: "column",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.primary[100],
    padding: spacing.large,
  },
  headerContainer: { flex: 1, alignItems: "center" },
  headerText: {
    color: palette.primary[500],
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Inter-Bold",
  },
  backButton: { textAlign: "right" },
});

export const ScreenHeader = ({ title, showBackButton }) => {
  const navigation = useNavigation();

  return (
    <View style={screenHeaderStyles.header}>
      {showBackButton && (
        <Pressable onPress={navigation.goBack}>
          <Text style={screenHeaderStyles.backButton}>Back</Text>
        </Pressable>
      )}
      <View style={screenHeaderStyles.headerContainer}>
        <Text style={screenHeaderStyles.headerText}>{title}</Text>
      </View>
    </View>
  );
};
