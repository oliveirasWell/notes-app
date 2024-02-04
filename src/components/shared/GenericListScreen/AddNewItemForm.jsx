import React from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";

import { ScreenHeader } from "./ScreenHeader";

import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

const itemFormStyles = StyleSheet.create({
  inputLabel: {
    color: palette.global.black,
    marginBottom: 5,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: "left",
  },
  inputErrorLabel: {
    color: palette.error[500],
    marginBottom: 5,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: "left",
  },
  inputField: {
    padding: 10,
    borderRadius: 8,
    borderColor: palette.neutral[300],
    borderWidth: 1,
    color: palette.neutral[600],
  },
  label: { paddingTop: spacing.medium, flexDirection: "row" },
  addButtonContainer: {
    marginTop: 5 * spacing.large,
  },
  addButton: {
    width: "100%",
    borderRadius: 30,
    backgroundColor: palette.primary[500],
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  addButtonText: {
    textAlign: "center",
    color: palette.global.white,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 19,
    letterSpacing: 0,
  },
});

export const AddNewItemForm = ({ onSubmit, formTitle, parentIndex }) => {
  const [value, onChangeText] = React.useState("");
  const onPress = () => {
    onSubmit({ name: value, parentIndex });
    onChangeText("");
  };

  return (
    <View>
      <ScreenHeader title={formTitle} showBackButton={false} />
      <View>
        <View style={itemFormStyles.label}>
          <Text style={itemFormStyles.inputLabel}>Name</Text>
          <Text style={itemFormStyles.inputErrorLabel}>*</Text>
        </View>
        <TextInput
          editable
          numberOfLines={1}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          style={itemFormStyles.inputField}
          placeholder="New Name"
        />
      </View>

      <View style={itemFormStyles.addButtonContainer}>
        <Pressable onPress={onPress} disabled={!value}>
          <View style={itemFormStyles.addButton}>
            <Text style={itemFormStyles.addButtonText}>Add</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
