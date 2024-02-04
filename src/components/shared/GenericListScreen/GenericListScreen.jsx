import React from "react";
import { StyleSheet, Text, FlatList, View, Pressable } from "react-native";

import { AddNewItemForm } from "./AddNewItemForm";
import { ScreenHeader } from "./ScreenHeader";

import { CircleCheckBox } from "@/components/shared/GenericListScreen/Circle";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.global.white,
    padding: spacing.large,
    flexDirection: "column",
  },
  listItem: {
    padding: spacing.large,
    flexDirection: "row",
    alignContent: "center",
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteNameText: {
    color: palette.global.black,
    fontFamily: "Inter-Bold",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 19,
    letterSpacing: 0,
    alignSelf: "flex-start",
    marginLeft: spacing.medium,
  },
  removeItemText: {
    color: palette.primary[500],
    fontFamily: "Inter-Bold",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16.8,
    letterSpacing: 0,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
  separator: {
    backgroundColor: palette.neutral[300],
    width: "100%",
    height: 1,
  },
  flatList: { flex: 1 },
  label: { paddingTop: spacing.medium, flexDirection: "row" },
});

export const GenericListScreen = ({
  list,
  parentIndex = undefined,
  headerTitle,
  removeItem,
  editItem,
  toggleActiveItem,
  showActiveToggle,
  onSubmitNewItem,
  addNewItemTitle,
  showBackButton,
}) => {
  const renderItem = ({ item, index }) => (
    <Pressable
      onPress={() => {
        if (!editItem) {
          return;
        }

        return editItem(index);
      }}
    >
      <View key={index} style={styles.listItem}>
        {showActiveToggle && (
          <CircleCheckBox
            active={item.active}
            onPress={() => toggleActiveItem(item.parentIndex, index)}
            size={30}
          />
        )}
        <View style={styles.listItemContainer}>
          <Text style={styles.noteNameText} numberOfLines={0}>
            {item.name}
          </Text>
          <Pressable onPress={() => removeItem(index, item.parentIndex)}>
            <Text style={styles.removeItemText} numberOfLines={0}>
              Remove item
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title={headerTitle} showBackButton={showBackButton} />
      <FlatList
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={list}
        renderItem={renderItem}
      />
      <AddNewItemForm
        onSubmit={onSubmitNewItem}
        formTitle={addNewItemTitle}
        parentIndex={parentIndex}
      />
    </View>
  );
};
