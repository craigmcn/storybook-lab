# Storybook Lab

A component playground for exploring Storybook's features hands-on — no
production app constraints, just enough surface area to try things out.

Six components, each built to exercise a different Storybook capability:
args/controls, the actions addon, interaction testing (`play` functions),
a custom global toolbar control for theming, portals + the viewport addon,
the `loaders` API for async data, and CSS animation. See
`src/Introduction.mdx` (rendered as the Storybook "Introduction" page) for
the full breakdown.

## Development

```bash
yarn install
yarn storybook   # Storybook dev server → http://localhost:6006
yarn dev         # the (minimal) host app → http://localhost:3160
```

## Scripts

- `yarn storybook` — start the Storybook dev server
- `yarn build-storybook` — static Storybook build → `storybook-static/`
- `yarn dev` — start the host app's dev server
- `yarn build` — type-check and build the host app for production
- `yarn test` — run tests in watch mode (unit tests plus every story, via
  the Vitest addon)
- `yarn test:coverage` — run tests once with coverage
- `yarn test:e2e` — Playwright e2e tests against the host app
- `yarn lint` — lint `src`, `e2e`, `.storybook`
- `yarn format` / `yarn format:check` — Prettier
