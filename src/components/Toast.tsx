import { useEffect, useState } from "react";
import "./Toast.css";

export type ToastTone = "info" | "success" | "error";

export interface ToastProps {
  tone?: ToastTone;
  message: string;
  durationMs?: number;
  onDismiss?: () => void;
}

export function Toast({
  tone = "info",
  message,
  durationMs = 3000,
  onDismiss,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onDismiss]);

  return (
    <div
      role="status"
      className={`toast toast--${tone} ${visible ? "toast--in" : "toast--out"}`}
    >
      {message}
    </div>
  );
}
