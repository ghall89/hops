import { Box, measureElement, useInput } from 'ink';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import ScrollBar from './scroll-bar';

interface ScrollingListProps<T> {
  isActive: boolean;
  renderItem: (props: T) => React.ReactNode;
  items: T[];
}

export default function ScrollingList<T>({
  isActive,
  renderItem: RenderItem,
  items,
}: ScrollingListProps<T>) {
  const boxRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_input, key) => {
    if (!isActive) return;

    if (key.downArrow) {
      if (selectedIndex < items.length - 1) {
        setSelectedIndex((prev) => prev + 1);
      } else {
        setSelectedIndex(0);
      }
    }
    if (key.upArrow) {
      if (selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
      } else {
        setSelectedIndex(items.length - 1);
      }
    }
  });

  useEffect(() => {
    const newOffset = selectedIndex;

    if (newOffset <= items.length - boxHeight) {
      setOffset(newOffset);
    } else {
      setOffset(items.length - boxHeight);
    }
  }, [items.length, boxHeight, selectedIndex]);

  useEffect(() => {
    const { height } = measureElement(boxRef.current);
    setBoxHeight(height);
  }, []);

  const visibleRowsMemo = useMemo(() => {
    const startIndex = offset;
    const endIndex = offset + boxHeight;

    return items.slice(startIndex, endIndex);
  }, [items, offset, boxHeight]);

  return (
    <Box
      flexDirection="row"
      height="100%"
      width="100%"
      justifyContent="space-between"
    >
      <Box flexDirection="column" ref={boxRef} height="100%">
        {visibleRowsMemo.map((props, index) => (
          <RenderItem
            key={index}
            isSelected={items[selectedIndex] === props}
            {...props}
          />
        ))}
      </Box>
      <ScrollBar offset={offset} length={boxHeight} itemCount={items.length} />
    </Box>
  );
}
