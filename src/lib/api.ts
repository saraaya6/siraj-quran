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
    console.log("البيانات المستلمة من سراج:", data);

    // تجهيز كائن الأخطاء لعرضه في الواجهة
    const mistakes: MistakeResult = {
      missing: [],
      extra: [],
      replaced: []
    };

    // استخراج الكلمات المستبدلة من الآيات التي بها اختلاف
    if (data.ayahs && Array.isArray(data.ayahs)) {
      data.ayahs.forEach((item: any) => {
        if (item.heard_normalized !== item.reference) {
          mistakes.replaced.push({
            expected: item.reference,
            got: item.heard_raw
          });
        }
      });
    }

    // استخدام الدقة المرسلة من السيرفر (75 في مثالك)
    const accuracy = data.overall_accuracy !== undefined ? data.overall_accuracy : 100;

    return {
      mistakes,
      accuracy,
      recommendation: data.recommendation || "جيد! استمر في التمرين.",
      totalMistakes: mistakes.replaced.length + mistakes.missing.length + mistakes.extra.length,
    };
  } catch (error) {
    console.error('Error analyzing audio:', error);
    throw new Error('فشل الاتصال بسيرفر سراج.');
  }
};

export const fetchSessionNotes = async (): Promise<SessionNote[]> => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes`);
    return response.data;
  } catch (error) {
    return [
      { id: '1', date: '2026-01-15', surah: 'الناس', accuracy: 75, notes: 'أداء جيد' }
    ];
  }
};