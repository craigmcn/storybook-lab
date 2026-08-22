import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TextField } from "./TextField";

/**
 * `TextField` demonstrates **interaction testing**: the `Invalid` story's
 * `play` function drives the component like a user (type, blur) and
 * asserts on the result, all runnable from the Interactions panel or via
 * `yarn test` through the Vitest addon.
 */
const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const requireEmail = (value: string) =>
  /\S+@\S+\.\S+/.test(value) ? undefined : "Enter a valid email address";

export const Default: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    helpText: "We'll only use this to send order updates.",
    validate: requireEmail,
  },
};

export const Invalid: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    validate: requireEmail,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email address");

    await userEvent.type(input, "not-an-email");
    await userEvent.tab();

    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Enter a valid email address",
    );
  },
};

export const Prefilled: Story = {
  args: {
    label: "Display name",
    defaultValue: "Ada Lovelace",
  },
};
