import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { GenericListScreen } from "@/components/shared/GenericListScreen/GenericListScreen";

describe("<GenericListScreen />", () => {
  const mockList = [
    { name: "Item 1", active: false },
    { name: "Item 2", active: true },
  ];

  const defaultProps = {
    list: mockList,
    headerTitle: "Test Header",
    removeItem: jest.fn(),
    editItem: jest.fn(),
    toggleActiveItem: jest.fn(),
    showActiveToggle: true,
    onSubmitNewItem: jest.fn(),
    addNewItemTitle: "Add New Item",
    showBackButton: true,
  };

  it("renders correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <GenericListScreen {...defaultProps} />
      </NavigationContainer>,
    );
    expect(getByText("Test Header")).toBeTruthy();
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
    expect(getByText("Add New Item")).toBeTruthy();
  });

  it("calls editItem on press", () => {
    const { getByText } = render(
      <NavigationContainer>
        <GenericListScreen {...defaultProps} />
      </NavigationContainer>,
    );
    fireEvent.press(getByText("Item 1"));
    expect(defaultProps.editItem).toHaveBeenCalledWith(0);
  });

  it("matches snapshot", () => {
    const tree = render(
      <NavigationContainer>
        <GenericListScreen {...defaultProps} />
      </NavigationContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
