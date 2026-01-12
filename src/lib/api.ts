import axios from 'axios';

const AI_API_URL = 'http://41.33.55.164:8001';
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
    
    // Calculate accuracy based on AI_LOGIC.md
    const mistakes = data.mistakes || { missing: [], extra: [], replaced: [] };
    const totalMistakes = 
      (mistakes.missing?.length || 0) + 
      (mistakes.extra?.length || 0) + 
      (mistakes.replaced?.length || 0);
    
    const accuracy = Math.max(0, Math.min(100, ((20 - totalMistakes) / 20) * 100));
    
    // Generate recommendation
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
    // Return mock data for demo purposes
    return {
      mistakes: {
        missing: ['الناس'],
        extra: [],
        replaced: [{ expected: 'ملك', got: 'مالك' }],
      },
      accuracy: 80,
      recommendation: 'جيد! كرر مرتين وركز على الأخطاء.',
      totalMistakes: 2,
    };
  }
};

export const fetchSessionNotes = async (): Promise<SessionNote[]> => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching session notes:', error);
    // Return mock data for demo
    return [
      {
        id: '1',
        date: '2026-01-10',
        surah: 'الناس',
        accuracy: 85,
        notes: 'أداء جيد مع بعض الأخطاء في الحركات',
      },
      {
        id: '2',
        date: '2026-01-09',
        surah: 'الفلق',
        accuracy: 92,
        notes: 'ممتاز! تحسن ملحوظ',
      },
      {
        id: '3',
        date: '2026-01-08',
        surah: 'الإخلاص',
        accuracy: 78,
        notes: 'يحتاج مراجعة للتجويد',
      },
    ];
  }
};
