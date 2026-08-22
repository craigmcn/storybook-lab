import { useId, useState } from "react";
import "./TextField.css";

export interface TextFieldProps {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  helpText?: string;
  validate?: (value: string) => string | undefined;
}

export function TextField({
  label,
  defaultValue = "",
  placeholder,
  helpText,
  validate,
}: TextFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;

  const error = touched ? validate?.(value) : undefined;

  return (
    <div className="text-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => setValue(event.target.value)}
        onBlur={() => setTouched(true)}
        className={error ? "has-error" : undefined}
      />
      {error ? (
        <p id={errorId} className="error-text" role="alert">
          {error}
        </p>
      ) : (
        helpText && <p className="help-text">{helpText}</p>
      )}
    </div>
  );
}
