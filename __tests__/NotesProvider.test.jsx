import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, act } from "@testing-library/react-native";
import React from "react";

import { NOTES_KEY } from "@/services/Notes/NOTES_KEY";
import { NotesProvider, NotesContext } from "@/services/Notes/NotesProvider";

describe("NotesProvider", () => {
  const testNote = { name: "Test Note", index: 0, tasks: [] };
  const testTask = { name: "Test Task", index: 0, parentIndex: 0 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds a new note", async () => {
    let submitFunction;
    render(
      <NotesProvider>
        <NotesContext.Consumer>
          {({ onSubmitNewItem }) => {
            submitFunction = onSubmitNewItem;
            return null;
          }}
        </NotesContext.Consumer>
      </NotesProvider>,
    );

    act(() => {
      submitFunction(testNote);
    });

    const newNotes = JSON.stringify({ notes: [testNote] });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(NOTES_KEY, newNotes);
  });

  it("removes a note", async () => {
    let submitFunction;
    let removeItemFunction;
    render(
      <NotesProvider>
        <NotesContext.Consumer>
          {({ onSubmitNewItem, removeItem }) => {
            submitFunction = onSubmitNewItem;
            removeItemFunction = removeItem;
            return null;
          }}
        </NotesContext.Consumer>
      </NotesProvider>,
    );

    act(() => {
      submitFunction(testNote);
      removeItemFunction(0);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      NOTES_KEY,
      JSON.stringify({ notes: [] }),
    );
  });

  it("add a task in a note", async () => {
    let submitFunction;
    let addTaskToNoteFunction;
    render(
      <NotesProvider>
        <NotesContext.Consumer>
          {({ onSubmitNewItem, addTaskToNote }) => {
            submitFunction = onSubmitNewItem;
            addTaskToNoteFunction = addTaskToNote;
            return null;
          }}
        </NotesContext.Consumer>
      </NotesProvider>,
    );

    act(() => {
      submitFunction(testNote);
      addTaskToNoteFunction(testTask);
    });

    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(
      2,
      "@plain_air_NOTES",
      '{"notes":[{"name":"Test Note","index":0,"tasks":[{"index":0,"parentIndex":0,"name":"Test Task"}]}]}',
    );
  });

  it("toggle a task in a note", async () => {
    let submitFunction;
    let addTaskToNoteFunction;
    let toggleTaskFunction;
    render(
      <NotesProvider>
        <NotesContext.Consumer>
          {({ onSubmitNewItem, addTaskToNote, toggleActiveItem }) => {
            submitFunction = onSubmitNewItem;
            addTaskToNoteFunction = addTaskToNote;
            toggleTaskFunction = toggleActiveItem;
            return null;
          }}
        </NotesContext.Consumer>
      </NotesProvider>,
    );

    act(() => {
      submitFunction(testNote);
      addTaskToNoteFunction(testTask);
      toggleTaskFunction(0, 0);
    });

    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(
      3,
      "@plain_air_NOTES",
      '{"notes":[{"name":"Test Note","index":0,"tasks":[{"index":0,"parentIndex":0,"name":"Test Task","active":true}]}]}',
    );
  });

  it("remove a task", async () => {
    let submitFunction;
    let addTaskToNoteFunction;
    let removeTaskFromNoteFunction;
    render(
      <NotesProvider>
        <NotesContext.Consumer>
          {({ onSubmitNewItem, addTaskToNote, removeTaskFromNote }) => {
            submitFunction = onSubmitNewItem;
            addTaskToNoteFunction = addTaskToNote;
            removeTaskFromNoteFunction = removeTaskFromNote;
            return null;
          }}
        </NotesContext.Consumer>
      </NotesProvider>,
    );

    act(() => {
      submitFunction(testNote);
      addTaskToNoteFunction(testTask);
      removeTaskFromNoteFunction(0, 0);
    });

    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(
      3,
      "@plain_air_NOTES",
      '{"notes":[{"name":"Test Note","index":0,"tasks":[]}]}',
    );
  });
});
