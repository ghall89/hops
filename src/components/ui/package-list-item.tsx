import { Text } from 'ink';

export interface PackageListItemProps {
  name: string;
  description?: string;
  isSelected?: boolean;
}

export default function PackageListItem({
  name,
  description,
  isSelected,
}: PackageListItemProps) {
  return (
    <Text
      wrap="truncate-end"
      bold={isSelected}
      color={isSelected ? 'blueBright' : undefined}
    >
      {isSelected ? '►' : '•'} {name}{' '}
      {isSelected && description && `- ${description}`}
    </Text>
  );
}
