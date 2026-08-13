import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, MapPin, Sparkles } from 'lucide-react';

export default function ItineraryTimeline({ visible = true, itinerary }) {
  const [expandedDays, setExpandedDays] = useState([0]);

  const toggleDay = (i) => {
    setExpandedDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    );
  };

  if (!visible || !itinerary) return null;

  const total = itinerary.days?.reduce((sum, d) => sum + (d.totalCost || 0), 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'white', boxShadow: '0 4px 30px rgba(11,31,51,0.1)' }}
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg" style={{ color: '#0B1F33' }}>
              {itinerary.destination} Trip Plan
            </h3>
            <span className="badge badge-teal text-xs">
              <Sparkles size={10} />
              AI Generated
            </span>
          </div>
          <p className="text-xs" style={{ color: '#64748B' }}>
            {itinerary.days?.length} days · {itinerary.days?.reduce((sum, d) => sum + (d.activities?.length || 0), 0)} activities
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium" style={{ color: '#64748B' }}>Total Budget</p>
          <p className="text-2xl font-extrabold" style={{ color: '#0B1F33' }}>₹{total.toLocaleString()}</p>
        </div>
      </div>

      {/* Days */}
      <div className="divide-y divide-gray-100">
        {itinerary.days?.map((day, i) => (
          <div key={i}>
            <button
              onClick={() => toggleDay(i)}
              className="w-full flex items-center justify-between p-5 text-left transition-all hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1261A0, #0F8B8D)' }}
                >
                  D{day.day}
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm" style={{ color: '#0B1F33' }}>Day {day.day} — {day.title}</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>{day.activities?.length || 0} activities</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base font-extrabold" style={{ color: '#F59E0B' }}>₹{(day.totalCost || 0).toLocaleString()}</span>
                {expandedDays.includes(i) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            <AnimatePresence>
              {expandedDays.includes(i) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-2 relative">
                    {/* Timeline line */}
                    <div
                      className="absolute left-[52px] top-0 bottom-5 w-px"
                      style={{ borderLeft: '2px dashed #E2E8F0' }}
                    />

                    {day.activities?.map((act, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.07 }}
                        className="flex items-center gap-3 ml-4"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                          style={{ background: '#F8FAFC', border: '2px solid #E2E8F0', zIndex: 1 }}
                        >
                          {act.icon}
                        </div>

                        <div className="flex-1 flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                              <Clock size={11} />
                              <span className="text-xs font-semibold">{act.time}</span>
                            </div>
                            <p className="text-sm font-medium" style={{ color: '#0B1F33' }}>{act.desc}</p>
                          </div>
                          <span className="text-sm font-bold flex-shrink-0 ml-2" style={{ color: act.cost === 0 ? '#10B981' : '#0B1F33' }}>
                            {act.cost === 0 ? 'Free' : `₹${act.cost}`}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Day total */}
                    <div
                      className="ml-4 flex items-center justify-between px-3 py-2.5 rounded-xl mt-3"
                      style={{ background: '#0B1F33', color: 'white' }}
                    >
                      <span className="text-sm font-semibold">Estimated Day Cost</span>
                      <span className="text-base font-extrabold" style={{ color: '#F59E0B' }}>₹{(day.totalCost || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-5 flex items-center justify-between" style={{ background: '#F8FAFC' }}>
        <div className="flex items-center gap-2">
          <MapPin size={15} style={{ color: '#0F8B8D' }} />
          <span className="text-sm font-semibold" style={{ color: '#0B1F33' }}>Total Trip Cost</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold" style={{ color: '#0B1F33' }}>₹{total.toLocaleString()}</span>
          <span className="badge badge-green text-xs">Within Budget</span>
        </div>
      </div>
    </motion.div>
  );
}
