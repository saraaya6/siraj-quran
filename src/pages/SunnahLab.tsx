import { useState, useEffect } from 'react'; // تأكد من وجود useEffect هنا
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Star, CheckCircle2, XCircle } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import starMascot from '@/assets/star-mascot.png';
import { sunnahLessons } from '@/data/sunnah';

const SunnahLab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  const currentLesson = sunnahLessons[currentIndex];

  // دالة الخلط
  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (currentLesson) {
      // نخلط الخيارات عند كل سؤال جديد لضمان تغير الأماكن
      setShuffledOptions(shuffleArray(currentLesson.options));
    }
  }, [currentIndex]);

  const handleAnswer = (optionId: number) => {
    // نتحقق من معرف الخيار (ID) بدلاً من مسار الصورة لتجنب تضارب الصور المتكررة
    if (optionId === currentLesson.correctId) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < sunnahLessons.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };
if (isFinished) {
    const isZeroScore = score === 0;

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-arabic">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="bg-card p-10 rounded-3xl shadow-playful max-w-md w-full border-t-8 border-transparent"
          style={{ borderColor: isZeroScore ? '#ef4444' : '#10b981' }} // أحمر للفشل وأخضر للنجاح
        >
          <img src={starMascot} className={`w-32 h-32 mx-auto mb-6 ${isZeroScore ? 'grayscale' : ''}`} alt="النتيجة" />
          
          {isZeroScore ? (
            <>
              <h2 className="text-4xl font-bold text-destructive mb-4">حاول مرة أخرى! 🧐</h2>
              <p className="text-2xl mb-6 text-foreground">
                لم تجب على أي سؤال بشكل صحيح. لا بأس، يمكنك التعلم والإعادة!
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-primary mb-4">مبارك! 🌟</h2>
              <p className="text-2xl mb-6 text-foreground">
                لقد أجبت على <span className="text-primary font-bold">{score}</span> من أصل <span className="font-bold">{sunnahLessons.length}</span>
              </p>
            </>
          )}

          <Button 
            onClick={() => window.location.reload()} 
            variant={isZeroScore ? "destructive" : "default"}
            className="w-full text-xl py-6 rounded-2xl mb-4"
          >
            إعادة المحاولة 🔄
          </Button>
          
          <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    );
  }if (isFinished) {
    const isZeroScore = score === 0;

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-arabic">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="bg-card p-10 rounded-3xl shadow-playful max-w-md w-full border-t-8 border-transparent"
          style={{ borderColor: isZeroScore ? '#ef4444' : '#10b981' }} // أحمر للفشل وأخضر للنجاح
        >
          <img src={starMascot} className={`w-32 h-32 mx-auto mb-6 ${isZeroScore ? 'grayscale' : ''}`} alt="النتيجة" />
          
          {isZeroScore ? (
            <>
              <h2 className="text-4xl font-bold text-destructive mb-4">حاول مرة أخرى! 🧐</h2>
              <p className="text-2xl mb-6 text-foreground">
                لم تجب على أي سؤال بشكل صحيح. لا بأس، يمكنك التعلم والإعادة!
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-primary mb-4">مبارك! 🌟</h2>
              <p className="text-2xl mb-6 text-foreground">
                لقد أجبت على <span className="text-primary font-bold">{score}</span> من أصل <span className="font-bold">{sunnahLessons.length}</span>
              </p>
            </>
          )}

          <Button 
            onClick={() => window.location.reload()} 
            variant={isZeroScore ? "destructive" : "default"}
            className="w-full text-xl py-6 rounded-2xl mb-4"
          >
            إعادة المحاولة 🔄
          </Button>
          
          <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 font-arabic text-right" dir="rtl">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-10">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Home className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex items-center gap-3 bg-accent/20 px-6 py-2 rounded-full">
          <Star className="w-5 h-5 text-primary fill-primary" />
          <span className="text-lg font-bold text-primary">قسم السنة النبوية</span>
        </div>
        <div className="text-xl font-bold">{currentIndex + 1} / {sunnahLessons.length}</div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Question Card */}
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-8 shadow-playful text-center mb-10 relative overflow-hidden"
        >
          <p className="text-xl text-muted-foreground mb-4">{currentLesson.prophetSaying}</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-relaxed underline decoration-primary/30 decoration-4">
            "{currentLesson.hadithText}"
          </h2>

          <AnimatePresence>
            {feedback && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`absolute inset-0 flex flex-col items-center justify-center z-10 ${feedback === 'correct' ? 'bg-green-500/90' : 'bg-red-500/90'}`}
              >
                {feedback === 'correct' ? (
                  <><CheckCircle2 className="w-24 h-24 text-white mb-2" /><span className="text-3xl font-bold text-white">بطل! إجابة صحيحة</span></>
                ) : (
                  <><XCircle className="w-24 h-24 text-white mb-2" /><span className="text-3xl font-bold text-white">حاول مرة أخرى</span></>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {shuffledOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(option.id)}
              className="bg-card p-6 rounded-3xl shadow-playful border-4 border-transparent hover:border-primary transition-all group flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-2xl bg-accent/10 mb-4 overflow-hidden flex items-center justify-center">
                <img src={option.image} alt={option.label} className="w-full h-full object-contain p-4" />
              </div>
              <span className="text-2xl font-bold text-foreground group-hover:text-primary">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SunnahLab;