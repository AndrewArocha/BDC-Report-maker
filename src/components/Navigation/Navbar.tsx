// src/components/Navigation/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import eveoSymbol from '../../assets/logo/eveo-symbol.svg';

type Page = 'hub' | 'reports' | 'insights' | 'settings';

interface NavbarProps {
  setPage: (page: Page) => void;
  activePage: Page | string;
}

interface NavItemConfig {
  id: Page;
  label: string;
  tag?: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItemConfig[] = [
  {
    id: 'hub',
    label: 'Hub',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 'insights',
    label: 'Insights',
    tag: 'AI',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function Navbar({ setPage, activePage }: NavbarProps) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    // Detectamos el scroll en el contenedor principal (<main>)
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer) return;

    let lastScrollY = scrollContainer.scrollTop;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      // Si el usuario baja más de 30px, ocultamos la barra. Si sube, la mostramos.
      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollY = currentScrollY;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP FLOATING PILL (Vertical chip en el centro)        */}
      {/* ============================================================ */}
      {/* Ahora es position: fixed, pegado a la izquierda, centrado verticalmente */}
      <aside className="hidden md:flex flex-col items-center justify-between py-6 px-3 fixed left-4 top-1/2 -translate-y-1/2 h-max min-h-125 w-20 bg-white/70 dark:bg-[#070b11]/80 backdrop-blur-xl border border-gray-200/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-[2.5rem] z-50 transition-colors">

        {/* Brand mark */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-sm">
            <img src={eveoSymbol} alt="Eveo" className="w-6 h-6 dark:invert-0 invert drop-shadow-sm" />
          </div>
        </div>

        {/* Center Icons Rail */}
        <nav className="flex flex-col items-center gap-4 flex-1 justify-center">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                title={item.label}
                className={`
                  relative w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group outline-none
                  focus-visible:ring-2 focus-visible:ring-orange-500
                  ${isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-700 dark:hover:text-white'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopNavActive"
                    className="absolute inset-0 bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 rounded-2xl shadow-[0_0_15px_rgba(249,115,22,0.12)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-center">
                  {item.icon(isActive)}
                </div>

                {item.tag && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-[#070b11] z-20" />
                )}

                <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs font-bold tracking-wide opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap z-50">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions: Theme & Avatar */}
        <div className="flex flex-col items-center gap-5">
          <ThemeToggle />
          <button
            title="Andres H. - BDC Manager"
            className="w-10 h-10 rounded-full ring-2 ring-orange-500/30 overflow-hidden outline-none focus-visible:ring-orange-500 hover:scale-105 transition-transform shadow-md"
          >
            <div className="w-full h-full bg-linear-to-tr from-gray-400 to-gray-600 dark:from-zinc-700 dark:to-zinc-500" />
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* 2. MOBILE SCROLLING CHIP BAR (Se oculta al hacer scroll)     */}
      {/* ============================================================ */}
      {/* Envolvemos la barra móvil en un motion.div que reacciona a isScrollingDown */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{
            y: isScrollingDown ? 100 : 0,
            opacity: isScrollingDown ? 0.3 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="md:hidden fixed bottom-5 inset-x-0 flex justify-center px-4 z-50 pointer-events-none"
      >
        <nav
          aria-label="Mobile Navigation"
          // pointer-events-auto reactiva los clicks incluso dentro de un contenedor bloqueado
          className="pointer-events-auto flex items-center gap-1 p-2 rounded-full bg-white/85 dark:bg-[#070b11]/90 backdrop-blur-2xl border border-gray-200/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-w-sm w-full justify-between"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                // Si la barra está oculta/transparente, quitamos el foco para evitar clicks fantasma
                tabIndex={isScrollingDown ? -1 : 0}
                className={`
                  relative flex flex-col items-center justify-center flex-1 py-1.5 rounded-full transition-all outline-none
                  ${isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileNavActive"
                    className="absolute inset-0 bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    {item.icon(isActive)}
                    {item.tag && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                  <span className="text-[10px] font-medium tracking-tight mt-0.5">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}

          <button
            onClick={() => setPage('settings')}
            tabIndex={isScrollingDown ? -1 : 0}
            className="flex flex-col items-center justify-center flex-1 py-1.5 outline-none text-gray-400"
          >
            <div className={`w-6 h-6 rounded-full border ${activePage === 'settings' ? 'border-orange-500 ring-2 ring-orange-500/30' : 'border-gray-300 dark:border-zinc-700'} overflow-hidden`}>
              <div className="w-full h-full bg-linear-to-tr from-gray-400 to-gray-600 dark:from-zinc-700 dark:to-zinc-500" />
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5">
              Account
            </span>
          </button>
        </nav>
      </motion.div>
    </>
  );
}