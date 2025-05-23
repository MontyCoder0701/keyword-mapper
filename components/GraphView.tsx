'use client';

import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';

const GraphView = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = [
      { id: 1, label: '컴퓨터 네트워크' },
      { id: 2, label: 'TCP/IP' },
      { id: 3, label: '3-way handshake' },
      { id: 4, label: 'OSI 7계층' },
    ];

    const edges = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 1, to: 4 },
    ];

    const data = { nodes, edges };
    const options = {
      autoResize: true,
      nodes: {
        shape: 'dot',
        size: 20,
        font: { size: 16 },
        color: {
          background: '#97C2FC',
          border: '#2B7CE9',
        },
      },
      edges: {
        width: 2,
        color: { color: '#848484' },
        arrows: { to: { enabled: true, scaleFactor: 0.5 } },
      },
      layout: {
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
        },
      },
      physics: {
        enabled: false,
      },
    };

    new Network(containerRef.current, data, options);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
    />
  );
};

export default GraphView;
