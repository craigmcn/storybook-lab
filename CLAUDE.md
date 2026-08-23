# storybook-lab

A component playground for exploring Storybook's features — not a product,
a testbed. Built with React 19, Vite 8, TypeScript 6 (strict), Storybook 10.

## Commands

```bash
yarn storybook       # Storybook dev server (http://localhost:6006)
yarn build-storybook # static Storybook build → storybook-static/
yarn dev             # host app dev server (http://localhost:3160)
yarn build           # tsc -b + production build of the host app → dist/
yarn build:netlify   # dual build: netlify/ (root) + netlify/storybook-lab/ (GH Pages)
yarn test            # vitest watch mode — runs unit tests AND every story
yarn test:coverage   # vitest run --coverage
yarn test:e2e        # Playwright headless E2E (run `yarn playwright install` once first)
yarn lint            # ESLint (src, e2e, .storybook)
yarn format:check    # Prettier check
```

## Architecture

- **The host app** (`src/App.tsx`) has no real UI of its own — it's a
  one-line landing page linking to the Storybook dev server. It exists only
  so the project has a `yarn build`/`yarn dev`/Playwright story consistent
  with the rest of the standard stack; the actual content lives in
  Storybook.
- **Components** (`src/components/`) — six deliberately chosen to each
  demonstrate a different Storybook capability:
  - `Button` — args as controls, the actions addon (`fn()` from
    `storybook/test`), `tags: ["autodocs"]`.
  - `TextField` — interaction testing: the `Invalid` story's `play`
    function types into the field, blurs it, and asserts on the rendered
    error via `storybook/test`'s `userEvent`/`expect`/`within`.
  - `ThemedCard` — a custom `globalTypes` toolbar control (`theme`, in
    `.storybook/preview.tsx`) wired through a decorator that sets
    `data-theme` on a wrapper div; `ThemedCard.css` reads that attribute.
    Independent of (and composable with) the built-in Backgrounds addon.
  - `Modal` — a `createPortal`-rendered dialog (content escapes the
    story's DOM subtree, so interaction-test queries in
    `Modal.stories.tsx` search `canvasElement.ownerDocument.body`, not
    the canvas itself), the Viewport addon (`MobileViewport` story), and
    Escape-to-close/focus-on-open behavior.
  - `DataTable` — a generic component (`DataTable<T>`); its story file
    binds the generic via a `const UserTable = DataTable<User>` alias
    before building `meta`, since TS can't infer `Meta<typeof DataTable>`
    against an unbound generic. `WithAsyncData` demonstrates Storybook's
    `loaders` API (fetch-before-render) versus `Loading`/`Empty`, which
    just pass props directly.
  - `Toast` — CSS `@keyframes` animation and a `role="status"` live
    region, useful for trying the a11y addon and Storybook's
    measure/outline tools.
- **`src/Introduction.mdx`** — a hand-authored MDX docs page (vs. the
  `autodocs`-generated pages on every component), rendered as the
  Storybook sidebar's "Introduction" entry. Update it if the component set
  changes.
- **Theming**: only `ThemedCard` has a manual light/dark toggle (via the
  toolbar global, not `prefers-color-scheme` — deliberately, to
  demonstrate `globalTypes` + decorators rather than duplicate the
  `prefers-color-scheme` pattern already covering the CSS-only approach
  used elsewhere in `~/Web/` repos).
- **Vitest addon**: `@storybook/addon-vitest` runs every `.stories.tsx`
  file as a Vitest test (via `vite.config.ts`'s `test.projects` — a
  `unit` project for `*.test.tsx` and a `storybook` project, backed by a
  real Chromium instance through `@vitest/browser-playwright`, for the
  stories). `yarn test` runs both projects.
- `vite.config.ts` is largely Storybook-init-generated boilerplate
  (including the `test.projects` split) — left as generated rather
  than hand-simplified, so future `storybook upgrade` runs diff
  cleanly against it. The one deviation: `dirname` uses
  `import.meta.dirname` instead of the generated `__dirname`
  fallback, since Storybook's native Vite config loader warns on
  `__dirname` usage (`configLoader: 'native'`).

## Notes

- Uses `.node-version` (not `.nvmrc`) — the toolchain standard is `mise`.
- No Font Awesome / external CSS framework — this repo doesn't have a UI
  worth theming beyond the components themselves.
- **Typeface & palette**: the base font is the `system-ui` stack (no
  webfont load) set on `:root` in `src/index.css`. Color tokens
  (`--color-primary`, `--color-success`, `--color-danger`, and a
  `--color-neutral-*` slate scale) are also defined on `:root` there;
  every component CSS file reads from these instead of hardcoding hex
  values, including `ThemedCard`'s local `--card-*` custom properties,
  which alias the neutral scale for its light/dark variants.
