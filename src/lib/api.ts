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
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    const data = response.data;
    console.log("تم استلام البيانات وتحويلها:", data);

    const mistakes: MistakeResult = {
      missing: [],
      extra: [],
      replaced: []
    };

    // هذا الجزء هو "المحرك" الجديد الذي يقرأ مصفوفة ayahs التي أظهرها الكونسول
    if (data.ayahs && Array.isArray(data.ayahs)) {
      data.ayahs.forEach((item: any) => {
        // إذا كان السيرفر يقول أن هناك عدم تطابق في الآية
        if (item.heard_normalized !== item.reference) {
          mistakes.replaced.push({
            expected: item.reference, // النص الصحيح للآية
            got: item.heard_raw       // ما نطقته سارة
          });
        }
      });
    }

    // نستخدم الأرقام القادمة من رغد مباشرة (75 أو 100 أو غيره)
    return {
      mistakes,
      accuracy: data.overall_accuracy !== undefined ? data.overall_accuracy : 0,
      recommendation: data.recommendation || "استمر في المحاولة",
      totalMistakes: mistakes.replaced.length
    };

  } catch (error) {
    console.error('Error analyzing audio:', error);
    throw new Error('فشل الاتصال بسيرفر الذكاء الاصطناعي.');
  }
};

export const fetchSessionNotes = async () => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes`);
    return response.data;
  } catch (error) {
    // في حال عدم توفر الباك إند الخاص بالملاحظات
    return [{ id: '1', date: '2026-01-16', surah: 'الناس', accuracy: 75, notes: 'أداء جيد جداً' }];
  }
};