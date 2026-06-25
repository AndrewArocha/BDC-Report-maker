// src/components/StartupAnimation/StartupAnimation.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import eveoSymbol from '../../assets/logo/eveo-symbol.svg';
import eveoText from '../../assets/logo/eveo-text.svg';

const particles = Array.from({ length: 60 }).map((_, index) => ({
    id: index,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.18 + 0.04,
    duration: Math.random() * 8 + 9,
    driftX: (Math.random() - 0.5) * 42,
    driftY: (Math.random() - 0.5) * 55,
}));

interface StartupAnimationProps {
    onComplete: () => void;
}

function StartupAnimation({ onComplete }: StartupAnimationProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <main className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            opacity: particle.opacity,
                            filter: 'blur(0.3px)',
                        }}
                        animate={{
                            x: [0, particle.driftX, -particle.driftX * 0.6, 0],
                            y: [0, particle.driftY, -particle.driftY * 0.4, 0],
                            opacity: [particle.opacity * 0.65, particle.opacity, particle.opacity * 0.75],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            <div className="relative flex flex-col items-center">
                <motion.img
                    src={eveoSymbol}
                    alt="Eveo Symbol"
                    className="w-47 md:w-56"
                    initial={{ y: '160vh', opacity: 0, rotate: -540, scale: 0.75 }}
                    animate={{ y: -90, opacity: 1, rotate: 0, scale: 1 }}
                    transition={{
                        y: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                        rotate: { duration: 1.5, ease: 'easeOut' },
                        opacity: { duration: 0.9, ease: 'easeOut' },
                        scale: { type: 'spring', stiffness: 200, damping: 15, mass: 1, delay: 1.2 },
                    }}
                />

                <motion.div
                    className="relative mt-2 w-125 overflow-visible md:w-150"
                    initial={{ opacity: 0, y: 25, scale: 0.96, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 20, scale: [0.96, 1.03, 1], filter: 'blur(0px)' }}
                    transition={{
                        opacity: { duration: 0.8, delay: 1.7, ease: 'easeOut' },
                        y: { duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] },
                        filter: { duration: 0.7, delay: 1.7 },
                        scale: { duration: 0.55, delay: 1.85, times: [0, 0.65, 1], ease: [0.34, 1.56, 0.64, 1] },
                    }}
                >
                    <img src={eveoText} alt="Eveo Text" className="relative z-10 w-full" />

                    <motion.div
                        className="
                            absolute left-1/2 bottom-1.5 h-14 w-[78%]
                            -translate-x-1/2 rounded-full bg-orange-400/35
                            blur-3xl pointer-events-none z-1
                        "
                        initial={{ opacity: 0, scaleX: 0.5 }}
                        animate={{ opacity: [0, 0.8, 0.18], scaleX: [0.5, 1.2, 1] }}
                        transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                </motion.div>
            </div>
        </main>
    );
}

export default StartupAnimation;