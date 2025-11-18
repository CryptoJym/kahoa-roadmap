'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Users } from 'lucide-react';

export function ROICalculator() {
  const [developers, setDevelopers] = useState(20);
  const [avgSalary, setAvgSalary] = useState(150000);
  const [currentProductivity, setCurrentProductivity] = useState(60);
  
  // Calculate ROI metrics
  const yearlyTeamCost = developers * avgSalary;
  const currentWastedCost = yearlyTeamCost * ((100 - currentProductivity) / 100);
  const potentialSavings = currentWastedCost * 0.73; // 73% improvement
  const programCost = developers * 2500; // $2,500 per developer
  const roi = ((potentialSavings - programCost) / programCost) * 100;
  const paybackPeriod = (programCost / (potentialSavings / 12)).toFixed(1);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Your Team Details</h3>
            
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Number of Developers
                </span>
                <span className="text-blue-600 font-semibold">{developers}</span>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={developers}
                onChange={(e) => setDevelopers(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5</span>
                <span>100</span>
              </div>
            </div>
            
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Average Salary
                </span>
                <span className="text-blue-600 font-semibold">
                  ${avgSalary.toLocaleString()}
                </span>
              </label>
              <input
                type="range"
                min="80000"
                max="250000"
                step="5000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$80k</span>
                <span>$250k</span>
              </div>
            </div>
            
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Current Productivity
                </span>
                <span className="text-blue-600 font-semibold">{currentProductivity}%</span>
              </label>
              <input
                type="range"
                min="30"
                max="90"
                value={currentProductivity}
                onChange={(e) => setCurrentProductivity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30%</span>
                <span>90%</span>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Potential ROI</h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-red-700 font-medium">Current Waste</p>
                <p className="text-2xl font-bold text-red-800">
                  ${currentWastedCost.toLocaleString()}/year
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-700 font-medium">Potential Savings</p>
                <p className="text-2xl font-bold text-green-800">
                  ${potentialSavings.toLocaleString()}/year
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 font-medium">ROI</p>
                <p className="text-3xl font-bold text-blue-800">{roi.toFixed(0)}%</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-700 font-medium">Payback Period</p>
                <p className="text-2xl font-bold text-purple-800">{paybackPeriod} months</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Ready to capture this value?</h4>
            <p className="text-sm mb-4 opacity-90">
              See how our Intelligent Engineer program can deliver these results for your team.
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule Your ROI Discussion
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #2563eb;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #2563eb;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          border: none;
        }
      `}</style>
    </div>
  );
}