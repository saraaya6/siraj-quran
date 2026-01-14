import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Star, BookOpen, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import starMascot from "@/assets/star-mascot.png";
import siraj from "@/assets/siraj.svg";
import childrenGroup from "@/assets/children-group.png";
import { useRef } from "react"; // استيراد useRef

const Landing = () => {
  const navigate = useNavigate();
  // 1. إنشاء مرجع (Reference) لقسم البطاقات
  const cardsSectionRef = useRef<HTMLDivElement>(null);

  // 2. دالة النزول السلس
  const scrollToCards = () => {
    cardsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-primary-dark to-primary overflow-hidden dir-rtl"
      dir="rtl"
    >
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 relative z-50">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center group cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center">
              <img
                src={starMascot}
                alt="أيقونة سراج"
                className="h-12 w-auto z-10 drop-shadow-sm transition-transform group-hover:scale-110"
              />
              <img
                src={siraj}
                alt="سراج"
                className="h-20 w-auto -mr-3 brightness-125 transition-all"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link to="/parent">
              <Button
                variant="ghost"
                className="text-accent/80 hover:text-accent font-cairo"
              >
                <Users className="w-5 h-5 ml-2" />
                ركن الوالدين
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 lg:py-24 relative">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-right space-y-8 z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-2 font-cairo"
            >
              <Sparkles className="w-4 h-4" />
              <span>منصة تعليمية تفاعلية للأطفال</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-cairo">
              <span className="text-accent">سراج</span>
            </h1>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-cairo">
              نور قلوب الصغار بالقرآن
            </h1>

            <p className="text-xl lg:text-2xl text-accent-light/80 max-w-lg ml-auto font-cairo leading-relaxed">
              رحلة ممتعة لتعليم أطفالكم القرآن الكريم والسنة النبوية بأسلوب
              تفاعلي وشيق يناسب عمرهم.
            </p>

            <div className="flex flex-col sm:flex-row-reverse gap-4 justify-start pt-4">
              <Button
                onClick={() => navigate("/learn")}
                size="xl"
                className="bg-accent hover:bg-accent-light text-primary-dark px-10 py-8 text-2xl rounded-2xl shadow-xl transition-all hover:scale-105 font-bold font-cairo"
              >
                <BookOpen className="w-8 h-8 ml-3" />
                ابدأ التعلم
              </Button>
              <Button
                // 3. ربط الدالة بالزر
                onClick={scrollToCards}
                variant="outline"
                size="xl"
                className="border-accent text-accent hover:bg-accent/10 px-10 py-8 text-2xl rounded-2xl font-cairo"
              >
                تعرف على المنصة
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-accent/20 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">٣٠+</div>
                <div className="text-sm text-accent-light/70 font-cairo">سورة قصيرة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">١٠٠+</div>
                <div className="text-sm text-accent-light/70 font-cairo">تمرين تفاعلي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">٥٠٠+</div>
                <div className="text-sm text-accent-light/70 font-cairo">طفل سعيد</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-1/2 flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <motion.img
                src={childrenGroup}
                alt="الأطفال"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-[95%] h-auto z-10 drop-shadow-2xl"
              />
              <motion.img
                src={starMascot}
                alt="سراج"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-5 w-32 md:w-48 h-auto z-20 drop-shadow-xl"
              />
              <div className="absolute inset-0 bg-accent/10 rounded-full blur-[100px] -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. إضافة المرجع (ref) لهذا القسم ليعرف المتصفح أين ينزل */}
      <div 
        ref={cardsSectionRef} 
        className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 py-12"
      >
        <Link to="/learn" className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center cursor-pointer border border-white/20 hover:border-accent/50 transition-all group">
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white font-cairo">حلقات القرآن</h3>
            <p className="text-accent-light/70 font-cairo">سجل تلاوتك وصحح تجويدك مع سراج بأسلوب تفاعلي</p>
          </div>
        </Link>

        <Link to="/sunnah" className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center cursor-pointer border border-white/20 hover:border-accent/50 transition-all group">
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white font-cairo">السنة النبوية</h3>
            <p className="text-accent-light/70 font-cairo">تعلم أحاديث النبي ﷺ بطريقة ممتعة وألعاب شيقة</p>
          </div>
        </Link>

        <Link to="/parent" className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center cursor-pointer border border-white/20 hover:border-accent/50 transition-all group">
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white font-cairo">ركن الوالدين</h3>
            <p className="text-accent-light/70 font-cairo">تابع تقدم طفلك واطلع على التقارير والإنجازات</p>
          </div>
        </Link>
      </div>

      <footer className="container mx-auto px-6 py-12 border-t border-accent/10 mt-20 relative z-10">
        {/* ... بقية الفوتر لم تتغير */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center group cursor-pointer transition-transform hover:scale-105" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="flex items-center">
              <img src={starMascot} alt="أيقونة سراج" className="h-12 w-auto z-10 drop-shadow-md" />
              <img src={siraj} alt="سراج" className="h-16 w-auto -mr-3 brightness-125" />
            </div>
          </div>
          <div className="flex items-center gap-8 font-cairo text-accent-light/70">
            <button onClick={() => navigate("/learn")} className="hover:text-accent transition-colors">حلقات القرآن</button>
            <button onClick={() => navigate("/sunnah")} className="hover:text-accent transition-colors"> السنة النبوية</button>
            <button onClick={() => navigate("/parent")} className="hover:text-accent transition-colors">ركن الوالدين</button>
          </div>
          <div className="text-center md:text-left">
            <p className="text-accent-light/50 text-sm font-cairo">© ٢٠٢٦ سراج - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;