import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Contact from './pages/Contact';
import Offers from './pages/Offers';

// Page Transition wrapper to slide & fade elements gracefully
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  // Enforce scroll reset to top on navigation triggers
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/reservations" element={<PageWrapper><Reservations /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/offers" element={<PageWrapper><Offers /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router basename="/meydani-cafe">
      <div className="min-h-screen flex flex-col justify-between bg-[#141313] text-[#c8c6c5]">
        {/* Spinner Loader overlay */}
        <LoadingScreen />
        
        {/* Top Header sticky */}
        <Navbar />
        
        {/* Dynamic page context */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        
        {/* Footer info panels */}
        <Footer />
        
        {/* Quick action triggers */}
        <WhatsAppFAB />
        <BackToTop />
        
        {/* Notification system */}
        <Toaster 
          position="bottom-left" 
          toastOptions={{ 
            style: { 
              background: '#1e1e1e', 
              color: '#c8c6c5', 
              border: '1px solid #2d2b2b' 
            } 
          }} 
        />
      </div>
    </Router>
  );
}

export default App;
