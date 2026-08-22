import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

/**
 * `Button` demonstrates the fundamentals: **args as controls**, an
 * **actions**-addon-wired event handler, and autodocs generated from JSDoc
 * on the component + this comment block.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Save changes",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Cancel",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    label: "Delete account",
    variant: "danger",
  },
};

export const Disabled: Story = {
  args: {
    label: "Save changes",
    variant: "primary",
    disabled: true,
  },
};

export const Sizes: Story = {
  args: { label: "Button" },
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Button {...args} size="small" label="Small" />
      <Button {...args} size="medium" label="Medium" />
      <Button {...args} size="large" label="Large" />
    </div>
  ),
};
