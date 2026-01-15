import axios from 'axios';

// عند استخدام Proxy في Vercel، نقوم بالاتصال بمسار محلي يبدأ بـ /api
// وVercel سيقوم بتحويله تلقائياً للسيرفر الخارجي (41.33.55.164:8001)
const AI_API_PROXY_URL = '/api/analyze'; 
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

  // سنطبع الآن المسار المحلي المتصل بالبروكسي
  console.log("Connecting to AI via Vercel Proxy at:", AI_API_PROXY_URL);

  try {
    // نرسل الطلب إلى المسار المحلي المذكور في vercel.json
    const response = await axios.post(
      `${AI_API_PROXY_URL}?surah=${encodeURIComponent(surah)}&language=${encodeURIComponent(language)}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data = response.data;
    const mistakes = data.mistakes || { missing: [], extra: [], replaced: [] };
    const totalMistakes = 
      (mistakes.missing?.length || 0) + 
      (mistakes.extra?.length || 0) + 
      (mistakes.replaced?.length || 0);
    
    const accuracy = Math.max(0, Math.min(100, ((20 - totalMistakes) / 20) * 100));
    
    let recommendation: string;
    if (accuracy >= 90) {
      recommendation = 'ممتاز! كرر مرة واحدة للتعزيز.';
    } else if (accuracy >= 70) {
      recommendation = 'جيد! كرر مرتين وركز على الأخطاء.';
    } else {
      recommendation = 'تحتاج للتدريب. قسّم السورة وكرر آية بآية.';
    }

    return {
      mistakes,
      accuracy,
      recommendation,
      totalMistakes,
    };
  } catch (error: any) {
    console.error('Error analyzing audio:', error);
    // تنبيه بسيط: إذا ظهر خطأ 504، فهذا يعني أن سيرفر الذكاء الاصطناعي استغرق وقتاً طويلاً في الرد
    throw new Error('فشل التحليل. تأكد من استجابة السيرفر الخارجي.');
  }
};

export const fetchSessionNotes = async (): Promise<SessionNote[]> => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching session notes:', error);
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