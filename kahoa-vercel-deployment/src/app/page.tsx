'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomePage() {
  const [microWins, setMicroWins] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Dopamine hit tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100 && microWins === 0) {
        setMicroWins(1);
        // Could trigger haptic feedback on mobile here
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [microWins]);

  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section - 3 Second Safety Signal */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Calming particle background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-float-slower"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* vmPFC Activation - Safety before selling */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            You're not broken.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-600 mb-8"
          >
            Your AI tools aren't either.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="text-lg text-gray-500 mb-12"
          >
            Here's what no one tells CTOs about AI...
          </motion.p>

          {/* Dopamine Hit #1 - Instant value */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              setMicroWins(prev => prev + 1);
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            See why in 15 seconds ↓
          </motion.button>
        </div>

        {/* Gentle pulse animation for ADHD engagement */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" className="text-gray-400">
            <path d="M15 20l-7-7h14l-7 7z" fill="currentColor"/>
          </svg>
        </motion.div>
      </section>

      {/* Problem Validation - "You're Not Alone" */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            Every. Single. CTO. Feels this.
          </motion.h2>

          {/* Visual stats with micro-animations */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">93%</div>
              <p className="text-gray-600">of CTOs doubt AI ROI</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl font-bold text-purple-600 mb-2">8/10</div>
              <p className="text-gray-600">devs resist AI tools</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl font-bold text-green-600 mb-2">You</div>
              <p className="text-gray-600">are not alone</p>
            </motion.div>
          </div>

          {/* Peer proof with floating avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-6 py-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-gray-700 ml-2">247 CTOs nodded at this</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value First - Gary Vee Style */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Take these. Free. No email needed.
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Because giving value first is how we roll
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Readiness Test",
                time: "2 min",
                value: "Know exactly where you stand",
                icon: "🧠",
                color: "blue"
              },
              {
                title: "ROI Calculator", 
                time: "30 sec",
                value: "Real numbers for your team",
                icon: "💰",
                color: "green"
              },
              {
                title: "Resistance Decoder",
                time: "1 min", 
                value: "Why your devs really resist AI",
                icon: "🔓",
                color: "purple"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setMicroWins(prev => prev + 1)}
              >
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{tool.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{tool.time}</p>
                <p className="text-gray-700">{tool.value}</p>
                <div className={`mt-4 h-2 bg-${tool.color}-100 rounded-full overflow-hidden`}>
                  <motion.div
                    className={`h-full bg-${tool.color}-500`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compassionate CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Ready? (It's okay if you're not)
          </h2>
          
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/linkedin-landing" className="block w-full md:w-96 mx-auto bg-blue-600 text-white py-4 px-8 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
                I'm ready to transform
              </Link>
              <p className="text-sm text-gray-500 mt-2">Talk to a human, not a salesperson</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full md:w-96 mx-auto bg-gray-200 text-gray-700 py-4 px-8 rounded-full text-lg font-medium hover:bg-gray-300 transition-colors"
            >
              I need to think
            </motion.button>
            <p className="text-sm text-gray-500">We'll send one gentle reminder in 7 days</p>
          </div>
        </div>
      </section>

      {/* Micro-wins celebration */}
      {microWins > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          🎉 {microWins} micro-wins! You're doing great!
        </motion.div>
      )}
    </main>
  );
}