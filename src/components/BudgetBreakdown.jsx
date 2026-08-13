import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const breakdown = [
  { label: 'Transport', percent: 35, color: '#1261A0', icon: '🚌' },
  { label: 'Stay', percent: 30, color: '#0F8B8D', icon: '🏨' },
  { label: 'Food', percent: 20, color: '#F59E0B', icon: '🍛' },
  { label: 'Activities', percent: 10, color: '#EF4444', icon: '🎯' },
  { label: 'Misc', percent: 5, color: '#8B5CF6', icon: '🛒' },
];

const TOTAL = 4850;
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function DonutChart({ animated }) {
  let offset = 0;

  return (
    <svg viewBox="0 0 180 180" style={{ width: '100%', maxWidth: '220px' }}>
      {/* Background ring */}
      <circle cx="90" cy="90" r={RADIUS} fill="none" strokeWidth="22" stroke="#F1F5F9" />
      {breakdown.map((item, i) => {
        const dash = (item.percent / 100) * CIRCUMFERENCE;
        const gap = CIRCUMFERENCE - dash;
        const rotate = -90 + (offset / 100) * 360;
        offset += item.percent;
        return (
          <motion.circle
            key={item.label}
            cx="90"
            cy="90"
            r={RADIUS}
            fill="none"
            strokeWidth="22"
            stroke={item.color}
            strokeDasharray={animated ? `${dash} ${gap}` : `0 ${CIRCUMFERENCE}`}
            strokeDashoffset="0"
            transform={`rotate(${rotate} 90 90)`}
            strokeLinecap="butt"
            initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
            animate={animated ? { strokeDasharray: `${dash} ${gap}` } : {}}
            transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
          />
        );
      })}
      {/* Center text */}
      <text x="90" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748B">Total</text>
      <text x="90" y="102" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0B1F33">₹{TOTAL.toLocaleString()}</text>
    </svg>
  );
}

export default function BudgetBreakdown() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="budget" style={{ background: 'white', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="text-center mb-12">
          <div className="section-tag justify-center">Budget Breakdown</div>
          <h2 className="section-heading mb-4">Where will your money go?</h2>
          <p className="section-subheading mx-auto">
            See how a typical trip budget is distributed — before you even book anything.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
          {/* Donut chart */}
          <div className="flex justify-center">
            <DonutChart animated={inView} />
          </div>

          {/* Breakdown bars */}
          <div className="space-y-4">
            <div className="mb-6">
              <p className="text-sm font-semibold" style={{ color: '#64748B' }}>Estimated 3-day trip from Hyderabad</p>
              <p className="text-4xl font-extrabold mt-1" style={{ color: '#0B1F33', letterSpacing: '-0.03em' }}>
                ₹{TOTAL.toLocaleString()}
              </p>
            </div>

            {breakdown.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: '#0B1F33' }}>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ color: '#0B1F33' }}>
                      ₹{Math.round((item.percent / 100) * TOTAL).toLocaleString()}
                    </span>
                    <span className="text-xs w-9 text-right font-semibold" style={{ color: '#64748B' }}>{item.percent}%</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full" style={{ background: '#F1F5F9', overflow: 'hidden' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.percent}%` } : {}}
                    transition={{ duration: 1, delay: i * 0.1 + 0.4, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}

            <div
              className="mt-6 p-4 rounded-xl flex items-center justify-between"
              style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
            >
              <span className="text-sm font-bold" style={{ color: '#15803D' }}>✅ Within Budget</span>
              <span className="text-sm font-semibold" style={{ color: '#64748B' }}>
                ₹150 buffer remaining
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
