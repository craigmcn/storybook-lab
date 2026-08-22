import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemedCard } from "./ThemedCard";

/**
 * `ThemedCard` demonstrates **theming via a global toolbar control**: use
 * the paintbrush icon in the toolbar above to flip between light and dark
 * — wired up as a `globalTypes` entry + decorator in `.storybook/preview.tsx`.
 * Also try the **Backgrounds** addon (the other toolbar icon) independently
 * of the theme toggle to see how the two compose.
 */
const meta = {
  title: "Components/ThemedCard",
  component: ThemedCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Storage plan",
    children: "You're using 12.4GB of your 50GB plan.",
  },
};

export const LongContent: Story = {
  args: {
    title: "Release notes",
    children:
      "This release adds dark mode support across every surface, fixes a memory leak in the sync worker, and improves cold-start time by roughly 30%.",
  },
};
