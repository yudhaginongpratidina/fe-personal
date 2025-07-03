'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100 rounded-full opacity-50"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-50 rounded-full opacity-60"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-100 rounded-full opacity-30"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Dots loader */}
                <div className="flex justify-center items-center space-x-3 mb-12">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: ['#000', '#333', '#666'][i] }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        />
                    ))}
                </div>

                {/* Ring loader */}
                <div className="relative mb-12">
                    <div className="w-24 h-24 border-4 border-gray-200 rounded-full mx-auto" />
                    <motion.div
                        className="absolute top-0 left-1/2 w-24 h-24 border-4 border-transparent border-t-black rounded-full"
                        style={{ transform: 'translateX(-50%)' }}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    />
                </div>

                {/* Text */}
                <motion.h2
                    className="text-4xl font-bold text-black mb-2"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    Loading
                </motion.h2>
                <p className="text-gray-600 text-lg font-medium">
                    Preparing something amazing for you...
                </p>

                {/* Progress bar */}
                <div className="mt-10 w-80 mx-auto">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-2 bg-black rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                        />
                    </div>
                </div>

                {/* Floating particles */}
                {[...Array(6)].map((_, idx) => (
                    <motion.div
                        key={idx}
                        className="absolute w-1.5 h-1.5 bg-black rounded-full opacity-40"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0.4, 0, 0.4], y: [-5, 5, -5] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: idx * 0.3,
                        }}
                        style={{
                            top: `${20 + idx * 8}%`,
                            left: `${10 + idx * 10}%`,
                        }}
                    />
                ))}

                {/* Geometric elements */}
                <motion.div
                    className="absolute top-1/5 left-1/2 w-16 h-16 border-2 border-gray-300 rounded-full"
                    style={{ transform: 'translateX(-50%)' }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                />
                <motion.div
                    className="absolute bottom-1/5 left-1/2 w-8 h-8 border border-gray-400 rotate-45"
                    style={{ transform: 'translateX(-50%)' }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                />

                {/* Pulsing circles */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-32 h-32 border border-gray-200 rounded-full"
                    style={{ transform: 'translate(-50%, -50%)' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-48 h-48 border border-gray-100 rounded-full"
                    style={{ transform: 'translate(-50%, -50%)' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.02, 0.1] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                />
            </div>
        </div>
    );
}
