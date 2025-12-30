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
    console.error("GEMINI_API_KEY is not set in environment variables");
    throw new Error("GEMINI_API_KEY is not configured on server");
  }

  const prompt = `
    You are a world-class color theorist and poet. 
    Analyze the following color and provide insights in ${
      locale === "ja" ? "Japanese" : "English"
    }.
    
    Color HEX: ${hex}
    Color Name: ${colorName}
    
    Provide the result in the following JSON format:
    {
      "psychology": "Detailed psychological meaning and emotional impact of this color (max 150 characters).",
      "culture": "Cultural, historical, or symbolic background of this color (max 150 characters).",
      "story": "A very short, poetic story or atmosphere inspired by this specific color (max 150 characters)."
    }
    
    The tone should be sophisticated, minimal, and premium. Avoid generic descriptions.
    IMPORTANT: Return ONLY the JSON object. Do not include markdown formatting or code blocks.
  `;

  // List of candidate models based on official documentation (as of late 2025)
  // Prioritizing newer stable models while keeping older ones as fallbacks
  const candidateModels = [
    "gemini-2.5-flash", // Best balance, stable
    "gemini-2.5-pro", // Higher quality, stable
    "gemini-1.5-flash", // Previous standard (fallback)
    "gemini-pro", // Legacy fallback
  ];

  let lastError: unknown = null;
  const genAI = new GoogleGenerativeAI(apiKey);

  for (const modelName of candidateModels) {
    try {
      // Intentionally avoiding responseMimeType: "application/json" to maximize compatibility across models
      const model = genAI.getGenerativeModel({ model: modelName });

      console.log(`[Gemini] Attempting to generate with model: ${modelName}`);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Clean up potential markdown code blocks provided by Gemini
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        return JSON.parse(text) as ColorInsight;
      } catch {
        console.warn(
          `[Gemini] Failed to parse JSON from ${modelName}. Response: ${text.substring(
            0,
            50
          )}...`
        );
        // Use text as error message or retry
        throw new Error("Invalid JSON response");
      }
    } catch (error) {
      // Log warning but continue to next model
      // 404 Not Found means model doesn't exist or isn't accessible
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.warn(`[Gemini] Failed with model ${modelName}:`, errorMessage);
      lastError = error;
    }
  }

  // If we exhaust all models
  console.error("[Gemini] All models failed.");
  throw lastError || new Error("All Gemini models failed to generate content");
}
