import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";

import { NoteScreens } from "../navigation/screensNames/Notes";
import { GenericListScreen } from "../shared/GenericListScreen/GenericListScreen";

import { NotesContext } from "@/services/Notes/NotesProvider";

export const Notes = () => {
  const navigation = useNavigation();
  const { notes, onSubmitNewItem, removeItem } = useContext(NotesContext);

  const onEditItem = (index) => {
    navigation.navigate(NoteScreens.TASKS, { index });
  };

  const headerTitle = "Your Notes";
  const addNewItemTitle = "Add New Note";

  return (
    <GenericListScreen
      list={notes}
      showBackButton={false}
      showActiveToggle={false}
      onSubmitNewItem={onSubmitNewItem}
      headerTitle={headerTitle}
      removeItem={removeItem}
      editItem={onEditItem}
      toggleActiveItem={undefined}
      addNewItemTitle={addNewItemTitle}
    />
  );
};
