/**
 * 診断データの保存
 * Supabase に保存
 */
import { supabase, isSupabaseConfigured } from "./supabase";

export interface DiagnosisEntry {
  hex: string;
  hue: number;
  lightness: number;
  chroma: number;
  theme?: string;
  duration_seconds?: number;
  algorithm_version?: string;
  locale?: string;
  anonymous_id: string;
}

/**
 * 診断結果を保存
 */
export async function saveDiagnosis(
  entry: DiagnosisEntry
): Promise<{ success: boolean; id?: string; error?: string }> {
  // Supabaseが設定されていない場合
  if (!isSupabaseConfigured() || !supabase) {
    console.warn("Supabase not configured. Diagnosis not saved.");
    return { success: false, error: "Supabase not configured" };
  }

  try {
    const { data, error } = await supabase
      .from("diagnoses")
      .insert({
        hex: entry.hex,
        hue: entry.hue,
        lightness: entry.lightness,
        chroma: entry.chroma,
        theme: entry.theme || "light",
        duration_seconds: entry.duration_seconds || 0,
        algorithm_version: entry.algorithm_version || "v1.0.0",
        locale: entry.locale || "unknown",
        anonymous_id: entry.anonymous_id,
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        country: "unknown", // Client-side doesn't have geo info
        region: "unknown",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error("Diagnosis save error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
