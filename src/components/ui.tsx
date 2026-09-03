import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function Field({
  label,
  value,
  wide,
}: {
  label: string;
  value?: ReactNode;
  wide?: boolean;
}) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className={wide ? "field field-wide" : "field"}>
      <span className="field-label">{label}</span>
      <span className="field-value">{value}</span>
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="empty">{children}</p>;
}

export function Table<T extends object>({
  rows,
  columns,
}: {
  rows: T[];
  columns: { header: string; render: (row: T) => ReactNode }[];
}) {
  if (rows.length === 0) return null;
  return (
    <div className="card-list">
      {rows.map((row, i) => (
        <div className="row-card" key={i}>
          {rows.length > 1 && <span className="row-card-index">#{i + 1}</span>}
          <div className="field-grid">
            {columns.map((c) => (
              <Field key={c.header} label={c.header} value={c.render(row)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
