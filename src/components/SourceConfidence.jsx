import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ExternalLink, CheckCircle } from 'lucide-react';

const sources = [
  { type: 'Travel Vlogs', icon: '🎥', count: 847, confidence: 88, color: '#EF4444', bg: '#FEE2E2' },
  { type: 'Maps & Satellite', icon: '🗺️', count: 1200, confidence: 95, color: '#1261A0', bg: '#EFF6FF' },
  { type: 'Local Listings', icon: '📋', count: 3400, confidence: 91, color: '#0F8B8D', bg: '#CCFBF1' },
  { type: 'Public Data', icon: '📊', count: 2100, confidence: 93, color: '#8B5CF6', bg: '#EDE9FE' },
  { type: 'Community Reports', icon: '👥', count: 5200, confidence: 79, color: '#F59E0B', bg: '#FEF3C7' },
];

export default function SourceConfidence() {
  const [open, setOpen] = useState(false);

  return (
    <section id="sources" style={{ background: 'white', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-tag">Source Transparency</div>
            <h2 className="section-heading mb-4">Don't just trust the AI. See the evidence.</h2>
            <p className="section-subheading mb-6">
              Every price, every route, every recommendation comes from real, verifiable sources. We show you exactly where our data comes from.
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Price Range', value: '₹800–₹1,000' },
                { label: 'Confidence', value: '91%' },
                { label: 'Total Sources', value: '12.7K+' },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0' }}>
                  <p className="text-lg font-extrabold" style={{ color: '#0B1F33' }}>{s.value}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#64748B' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <CheckCircle size={20} style={{ color: '#15803D', flexShrink: 0 }} />
              <p className="text-sm font-medium" style={{ color: '#15803D' }}>
                Last verified 3 days ago. Data freshness score: <strong>High</strong>
              </p>
            </div>
          </motion.div>

          {/* Right: source panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Shield size={18} style={{ color: '#0F8B8D' }} />
                <h4 className="font-bold" style={{ color: '#0B1F33' }}>Source Breakdown</h4>
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: '#1261A0' }}
              >
                {open ? 'Collapse' : 'View All'}
                <motion.div animate={{ rotate: open ? 180 : 0 }}>
                  <ChevronDown size={14} />
                </motion.div>
              </button>
            </div>

            <div className="space-y-3">
              {(open ? sources : sources.slice(0, 3)).map((src, i) => (
                <motion.div
                  key={src.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: src.bg }}
                      >
                        {src.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#0B1F33' }}>{src.type}</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>{src.count.toLocaleString()} data points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: src.color }}>{src.confidence}%</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>confidence</p>
                    </div>
                  </div>
                  <div className="confidence-bar ml-10">
                    <motion.div
                      className="confidence-fill"
                      style={{ background: src.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${src.confidence}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {!open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center justify-center"
                >
                  <button
                    onClick={() => setOpen(true)}
                    className="text-sm font-semibold flex items-center gap-1.5"
                    style={{ color: '#64748B' }}
                  >
                    +{sources.length - 3} more sources <ChevronDown size={13} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: '#64748B' }}>Want raw data?</span>
              <a href="#" className="text-xs font-bold flex items-center gap-1" style={{ color: '#1261A0' }}>
                Export Source Report <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
