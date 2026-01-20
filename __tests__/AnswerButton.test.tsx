import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AnswerButton } from "../src/components/AnswerButton";

// Mock images
jest.mock("../src/constants/images", () => ({
  ICONS: {
    checkmarkGreen: { uri: "checkmark" },
    close: { uri: "close" },
  },
}));

describe("AnswerButton Component", () => {
  it("renders correctly with default state", () => {
    const { getByText } = render(
      <AnswerButton text="Test Answer" state="default" onPress={() => {}} />,
    );
    expect(getByText("Test Answer")).toBeTruthy();
  });

  it("calls onPress when clicked", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AnswerButton text="Click Me" state="default" onPress={onPressMock} />,
    );

    fireEvent.press(getByText("Click Me"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AnswerButton text="Disabled" state="disabled" onPress={onPressMock} />,
    );

    // Note: opacity might handle touchable disabled state
    fireEvent.press(getByText("Disabled"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders null when hidden", () => {
    const { queryByText } = render(
      <AnswerButton text="Hidden" state="hidden" onPress={() => {}} />,
    );
    expect(queryByText("Hidden")).toBeNull();
  });
});
