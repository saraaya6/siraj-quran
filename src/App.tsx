import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import QuranLab from "./pages/QuranLab";
import ParentCorner from "./pages/ParentCorner";
import NotFound from "./pages/NotFound";
import SunnahLab from "./pages/SunnahLab";

// 1. استيراد المكون الجديد (تأكد من إنشاء ملف LiquidEther.tsx في مجلد components)
import LiquidEther from './components/LiquidEther'; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* 2. الحاوية الرئيسية للموقع لضمان ثبات الخلفية */}
      <div className="relative min-h-screen">
        
        {/* 3. إضافة طبقة الخلفية المتحركة خلف كل شيء (-z-10) */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <LiquidEther
            colors={['#FDE68A', '#F97316', '#FB923C']} // ألوان سراج
            mouseForce={15}
            cursorSize={80}
            resolution={0.4}
            autoDemo={true}
          />
        </div>

        {/* 4. محتوى الموقع الأصلي (الراوتر) في طبقة أعلى (z-10) */}
        <div className="relative z-10">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/learn" element={<QuranLab />} />
              <Route path="/parent" element={<ParentCorner />} />
              <Route path="/sunnah" element={<SunnahLab />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;