import { IGraphData } from "@/components/GraphView";

function extractJson(text: string): string {
  const markdownMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (markdownMatch) {
    return markdownMatch[1];
  }

  const braceStart = text.indexOf("{");
  const braceEnd = text.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd !== -1) {
    return text.substring(braceStart, braceEnd + 1);
  }

  throw new Error("No valid JSON content found in response.");
}

export async function getGraphData(keyword: string): Promise<IGraphData> {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const apiKey = process.env.OPENROUTER_API_KEY;
  const prompt = `
    ${keyword}"에 대한 개념 지도를 아래 JSON 형식으로 생성하세요. 
    개념들은 논리적으로 잘 정리된 소그룹으로 구성되어야 하며, 핵심 개념에서 세부 개념으로 자연스럽게 연결되어야 합니다. 
    중복되거나 불필요한 노드는 포함하지 마세요. 설명 없이 JSON만 출력하고, label은 모두 한국어로 작성하세요.
    약자를 설명하지 마세요.
    {
      "nodes": [ { "id": number, "label": string }, ... ],
      "edges": [ { "from": number, "to": number }, ... ]
    }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Title": "keyword-mapper",
    },
    body: JSON.stringify({
      model: "google/gemma-3n-e4b-it:free",
      messages: [
        {
          role: "user",
          content: prompt.trim(),
        },
      ],
    }),
  });

  const result = await response.json();
  const rawText = result.choices?.[0]?.message?.content ?? "{}";

  try {
    const cleanJson = extractJson(rawText);
    const data: IGraphData = JSON.parse(cleanJson);
    return data;
  } catch (err) {
    console.error("Failed to extract or parse JSON:", err);
    throw new Error("OpenRouter response was not valid JSON");
  }
}
