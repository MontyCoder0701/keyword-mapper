import GraphView, { IGraphData } from '@/components/GraphView';

const data: IGraphData = {
  nodes: [
    { id: 1, label: '컴퓨터 네트워크' },
    { id: 2, label: 'TCP/IP' },
    { id: 3, label: '3-way handshake' },
    { id: 4, label: 'OSI 7계층' },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 1, to: 4 },
  ],
};

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">개념 연결형 학습맵</h1>
      <GraphView data={data}  />
    </main>
  );
}
