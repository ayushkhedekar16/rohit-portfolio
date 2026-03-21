import { useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <TooltipProvider>
      <CustomCursor isVideoOpen={isVideoOpen} />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
