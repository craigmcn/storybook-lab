# Onboarding: exploring Storybook with this lab

This repo isn't a product — it's a hands-on playground for trying out
Storybook's features one at a time. Each of the six components was chosen
to demonstrate a specific capability, so the best way to use this repo is
to open Storybook, pick a component, and go read the story file that goes
with whatever panel or behavior you're curious about.

## 1. Start Storybook

```bash
yarn install
yarn storybook   # → http://localhost:6006
```

The sidebar has an **Introduction** page (rendered from
`src/Introduction.mdx`) with the same component/feature table below, plus
links to the panels described here.

## 2. Walk through each component

For each one, open its stories in the sidebar, then open the story file
listed alongside it — that's where the feature actually lives in code.

| Component    | Try this in the Storybook UI                                                                                                                                                                  | Read this to see how                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `Button`     | Change the **Controls** panel's args (label, variant, size, disabled) and watch the story re-render live. Click the button and check the **Actions** panel for the logged `onClick` call.     | `src/components/Button.stories.tsx`                               |
| `TextField`  | Open the **Invalid** story and switch to the **Interactions** panel — step through the recorded `play` function typing into the field, blurring it, and asserting the error text appears.     | `src/components/TextField.stories.tsx`                            |
| `ThemedCard` | Use the **Theme** toolbar control (top toolbar, paintbrush icon) to flip between light/dark — notice it's independent of the built-in **Backgrounds** panel, which you can toggle separately. | `src/components/ThemedCard.stories.tsx`, `.storybook/preview.tsx` |
| `Modal`      | Open the **MobileViewport** story and switch device sizes in the **Viewport** toolbar. In any Modal story, try Escape to close and tab to confirm focus lands inside the dialog on open.      | `src/components/Modal.stories.tsx`                                |
| `DataTable`  | Compare **Loading**, **Empty**, and **WithAsyncData** — the first two just pass props directly, but `WithAsyncData` uses Storybook's `loaders` API to fetch data _before_ the story renders.  | `src/components/DataTable.stories.tsx`                            |
| `Toast`      | Watch the CSS `@keyframes` slide/fade animation play on mount. Open the **Accessibility** panel and confirm the `role="status"` live region doesn't get flagged.                              | `src/components/Toast.stories.tsx`, `src/components/Toast.css`    |

## 3. Explore the built-in panels

These ship with Storybook core (or `@storybook/addon-a11y`) and apply to
every story, not just the ones above:

- **Controls** — live-editable args, generated from each component's
  TypeScript props.
- **Actions** — logs function args (`fn()` from `storybook/test`) so you
  can see event handlers fire without adding `console.log`.
- **Backgrounds** — swap the canvas background; defined in
  `.storybook/preview.tsx`.
- **Viewport** — resize the canvas to simulate device widths.
- **Accessibility** — runs axe-core against the rendered story; currently
  set to `test: "todo"` (visible in the panel, doesn't fail CI). Flip it
  to `"error"` in `.storybook/preview.tsx` to see it fail a build instead.
- **Interactions** — step through `play` function assertions frame by
  frame; only present on stories that define one (`TextField`, `Modal`).

## 4. Run stories as tests

Every story doubles as a Vitest test via `@storybook/addon-vitest`:

```bash
yarn test            # watch mode — unit tests + every story
yarn test:coverage   # single run with coverage
```

This is the same mechanism CI uses, so a story that breaks in the browser
also fails `yarn test`.

## 5. Where to go next

- Duplicate an existing story file as a starting point for trying a new
  addon or pattern — six working examples means there's almost always
  a close analog to copy from.
- `src/Introduction.mdx` is hand-authored MDX, unlike the
  `tags: ["autodocs"]` pages generated for every component from JSDoc +
  `argTypes`. Compare the two approaches by opening any component's
  autodocs page alongside the Introduction page's source.
- See the root `CLAUDE.md` for the full architecture writeup, including
  why each component was built the way it was.
