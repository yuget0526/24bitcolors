import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ColorInsight {
  psychology: string;
  culture: string;
  story: string;
}

/**
 * Generate deep insights for a color using Gemini API
 */
export async function generateColorInsight(
  hex: string,
  colorName: string,
  locale: string = "ja"
): Promise<ColorInsight | null> {
  const apiKey = process.env.GEMINI_API_KEY || "";

  if (!apiKey) {
    console.warn(
      "[Gemini API] GEMINI_API_KEY is missing in environment variables."
    );
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const prompt = `
      You are a world-class color theorist and poet. 
      Analyze the following color and provide insights in ${
        locale === "ja" ? "Japanese" : "English"
      }.
      
      Color HEX: ${hex}
      Color Name: ${colorName}
      
      Provide the result STICTLY in the following JSON format:
      {
        "psychology": "Detailed psychological meaning (max 150 characters).",
        "culture": "Cultural, historical, or symbolic background (max 150 characters).",
        "story": "A very short, poetic story or atmosphere (max 150 characters)."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(`[Gemini API] Raw response length: ${text.length}`);

    // Robust JSON extraction: Find the first '{' and the last '}'
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error(
        "[Gemini API] Failed to find JSON object in response:",
        text
      );
      return null;
    }

    try {
      const parsed = JSON.parse(jsonMatch[0]);
      // Verify structure
      if (parsed.psychology && parsed.culture && parsed.story) {
        return parsed as ColorInsight;
      } else {
        console.error(
          "[Gemini API] Parsed JSON has invalid structure:",
          parsed
        );
        return null;
      }
    } catch (parseError) {
      console.error(
        "[Gemini API] JSON Parse Error. Raw matched text:",
        jsonMatch[0]
      );
      return null;
    }
  } catch (error: any) {
    console.error(
      "[Gemini API] Fatal Connection or API Error:",
      error.message || error
    );
    return null;
  }
}
