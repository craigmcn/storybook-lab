import type { ReactNode } from "react";
import "./ThemedCard.css";

export interface ThemedCardProps {
  title: string;
  children: ReactNode;
}

export function ThemedCard({ title, children }: ThemedCardProps) {
  return (
    <div className="themed-card">
      <h3>{title}</h3>
      <div className="themed-card__body">{children}</div>
    </div>
  );
}
