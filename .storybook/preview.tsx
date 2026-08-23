import type { Decorator, Preview } from "@storybook/react-vite";

/**
 * Global theme toggle: adds `data-theme="light" | "dark"` to a wrapper div
 * around every story, driven by a toolbar control. `ThemedCard` is the
 * component built to respond to it — see `src/components/ThemedCard.css`.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light";
  return (
    <div data-theme={theme} style={{ padding: "1rem" }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    backgrounds: {
      options: {
        light: { name: "Light", value: "#ffffff" },
        dark: { name: "Dark", value: "#0f172a" },
      },
    },
  },

  globalTypes: {
    theme: {
      description: "Global theme for components that read data-theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "light",
  },

  decorators: [withTheme],
};

export default preview;
