import "./DataTable.css";

export interface Column<T> {
  key: keyof T;
  header: string;
}

export interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  loading = false,
  emptyMessage = "No results.",
}: DataTableProps<T>) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className="data-table__status">
              Loading&hellip;
            </td>
          </tr>
        ) : rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="data-table__status">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={String(column.key)}>{String(row[column.key])}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
