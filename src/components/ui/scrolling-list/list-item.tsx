import { Text, useInput } from 'ink';

interface ListItemProps {
  label: string;
  description?: string;
  isSelected: boolean;
}

export default function ListItem({
  label,
  description,
  isSelected,
}: ListItemProps) {
  return (
    <Text
      wrap="truncate-end"
      bold={isSelected}
      color={isSelected ? 'blueBright' : undefined}
    >
      {isSelected ? '►' : '•'} {label}{' '}
      {isSelected && description && `- ${description}`}
    </Text>
  );
}
