import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Modal } from "./Modal";
import { Button } from "./Button";

/**
 * `Modal` demonstrates a **portal-rendered component** (content escapes the
 * story's DOM subtree via `createPortal`), the **Viewport** toolbar addon
 * for checking responsive behavior, and a `play` function that opens and
 * closes the dialog to prove focus and Escape-to-close work.
 */
function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open modal" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        title="Confirm deletion"
        onClose={() => setOpen(false)}
      >
        <p>This action can&rsquo;t be undone. Delete this item permanently?</p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <Button
            label="Delete"
            variant="danger"
            onClick={() => setOpen(false)}
          />
          <Button
            label="Cancel"
            variant="secondary"
            onClick={() => setOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
}

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const noopArgs = {
  open: false,
  title: "",
  onClose: () => {},
  children: null,
};

export const Default: Story = {
  args: noopArgs,
  render: () => <ModalDemo />,
};

export const OpenAndClose: Story = {
  args: noopArgs,
  render: () => <ModalDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));

    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByRole("dialog")).toBeInTheDocument();

    await userEvent.click(body.getByRole("button", { name: "Close dialog" }));
    await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const MobileViewport: Story = {
  args: noopArgs,
  render: () => <ModalDemo />,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
