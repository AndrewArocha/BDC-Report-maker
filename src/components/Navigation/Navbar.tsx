// src/components/Navigation/Navbar.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import eveoSymbol from '../../assets/logo/eveo-symbol.svg';

// Define the exact literal types to match App.tsx perfectly
type Page = 'hub' | 'reports' | 'insights' | 'settings';

interface NavbarProps {
  setPage: (page: Page) => void;
  activePage: Page | string;
}

interface NavContentProps {
  activePage: Page | string;
  handleNavClick: (id: Page) => void;
}

// Strictly type the navItems array so the IDs match the Page type
const navItems: { id: Page; label: string; tag?: string }[] = [
  { id: 'hub', label: 'Hub' },
  { id: 'reports', label: 'Reports' },
  { id: 'insights', label: 'Insights', tag: 'AI' },
  { id: 'settings', label: 'Settings' }
];

const NavContent = ({ activePage, handleNavClick }: NavContentProps) => (
  <>
    <div className="flex items-center justify-between mb-12 mt-2">
      <div className="flex items-center gap-3">
          <img src={eveoSymbol} alt="Eveo Logo" className="w-8 h-8 dark:invert-0 invert" />
          <span className="font-bold tracking-widest text-lg text-gray-900 dark:text-white">EVEO</span>
      </div>
      <ThemeToggle />
    </div>

    <nav className="flex flex-col gap-2 flex-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={`
            px-4 py-3 rounded-lg font-medium transition-all text-left flex items-center justify-between
            focus-visible:ring-2 focus-visible:ring-orange-500 outline-none
            ${activePage === item.id
              ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'}
          `}
        >
          {item.label}
          {item.tag && (
            <span className="bg-orange-500 text-white dark:text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
              {item.tag}
            </span>
          )}
        </button>
      ))}
    </nav>

    <div className="pt-6 border-t border-gray-200 dark:border-white/5 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-linear-to-tr from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-500 border border-black/10 dark:border-white/10" />
      <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">Andres H.</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">BDC Manager</p>
      </div>
    </div>
  </>
);

export default function Navbar({ setPage, activePage }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (id: Page) => {
    setPage(id);
    setIsMobileOpen(false); // Close drawer on mobile after selection
  };

  return (
    <>
      {/* Mobile Toggle Button (Visible only on small screens) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-[#0a0f16] border border-gray-200 dark:border-white/10 shadow-lg text-gray-900 dark:text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-[#0a0f16] border-r border-gray-200 dark:border-white/5 flex-col p-6 h-full z-10 relative transition-colors duration-500">
        <NavContent activePage={activePage} handleNavClick={handleNavClick} />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0a0f16] border-r border-gray-200 dark:border-white/5 flex flex-col p-6 z-50 shadow-2xl"
            >
              <NavContent activePage={activePage} handleNavClick={handleNavClick} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}