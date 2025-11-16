/**
 * Welcome Screen - Первый экран приветствия при регистрации
 * Дизайн: темный фон с неоновым зеленым акцентом
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '../contexts/TelegramContext';

const WelcomeScreen = ({ onGetStarted }) => {
  const { hapticFeedback } = useTelegram();

  const handleGetStarted = () => {
    if (hapticFeedback) {
      hapticFeedback('impact', 'medium');
    }
    onGetStarted();
  };

  return (
    <div className="h-screen min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-between px-6 py-12 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-[#A3F7BF]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-40 h-40 bg-[#A3F7BF]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md z-10">
        {/* Let's go logo */}
        <motion.div
          className="w-full mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img 
            src="/letsgo.png"
            alt="Let's go"
            className="w-full h-auto object-contain"
            style={{ maxHeight: '200px' }}
          />
        </motion.div>

        {/* Main heading with RUDN badge */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
            Manage your{' '}
            <span className="relative inline-block mx-2" style={{ display: 'inline-block', position: 'relative' }}>
              <span 
                className="relative z-10 px-3 py-1 text-[#A3F7BF] font-bold"
                style={{ 
                  textShadow: '0 0 20px rgba(163, 247, 191, 0.5)',
                  fontSize: '1.1em'
                }}
              >
                RUDN
              </span>
              <img 
                src="/elipse.svg"
                alt=""
                className="absolute"
                style={{ 
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1.6)',
                  width: '110px',
                  height: '65px',
                  filter: 'drop-shadow(0 0 15px rgba(163, 247, 191, 0.5))',
                  opacity: 0.9
                }}
              />
            </span>
            {' '}schedule
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-white/70 text-base sm:text-lg text-center max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Store and view your schedule on your phone
        </motion.p>
      </div>

      {/* Get Started Button */}
      <motion.button
        onClick={handleGetStarted}
        className="relative w-full max-w-sm bg-[#A3F7BF] text-black font-semibold text-lg py-4 rounded-full shadow-lg overflow-hidden z-10"
        style={{
          boxShadow: '0 10px 30px rgba(163, 247, 191, 0.4), 0 0 20px rgba(163, 247, 191, 0.3)'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
        />
        <span className="relative z-10">Get Started</span>
      </motion.button>
    </div>
  );
};

export default WelcomeScreen;
