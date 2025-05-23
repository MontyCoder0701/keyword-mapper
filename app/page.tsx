import GraphView from '@/components/GraphView';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">개념 연결형 학습맵</h1>
      <GraphView />
    </main>
  );
}
