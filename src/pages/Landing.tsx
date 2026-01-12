import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, BookOpen, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import starMascot from '@/assets/star-mascot.png';
import childrenGroup from '@/assets/children-group.png';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img src={starMascot} alt="سراج" className="w-12 h-12" />
            <span className="text-2xl font-bold text-accent">سراج</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link to="/parent">
              <Button variant="ghost" className="text-accent/80 hover:text-accent">
                <Users className="w-5 h-5 ml-2" />
                ركن الوالدين
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>منصة تعليمية تفاعلية للأطفال</span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-accent">سراج:</span>{' '}
              <br className="hidden lg:block" />
              نور قلوب الصغار
              <br />
              بالقرآن
            </h1>

            <p className="text-lg lg:text-xl text-accent-light/80 mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0">
              رحلة ممتعة لتعليم أطفالكم القرآن الكريم والسنة النبوية 
              بأسلوب تفاعلي وشيق يناسب عمرهم
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/learn">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <BookOpen className="w-6 h-6 ml-2" />
                  ابدأ التعلم
                </Button>
              </Link>
              <Link to="/parent">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  تعرف على المنصة
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-accent/20"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">٣٠+</div>
                <div className="text-sm text-accent-light/70">سورة قصيرة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">١٠٠+</div>
                <div className="text-sm text-accent-light/70">تمرين تفاعلي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">٥٠٠+</div>
                <div className="text-sm text-accent-light/70">طفل سعيد</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Main Mascot */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img 
                src={starMascot} 
                alt="سراج - النجمة المضيئة" 
                className="w-64 h-64 lg:w-80 lg:h-80 mx-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Children Group */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <img 
                src={childrenGroup} 
                alt="أطفال سعداء" 
                className="w-48 lg:w-64 drop-shadow-xl"
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 w-16 h-16 bg-accent/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full blur-xl"
            />

            {/* Floating Stars */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 18}%`,
                }}
              >
                <Star className="w-6 h-6 text-accent fill-accent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: 'تعلم القرآن',
              description: 'سور قصيرة مع التلاوة والتفسير المبسط للأطفال',
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: 'تقييم ذكي',
              description: 'نظام تقييم بالذكاء الاصطناعي لتصحيح التلاوة',
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'متابعة الوالدين',
              description: 'لوحة تحكم لمتابعة تقدم طفلك بسهولة',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-accent-light/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-accent/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={starMascot} alt="سراج" className="w-8 h-8" />
            <span className="text-accent font-bold">سراج</span>
          </div>
          <p className="text-accent-light/60 text-sm">
            © ٢٠٢٦ سراج - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
