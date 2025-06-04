import { Select } from '@mantine/core';

interface FilterSelectProps {
  label: string;
  placeholder: string;
  data: { value: string; label: string; }[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export const FilterSelect = ({
  label,
  placeholder,
  data,
  value,
  onChange
}: FilterSelectProps) => (
  <Select
    label={label}
    placeholder={placeholder}
    data={data}
    value={value}
    onChange={onChange}
    clearable
  />
); 