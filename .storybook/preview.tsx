import { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import "../src/index.css";

/**
 * Global theme toggle: adds `data-theme="light" | "dark"` to a wrapper div
 * around every story, driven by a toolbar control. `src/index.css` reads
 * that attribute to override every component's semantic tokens
 * (--surface, --text, etc.), so this overrides prefers-color-scheme for
 * everything in the canvas. `ThemedCard` additionally reads the raw
 * --color-neutral-* scale directly off the same attribute, as a
 * self-contained demo of a component consuming a custom global — see
 * `src/components/ThemedCard.css`.
 *
 * Also mirrors the attribute onto `document.body`: `Modal` renders via
 * `createPortal(..., document.body)`, so its DOM node is a sibling of this
 * wrapper div, not a descendant — CSS custom-property inheritance wouldn't
 * otherwise reach it.
 */
const WithTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light";

  useEffect(() => {
    document.body.dataset.theme = theme;
    return () => {
      delete document.body.dataset.theme;
    };
  }, [theme]);

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
      description: "Global light/dark theme for the whole canvas",
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

  decorators: [WithTheme],
};

export default preview;
