import React, { useEffect, useRef } from 'react';

interface ArrowProps {
  startElementId: string;
  endElementId: string;
}

const Arrow: React.FC<ArrowProps> = ({ startElementId, endElementId }) => {
  const startRef = useRef<HTMLElement | null>(null);
  const endRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const startElement = document.getElementById(startElementId);
    const endElement = document.getElementById(endElementId);

    if (startElement && endElement) {
      startRef.current = startElement;
      endRef.current = endElement;
      drawArrow();
    }
  }, [startElementId, endElementId]);

  const drawArrow = () => {
    if (startRef.current && endRef.current) {
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      const d = `M ${startRect.left + startRect.width / 2},${startRect.bottom} `
              + `L ${endRect.left + endRect.width / 2},${endRect.top + endRect.height / 2}`;

      path.setAttribute('d', d);
      path.setAttribute('stroke', '#C6C6C6');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('fill', 'none');

      svg.appendChild(path);
      document.body.appendChild(svg);
    }
  };

  return null;
};

export default Arrow;
