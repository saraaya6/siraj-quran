import axios from 'axios';

const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const NOTES_API_URL = import.meta.env.VITE_NOTES_API_URL;

export interface MistakeResult {
  missing: string[];
  extra: string[];
  replaced: { expected: string; got: string }[];
}

export interface AnalysisResult {
  mistakes: MistakeResult;
  accuracy: number;
  recommendation: string;
  totalMistakes: number;
}

export interface SessionNote {
  id: string;
  date: string;
  surah: string;
  accuracy: number;
  notes: string;
}

export const analyzeAudio = async (
  audioBlob: Blob,
  surah: string = 'An-Nas',
  language: string = 'ar'
): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');

  try {
    const response = await axios.post(
      `${AI_API_URL}/audio/analyze?surah=${encodeURIComponent(surah)}&language=${encodeURIComponent(language)}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data = response.data;
    console.log("البيانات المستلمة:", data);

    // 1. استخراج الأخطاء من حقل ayahs إذا وجد، أو نضع مصفوفات فارغة
    // ملاحظة: السيرفر حالياً لا يرسل تفاصيل الأخطاء بشكل صريح في mistakes
    const mistakes: MistakeResult = data.mistakes || {
      missing: [],
      extra: [],
      replaced: []
    };

    // 2. استخدام الدقة المرسلة مباشرة من السيرفر
    // إذا كانت overall_accuracy موجودة نستخدمها، وإلا نضع 0
    const accuracy = data.overall_accuracy !== undefined ? data.overall_accuracy : 0;

    // 3. استخدام التوصية المرسلة من السيرفر
    const recommendation = data.recommendation || "استمر في المحاولة!";

    // 4. حساب عدد الأخطاء (سيكون 0 حالياً لأن السيرفر لا يرسل تفاصيل mistakes)
    const totalMistakes = 
      (mistakes.missing?.length || 0) + 
      (mistakes.extra?.length || 0) + 
      (mistakes.replaced?.length || 0);

    return {
      mistakes,
      accuracy,
      recommendation,
      totalMistakes,
    };
  } catch (error) {
    console.error('Error analyzing audio:', error);
    throw new Error('فشل الاتصال بسيرفر الذكاء الاصطناعي.');
  }
};

export const fetchSessionNotes = async (): Promise<SessionNote[]> => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes`);
    return response.data;
  } catch (error) {
    return [
      {
        id: '1',
        date: '2026-01-10',
        surah: 'الناس',
        accuracy: 85,
        notes: 'أداء جيد مع بعض الأخطاء في الحركات',
      }
    ];
  }
};