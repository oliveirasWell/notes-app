import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";

import { GenericListScreen } from "../shared/GenericListScreen/GenericListScreen";

import { NotesContext } from "@/services/Notes/constants";

export const Tasks = () => {
  const {
    params: { index },
  } = useRoute();

  const { notes, toggleActiveItem, addTaskToNote, removeTaskFromNote } =
    useContext(NotesContext);

  const headerTitle = notes[index].name;
  const addNewItemTitle = "Add New Task";

  return (
    <GenericListScreen
      list={notes[index].tasks}
      showBackButton
      showActiveToggle
      onSubmitNewItem={addTaskToNote}
      headerTitle={headerTitle}
      removeItem={removeTaskFromNote}
      editItem={undefined}
      toggleActiveItem={toggleActiveItem}
      addNewItemTitle={addNewItemTitle}
      parentIndex={index}
    />
  );
};
