import axios from 'axios';

// قراءة الروابط من متغيرات بيئة Vercel
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
<<<<<<< HEAD
  // إرسال الملف تحت مفتاح 'file' كما يتوقع السيرفر
=======
  // إرسال الملف تحت مفتاح 'file' كما يتوقع السيرفر غالباً
>>>>>>> c7c1e4b7d74fa5f4bfd9ad421d2d739af0be36f4
  formData.append('file', audioBlob, 'recording.wav');

  // طباعة الرابط للتأكد من صحة العنوان والمنفذ في المتصفح
  console.log("Full Request URL:", `${AI_API_URL}/audio/analyze`);

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
    
    // سطر الفحص الأهم: يطبع لك البيانات الخام القادمة من السيرفر في الـ Console
    console.log("البيانات القادمة من السيرفر:", data);

    // التحقق من وجود حقل mistakes أو استخدام مصفوفات فارغة كبديل
    const mistakes = data.mistakes || { missing: [], extra: [], replaced: [] };
    
    // حساب مجموع الأخطاء المكتشفة
    const totalMistakes = 
      (mistakes.missing?.length || 0) + 
      (mistakes.extra?.length || 0) + 
      (mistakes.replaced?.length || 0);
    
    // معادلة حساب نسبة الدقة بناءً على الأخطاء
    const accuracy = Math.max(0, Math.min(100, ((20 - totalMistakes) / 20) * 100));
    
    // تحديد النصيحة التعليمية بناءً على الأداء
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
    throw new Error('فشل الاتصال بسيرفر الذكاء الاصطناعي. تأكد من استجابة السيرفر.');
  }
};

export const fetchSessionNotes = async (): Promise<SessionNote[]> => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching session notes:', error);
    // بيانات تجريبية في حال عدم توفر سيرفر الملاحظات
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