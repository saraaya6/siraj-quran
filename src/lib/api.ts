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
    console.log("البيانات النهائية من السيرفر:", data);

    const mistakes: MistakeResult = {
      missing: [],
      extra: [],
      replaced: []
    };

    // تحويل بيانات الآيات إلى أخطاء واضحة للواجهة
    if (data.ayahs && Array.isArray(data.ayahs)) {
      data.ayahs.forEach((item: any) => {
        // إذا كان السيرفر أرسل نصاً مسموعاً مختلفاً عن الأصل
        if (item.heard_normalized && item.heard_normalized !== item.reference) {
          mistakes.replaced.push({
            expected: item.reference,
            got: item.heard_raw
          });
        } 
        // حالة خاصة: إذا السيرفر أعطى دقة 0 ولم يرسل نصاً (مثل آخر كونسول أرسلتيه)
        else if (data.overall_accuracy < 50 && item.heard_raw === '') {
          mistakes.missing.push(`آية رقم ${item.ayah}: لم يتم التعرف على القراءة`);
        }
      });
    }

    // هنا تكمن القوة: نأخذ الرقم من السيرفر مباشرة مهما كان
    const finalAccuracy = typeof data.overall_accuracy === 'number' ? data.overall_accuracy : 0;

    return {
      mistakes,
      accuracy: finalAccuracy,
      recommendation: data.recommendation || "جرب القراءة مرة أخرى بوضوح",
      totalMistakes: mistakes.replaced.length + mistakes.missing.length
    };

  } catch (error) {
    console.error('Error:', error);
    throw new Error('حدث خطأ في الاتصال بالسيرفر');
  }
};