// src/App.tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StartupAnimation from './components/StartupAnimation/StartupAnimation';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Navbar from './components/Navigation/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';

export type Page = 'hub' | 'reports' | 'insights' | 'settings';

function App() {
  const [isStartupDone, setIsStartupDone] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('hub');

  return (
    <ThemeProvider>
      <div className="bg-gray-50 dark:bg-[#05080c] transition-colors duration-500 min-h-screen text-gray-900 dark:text-white overflow-hidden font-sans">
        <AnimatePresence mode="wait">
          {!isStartupDone ? (
            <motion.div
              key="startup"
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <StartupAnimation onComplete={() => setIsStartupDone(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex h-screen w-full"
            >
              <Navbar setPage={setCurrentPage} activePage={currentPage} />

              <main className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 dark:bg-[#05080c]">
                {currentPage === 'hub' && <Home />}
                {currentPage === 'reports' && <Reports />}
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;