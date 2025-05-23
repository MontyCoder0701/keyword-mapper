import GraphView from "@/components/GraphView";
import { getGraphData } from "@/lib/GetGraphData";

export default async function Home() {
  const data = await getGraphData("컴퓨터 네트워크");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">개념 연결형 학습맵</h1>
      <GraphView data={data} />
    </main>
  );
}

