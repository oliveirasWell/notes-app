import React from "react";
import renderer from "react-test-renderer";

import { CircleCheckBox } from "@/components/shared/GenericListScreen/Circle";

describe("<CircleCheckBox />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <CircleCheckBox
          active={undefined}
          onPress={undefined}
          size={undefined}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
