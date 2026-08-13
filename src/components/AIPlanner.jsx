import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Navigation, Wallet, Calendar, Loader, AlertCircle, Play, ExternalLink } from 'lucide-react';
import ItineraryTimeline from './ItineraryTimeline';
import { generateItinerary } from '../services/gemini';
import { searchTravelVlogs } from '../services/youtube';

const travelStyles = ['🎒 Backpacker', '💑 Couple', '👨‍👩‍👧 Family', '🤝 Friends', '🧘 Solo'];
const interests = ['🌿 Nature', '🍛 Food', '🏔️ Adventure', '📸 Photography', '🏛️ Culture', '💎 Hidden Gems'];

const aiSteps = [
  { text: 'Searching YouTube for travel videos…', icon: '📺' },
  { text: 'Analyzing real vlogger experiences…', icon: '🎥' },
  { text: 'Checking real local prices…', icon: '💰' },
  { text: 'Finding best experiences…', icon: '✨' },
  { text: 'Optimizing your budget…', icon: '⚡' },
  { text: 'Building your perfect plan…', icon: '🎯' },
];

export default function AIPlanner({ selectedDestination, onDestinationSearch }) {
  const [form, setForm] = useState({
    destination: '',
    from: '',
    budget: '8000',
    days: '3',
    style: '',
    interests: [],
  });

  useEffect(() => {
    if (selectedDestination) {
      const destName = typeof selectedDestination === 'string' ? selectedDestination : selectedDestination.name;
      if (destName) {
        setForm((prev) => ({ ...prev, destination: destName }));
      }
    }
  }, [selectedDestination]);
  const [step, setStep] = useState('idle'); // idle | loading | done | error
  const [aiStep, setAiStep] = useState(0);
  const [itinerary, setItinerary] = useState(null);
  const [sourceVideo, setSourceVideo] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleInterest = (i) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(i) ? prev.interests.filter((x) => x !== i) : [...prev.interests, i],
    }));
  };

  const generate = async () => {
    if (!form.destination.trim()) {
      setErrorMsg('Please enter a destination first.');
      return;
    }
    setStep('loading');
    setErrorMsg('');
    setAiStep(0);
    setSourceVideo(null);

    // Animate loading steps
    let s = 0;
    const timer = setInterval(() => {
      s++;
      setAiStep(s);
      if (s >= aiSteps.length - 1) clearInterval(timer);
    }, 900);

    try {
      // Step 1: Search YouTube for a real travel vlog
      let video = null;
      try {
        const videos = await searchTravelVlogs(form.destination, 3);
        if (videos.length > 0) {
          // Pick the most viewed video
          video = videos.reduce((best, v) => {
            const bestViews = parseInt(best.views) || 0;
            const vViews = parseInt(v.views) || 0;
            return vViews > bestViews ? v : best;
          }, videos[0]);
          setSourceVideo(video);
        }
      } catch {
        // YouTube search failed — continue without video context
      }

      // Step 2: Generate itinerary with YouTube video as context
      const result = await generateItinerary(form, video);
      clearInterval(timer);
      setAiStep(aiSteps.length);
      setItinerary(result);
      // Notify parent to trigger vlog section
      if (onDestinationSearch) onDestinationSearch(form.destination);
      setTimeout(() => setStep('done'), 400);
    } catch (err) {
      clearInterval(timer);
      setStep('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const reset = () => {
    setStep('idle');
    setItinerary(null);
    setAiStep(0);
    setErrorMsg('');
    setSourceVideo(null);
  };

  return (
    <section id="planner" style={{ background: '#FFF9F0', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="text-center mb-12">
          <div className="section-tag justify-center">AI Trip Planner</div>
          <h2 className="section-heading mb-4">Tell AI your trip. We'll build the plan.</h2>
          <p className="section-subheading mx-auto">
            Enter any destination in India — our AI analyzes real sources to create your personalised budget itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Planner form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-6"
          >
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="col-span-2">
                <label className="text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: '#0B1F33' }}>
                  <MapPin size={12} style={{ color: '#F59E0B' }} /> Where do you want to go?
                </label>
                <input
                  className="input-field w-full"
                  placeholder="e.g. Coorg, Spiti Valley, Pondicherry…"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: '#0B1F33' }}>
                  <Navigation size={12} style={{ color: '#0F8B8D' }} /> From?
                </label>
                <input
                  className="input-field"
                  placeholder="Starting city"
                  value={form.from}
                  onChange={(e) => setForm({ ...form, from: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: '#0B1F33' }}>
                  <Wallet size={12} style={{ color: '#F59E0B' }} /> Budget (₹)
                </label>
                <select
                  className="input-field"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option value="3000">₹3,000</option>
                  <option value="5000">₹5,000</option>
                  <option value="8000">₹8,000</option>
                  <option value="10000">₹10,000</option>
                  <option value="15000">₹15,000</option>
                  <option value="20000">₹20,000</option>
                  <option value="30000">₹30,000+</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: '#0B1F33' }}>
                  <Calendar size={12} style={{ color: '#0F8B8D' }} /> How many days?
                </label>
                <select
                  className="input-field"
                  value={form.days}
                  onChange={(e) => setForm({ ...form, days: e.target.value })}
                >
                  {[2, 3, 4, 5, 7, 10, 14].map((d) => (
                    <option key={d} value={d}>{d} Days</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel style */}
            <div className="mb-4">
              <label className="text-xs font-semibold mb-2 block" style={{ color: '#0B1F33' }}>Travel Style</label>
              <div className="flex flex-wrap gap-2">
                {travelStyles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, style: form.style === s ? '' : s })}
                    className="tag-chip"
                    style={form.style === s ? { background: '#0B1F33', color: 'white', borderColor: '#0B1F33' } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <label className="text-xs font-semibold mb-2 block" style={{ color: '#0B1F33' }}>Interests</label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className="tag-chip"
                    style={form.interests.includes(interest) ? { background: '#FEF3C7', color: '#92400E', borderColor: '#F59E0B' } : {}}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                <AlertCircle size={15} />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
            )}

            <div className="flex gap-3">
              <motion.button
                onClick={generate}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={step === 'loading'}
                className="btn-primary flex-1 justify-center"
                style={{ padding: '14px', fontSize: '1rem', fontWeight: 800, opacity: step === 'loading' ? 0.8 : 1 }}
              >
                {step === 'loading'
                  ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /><span>Generating…</span></>
                  : <><Sparkles size={18} /><span>Generate My Trip</span></>
                }
              </motion.button>
              {step !== 'idle' && (
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-xl border text-sm font-semibold"
                  style={{ border: '1.5px solid #E2E8F0', color: '#64748B' }}
                >
                  Reset
                </button>
              )}
            </div>
          </motion.div>

          {/* AI output panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {step === 'idle' && (
              <div
                className="rounded-2xl flex flex-col items-center justify-center p-10 text-center"
                style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #1261A0 100%)', minHeight: '420px' }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center mb-5"
                  style={{ borderColor: 'rgba(245,158,11,0.5)' }}
                >
                  <Sparkles size={28} style={{ color: '#F59E0B' }} />
                </motion.div>
                <h3 className="text-white font-bold text-xl mb-2">Your AI Plan Awaits</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                  Enter any destination in India and click "Generate My Trip" to get a personalized day-by-day itinerary with real local prices.
                </p>
              </div>
            )}

            {step === 'loading' && (
              <div
                className="rounded-2xl flex flex-col items-center justify-center p-10"
                style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #1261A0 100%)', minHeight: '420px' }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="mb-6"
                >
                  <Loader size={36} style={{ color: '#F59E0B' }} />
                </motion.div>
                <div className="space-y-3 w-full max-w-xs">
                  {aiSteps.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: aiStep >= i ? 1 : 0.25, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                      style={{ background: aiStep >= i ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)' }}
                    >
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm font-medium" style={{ color: aiStep >= i ? 'white' : 'rgba(255,255,255,0.35)' }}>
                        {s.text}
                      </span>
                      {aiStep > i && <span style={{ color: '#10B981', marginLeft: 'auto' }}>✓</span>}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {step === 'error' && (
              <div
                className="rounded-2xl flex flex-col items-center justify-center p-10 text-center"
                style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #7F1D1D 100%)', minHeight: '420px' }}
              >
                <AlertCircle size={40} style={{ color: '#F87171', marginBottom: 16 }} />
                <h3 className="text-white font-bold text-xl mb-2">Generation Failed</h3>
                <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>{errorMsg}</p>
                <button onClick={reset} className="btn-primary">Try Again</button>
              </div>
            )}

            {step === 'done' && itinerary && (
              <div>
                {sourceVideo && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-3 rounded-xl mb-4"
                    style={{ background: '#FEF3C7', border: '1.5px solid #F59E0B' }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>▶️</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold mb-0.5" style={{ color: '#92400E' }}>Sourced from real YouTube vlog</p>
                      <a
                        href={sourceVideo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 font-medium truncate"
                        style={{ color: '#1261A0' }}
                      >
                        {sourceVideo.title}
                        <ExternalLink size={10} style={{ flexShrink: 0 }} />
                      </a>
                      <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>{sourceVideo.channel} · {sourceVideo.views} views</p>
                    </div>
                  </motion.div>
                )}
                <ItineraryTimeline visible={true} itinerary={itinerary} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
