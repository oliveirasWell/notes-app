import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer } from "react";

import { NOTES_KEY } from "./NOTES_KEY";

const INITIAL_STATE = {
  notes: [],
};

const actionStorageWrapper = (state) => {
  AsyncStorage.setItem(NOTES_KEY, JSON.stringify(state));

  return state;
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return actionStorageWrapper({
        ...state,
        notes: [
          ...state.notes,
          { ...action.payload, index: state.notes.length, tasks: [] },
        ],
      });
    case "REMOVE_NOTE":
      return actionStorageWrapper({
        ...state,
        notes: state.notes.filter((_, index) => index !== action.payload) || [],
      });
    case "TOGGLE_ACTIVE":
      return actionStorageWrapper({
        ...state,
        notes: state.notes.map((note, noteIndex) => {
          const { index, parentIndex } = action.payload;

          if (noteIndex !== parentIndex) return note;

          return {
            ...note,
            tasks:
              note.tasks.map((task, taskIndex) =>
                taskIndex !== index ? task : { ...task, active: !task.active },
              ) || [],
          };
        }),
      });
    case "ADD_TASK":
      return actionStorageWrapper({
        ...state,
        notes: state.notes.map((note, noteIndex) => {
          const { parentIndex } = action.payload;

          if (noteIndex !== parentIndex) return note;

          return {
            ...note,
            tasks: [
              ...note.tasks,
              { index: note.tasks.length, parentIndex, ...action.payload.task },
            ],
          };
        }),
      });
    case "REMOVE_TASK":
      return actionStorageWrapper({
        ...state,
        notes: state.notes.map((note, noteIndex) => {
          const { index, parentIndex } = action.payload;

          if (noteIndex !== parentIndex) return note;

          return {
            ...note,
            tasks:
              note.tasks.filter((_, taskIndex) => taskIndex !== index) || [],
          };
        }),
      });
    case "UPDATE_STORAGE":
      return { ...action.payload };
    default:
      return state;
  }
};

const NotesContext = createContext({});

const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, INITIAL_STATE);

  const updateStorage = (newNotes) => {
    dispatch({ type: "UPDATE_STORAGE", payload: newNotes });
  };

  const onSubmitNewItem = (newItem) => {
    dispatch({ type: "ADD_NOTE", payload: newItem });
  };

  const removeItem = (index) => {
    dispatch({ type: "REMOVE_NOTE", payload: index });
  };

  const toggleActiveItem = (parentIndex, index) => {
    dispatch({ type: "TOGGLE_ACTIVE", payload: { parentIndex, index } });
  };

  const addTaskToNote = ({ name, parentIndex }) => {
    dispatch({
      type: "ADD_TASK",
      payload: { parentIndex, task: { name } },
    });
  };

  const removeTaskFromNote = (index, parentIndex) => {
    dispatch({ type: "REMOVE_TASK", payload: { index, parentIndex } });
  };

  useEffect(() => {
    const updateStorageAsync = async () => {
      const value = await AsyncStorage.getItem(NOTES_KEY);

      if (value !== null) {
        updateStorage(JSON.parse(value));
      }
    };
    updateStorageAsync();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        onSubmitNewItem,
        removeItem,
        toggleActiveItem,
        addTaskToNote,
        removeTaskFromNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export { NotesProvider, NotesContext };
