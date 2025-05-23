import { IGraphData } from "@/components/GraphView";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getGraphData(keyword: string): Promise<IGraphData> {
  const prompt = `
    Generate a concept map for "${keyword}" in this exact JSON format:
    {
      "nodes": [ { "id": number, "label": string }, ... ],
      "edges": [ { "from": number, "to": number }, ... ]
    }
    Only return a valid JSON object.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });

  const text = response.choices[0].message?.content ?? "{}";

  try {
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("Failed to parse JSON", err);
    throw new Error("OpenAI response was not valid JSON");
  }
}
