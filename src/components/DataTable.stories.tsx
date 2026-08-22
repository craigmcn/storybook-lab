import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  role: string;
}

const UserTable = DataTable<User>;

const columns: Column<User>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];

const users: User[] = [
  { id: 1, name: "Ada Lovelace", role: "Engineer" },
  { id: 2, name: "Grace Hopper", role: "Engineer" },
  { id: 3, name: "Margaret Hamilton", role: "Director" },
];

function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(users), 800));
}

/**
 * `DataTable` demonstrates Storybook's **`loaders`** API: `WithAsyncData`
 * fetches its rows before the story renders, so you see the resolved data
 * immediately rather than authoring a fetch inside the component itself.
 * Compare that to the `Loading` and `Empty` stories, which just pass props
 * directly — two different ways to represent the same kind of state.
 */
const meta = {
  title: "Components/DataTable",
  component: UserTable,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { columns, rows: users },
};

export const Loading: Story = {
  args: { columns, rows: [], loading: true },
};

export const Empty: Story = {
  args: { columns, rows: [], emptyMessage: "No users match this filter." },
};

export const WithAsyncData: Story = {
  args: { columns, rows: [] },
  loaders: [
    async () => ({
      rows: await fetchUsers(),
    }),
  ],
  render: (args, { loaded }) => (
    <UserTable columns={args.columns} rows={loaded.rows as User[]} />
  ),
};
