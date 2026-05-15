import { Input } from "@/components/atoms/Input";

type FormFieldProps = {
  label: string;
  id: string;
  error?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
};

export function FormField({
  label,
  id,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}: FormFieldProps) {
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <Input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </label>
  );
}
