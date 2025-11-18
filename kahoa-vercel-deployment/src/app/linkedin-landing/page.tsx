'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LinkedInLandingPage() {
  const [currentStory, setCurrentStory] = useState(0);
  const [trustScore, setTrustScore] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    teamSize: '20'
  });

  // Success stories for mirror neuron activation
  const stories = [
    {
      name: "Sarah Chen",
      role: "VP Engineering",
      company: "FinTech Startup",
      teamSize: "30 developers",
      struggle: "My team was actively sabotaging our Copilot rollout. They saw it as a threat.",
      transformation: "Now they compete to find new AI workflows. We ship 3x faster.",
      timeline: "6 weeks",
      image: "👩‍💻"
    },
    {
      name: "Marcus Johnson",
      role: "CTO",
      company: "Healthcare SaaS",
      teamSize: "50 developers", 
      struggle: "Burned $50k on AI tools gathering dust. Board was questioning my judgment.",
      transformation: "ROI positive in 30 days. Board wants to expand the program.",
      timeline: "4 weeks",
      image: "👨‍💻"
    },
    {
      name: "Priya Patel",
      role: "Director of Engineering",
      company: "E-commerce Platform",
      teamSize: "25 developers",
      struggle: "Senior devs threatening to quit over 'AI replacing them'.",
      transformation: "Same devs now mentoring juniors on AI pair programming.",
      timeline: "5 weeks", 
      image: "👩‍💻"
    }
  ];

  // Progressive trust building
  useEffect(() => {
    const timer = setInterval(() => {
      setTrustScore(prev => Math.min(prev + 1, 100));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero - Immediate vmPFC activation */}
      <section className="relative overflow-hidden">
        {/* Subtle animated background for ADHD engagement */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 animate-float-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-30 animate-float-slower" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trauma-informed headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              That AI investment keeping you up at night?
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-2xl text-gray-600 mb-8"
            >
              You're not the only CTO losing sleep.
            </motion.p>

            {/* Social proof for safety */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg"
            >
              <div className="flex -space-x-3">
                {['🧑‍💼', '👨‍💼', '👩‍💼', '🧑‍💼', '👨‍💼'].map((emoji, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg border-2 border-white">
                    {emoji}
                  </div>
                ))}
              </div>
              <span className="text-gray-700">247 engineering leaders transformed their teams here</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Carousel - Mirror neuron activation */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            CTOs who almost gave up on AI
          </h2>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gray-50 rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl">{stories[currentStory].image}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {stories[currentStory].name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {stories[currentStory].role} • {stories[currentStory].company} • {stories[currentStory].teamSize}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-red-600 mb-1">The Struggle:</p>
                        <p className="text-gray-700 italic">"{stories[currentStory].struggle}"</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-green-600 mb-1">The Transformation:</p>
                        <p className="text-gray-900 font-medium">"{stories[currentStory].transformation}"</p>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Timeline: {stories[currentStory].timeline}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Story navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentStory === index ? 'w-8 bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Value Demo - Dopamine hits */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            See your team's potential in real-time
          </h2>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input side */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Your Current State</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Size
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>5 devs</span>
                      <span className="font-bold text-blue-600">{formData.teamSize} devs</span>
                      <span>100 devs</span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <p className="text-sm text-gray-600 mb-2">Current AI tool adoption:</p>
                    <p className="text-2xl font-bold text-red-600">~10%</p>
                    <p className="text-xs text-gray-500">Industry average</p>
                  </motion.div>
                </div>
              </div>

              {/* Results side */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">After 6 Weeks</h3>
                <div className="space-y-4">
                  <motion.div
                    key={formData.teamSize}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-green-50 rounded-lg p-4"
                  >
                    <p className="text-sm text-gray-600 mb-2">Productivity gain:</p>
                    <p className="text-3xl font-bold text-green-600">
                      +{Math.round(parseInt(formData.teamSize) * 3.65)}%
                    </p>
                    <p className="text-xs text-gray-500">Verified average</p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-blue-50 rounded-lg p-4"
                  >
                    <p className="text-sm text-gray-600 mb-2">Time saved per week:</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round(parseInt(formData.teamSize) * 12)} hours
                    </p>
                    <p className="text-xs text-gray-500">For strategic work</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Dopamine celebration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                That's <span className="font-bold text-green-600">
                  ${Math.round(parseInt(formData.teamSize) * 2190).toLocaleString()}
                </span> in annual savings
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust-building form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              When you're ready (no rush)
            </h2>
            <p className="text-gray-600">
              Get your personalized AI transformation roadmap
            </p>
          </div>

          <motion.form
            className="bg-white rounded-2xl shadow-xl p-8"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle submission
            }}
          >
            {/* Trust indicator */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Trust Building</span>
                <span>{trustScore}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                  style={{ width: `${trustScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>

            {/* Multiple CTAs for different comfort levels */}
            <div className="mt-8 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get my roadmap
              </motion.button>
              
              <button
                type="button"
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-900"
              >
                Just download the guide for now
              </button>
            </div>

            {/* Safety signals */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-gray-500">
              <span>✓ No spam, ever</span>
              <span>✓ Unsubscribe anytime</span>
              <span>✓ Your data is sacred</span>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Floating safety reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs"
      >
        <p className="text-sm text-gray-700">
          💚 This is a safe space. Take your time.
        </p>
      </motion.div>
    </main>
  );
}