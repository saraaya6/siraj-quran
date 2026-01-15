import axios from 'axios';

// استخدام متغيرات البيئة لإخفاء عنوان IP الحقيقي ومنع كشفه في الكود المصدري
const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const NOTES_API_URL = 'http://localhost:5000';

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
    // إرسال الطلب إلى السيرفر المشفر في ملف البيئة
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
    
    // حساب الدقة بناءً على الأخطاء الواردة من السيرفر
    const mistakes = data.mistakes || { missing: [], extra: [], replaced: [] };
    const totalMistakes = 
      (mistakes.missing?.length || 0) + 
      (mistakes.extra?.length || 0) + 
      (mistakes.replaced?.length || 0);
    
    // معادلة حساب نسبة الدقة
    const accuracy = Math.max(0, Math.min(100, ((20 - totalMistakes) / 20) * 100));
    
    // تحديد النصيحة التعليمية بناءً على مستوى الأداء
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
    // في حال فشل الاتصال، يتم تسجيل الخطأ الحقيقي وإبلاغ المستخدم بدلاً من عرض بيانات وهمية
    console.error('Error analyzing audio:', error);
    throw new Error('فشل الاتصال بسيرفر الذكاء الاصطناعي. تأكد من تشغيل السيرفر وصحة عنوان IP.');
  }
};

export const fetchSessionNotes = async (): Promise<SessionNote[]> => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching session notes:', error);
    // تم الإبقاء على البيانات التجريبية هنا فقط لعرض واجهة ركن الوالدين حال عدم توفر باك إند محلي
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