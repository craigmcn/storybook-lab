import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("shows a validation error after a blurred invalid value", async () => {
    const user = userEvent.setup();
    render(
      <TextField
        label="Email address"
        validate={(value) =>
          /\S+@\S+\.\S+/.test(value) ? undefined : "Invalid"
        }
      />,
    );

    await user.type(screen.getByLabelText("Email address"), "nope");
    await user.tab();

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid");
  });

  it("does not show an error before the field is touched", () => {
    render(
      <TextField
        label="Email address"
        validate={() => "Invalid"}
        helpText="Help text"
      />,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Help text")).toBeInTheDocument();
  });
});
