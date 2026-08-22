import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";

/**
 * `Toast` demonstrates a component driven by **CSS keyframe animation**
 * and a timer — a good candidate for trying Storybook's measure/outline
 * tools and the accessibility addon's live-region checks (it uses
 * `role="status"`).
 */
const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["info", "success", "error"] },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { tone: "info", message: "Saved as draft." },
};

export const Success: Story = {
  args: { tone: "success", message: "Payment received." },
};

export const ErrorTone: Story = {
  name: "Error",
  args: { tone: "error", message: "Could not reach the server." },
};

export const LongLived: Story = {
  args: {
    tone: "info",
    message: "This one sticks around for 10 seconds.",
    durationMs: 10000,
  },
};
