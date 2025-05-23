'use client';

import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';

export interface INode {
  id: number;
  label: string;
}

export interface IEdge {
  from: number;
  to: number;
}

export interface IGraphData {
  nodes: INode[];
  edges: IEdge[];
}

const GraphView = ({ data }: { data: IGraphData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

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
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
    />
  );
};

export default GraphView;
