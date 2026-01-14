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
import LiquidEther from './components/LiquidEther'; // تأكد من إنشاء هذا الملف أولاً

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* بداية التعديل: الحاوية الرئيسية */}
      <div className="relative min-h-screen">
        
        {/* طبقة الخلفية المتحركة - تبقى ثابتة في الخلف */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <LiquidEther
            colors={['#FDE68A', '#F97316', '#FB923C']} 
            mouseForce={15}
            cursorSize={80}
            resolution={0.4}
            autoDemo={true}
          />
        </div>

        {/* طبقة محتوى الموقع - الروابط والصفحات */}
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
      {/* نهاية التعديل */}
      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;