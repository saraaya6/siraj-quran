import axios from 'axios';

const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const NOTES_API_URL = import.meta.env.VITE_NOTES_API_URL; // تأكدي من إضافة VITE_ هنا أيضاً

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

  // هذا السطر سيطبع لك الرابط في الـ Console لتتأكدي أنه يذهب للـ IP الصحيح (41.xxx)
  console.log("Connecting to AI Server at:", `${AI_API_URL}/analyze`);

  try {
    const response = await axios.post(
      `${AI_API_URL}/analyze?surah=${encodeURIComponent(surah)}&language=${encodeURIComponent(language)}`,
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
  } catch (error) {
    console.error('Error analyzing audio:', error);
    throw new Error('فشل الاتصال بسيرفر الذكاء الاصطناعي. تأكد من صحة الرابط والـ IP.');
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