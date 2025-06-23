import { Text } from 'ink';
import { useMemo } from 'react';

interface ScrollBarProps {
	offset: number;
	length: number;
	itemCount: number;
}

export default function ScrollBar({
	offset,
	length,
	itemCount,
}: ScrollBarProps) {
	const scrollTextMemo = useMemo(() => {
		const elements = [];

		const scrollPct = (offset / (itemCount - length + 1)) * 100;
		const scrollPos = Math.floor((scrollPct / 100) * (length + 1));

		for (let i = 0; i < length; i += 1) {
			elements.push(i === scrollPos ? '█' : '│');
		}

		return elements.join('\n');
	}, [offset, length, itemCount]);

	return <Text>{scrollTextMemo}</Text>;
}
