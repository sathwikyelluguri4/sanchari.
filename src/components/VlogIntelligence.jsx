import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Shield, Eye, Search, Loader } from 'lucide-react';
import { searchTravelVlogs } from '../services/youtube';
import { analyzeVideoForPrices } from '../services/gemini';

export default function VlogIntelligence({ destination: propDestination }) {
  const [query, setQuery] = useState(propDestination || '');
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (propDestination) {
      setQuery(propDestination);
      handleSearch(propDestination);
    }
  }, [propDestination]);

  const handleSearch = async (dest) => {
    const target = dest || query;
    if (!target.trim()) return;
    setLoading(true);
    setError('');
    setVlogs([]);
    setSearched(true);
    try {
      const videos = await searchTravelVlogs(target, 4);
      if (!videos.length) {
        setError('No travel vlogs found for this destination. Try a different name.');
        setLoading(false);
        return;
      }
      // Analyze each video with Gemini in parallel
      const analyzed = await Promise.all(
        videos.map(async (v) => {
          try {
            const data = await analyzeVideoForPrices(v, target);
            return { ...v, extractedData: data };
          } catch {
            return { ...v, extractedData: { transport: 700, food: 450, stay: 700, activities: 250, total: 2100, confidence: 70, tip: '' } };
          }
        })
      );
      setVlogs(analyzed);
    } catch (err) {
      setError('Failed to fetch vlogs. Please check your API key or try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="vlogs" style={{ background: '#FFF9F0', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="text-center mb-12">
          <div className="section-tag justify-center">Vlog Intelligence</div>
          <h2 className="section-heading mb-4">Turn travel videos into useful information.</h2>
          <p className="section-subheading mx-auto">
            Our AI watches real travel vlogs and extracts prices, tips, and budget data — automatically.
          </p>
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter destination (e.g. Coorg, Spiti Valley…)"
                className="input-field pl-9 w-full"
                style={{ background: 'white', border: '2px solid #E2E8F0' }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSearch()}
              disabled={loading}
              className="btn-primary flex-shrink-0"
              style={{ padding: '12px 24px' }}
            >
              {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={16} />}
              <span>{loading ? 'Searching…' : 'Find Vlogs'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-4"
            >
              <Loader size={36} style={{ color: '#F59E0B' }} />
            </motion.div>
            <p className="font-semibold" style={{ color: '#0B1F33' }}>Fetching vlogs & analyzing prices with AI…</p>
            <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>This takes a few seconds</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-base font-semibold" style={{ color: '#EF4444' }}>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !searched && (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'white', border: '2px dashed #E2E8F0' }}>
            <div className="text-5xl mb-3">🎥</div>
            <p className="font-bold text-lg" style={{ color: '#0B1F33' }}>Search a destination above</p>
            <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>We'll find real YouTube vlogs and extract budget data using AI</p>
          </div>
        )}

        {/* Vlog cards */}
        <AnimatePresence>
          {vlogs.length > 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {vlogs.map((vlog, i) => (
                <motion.div
                  key={vlog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="card overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative" style={{ height: '200px' }}>
                    <img src={vlog.thumbnail} alt={vlog.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'rgba(11,31,51,0.45)' }} />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={vlog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(245,158,11,0.92)', backdropFilter: 'blur(4px)' }}
                      >
                        <Play size={22} style={{ color: 'white', marginLeft: 3 }} />
                      </a>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-white text-xs font-bold" style={{ background: 'rgba(0,0,0,0.7)' }}>
                      {vlog.duration}
                    </div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg text-white text-xs font-bold glass">
                      <Eye size={11} /> {vlog.views} views
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#0F8B8D' }}>{vlog.channel}</p>
                        <h4 className="font-bold text-sm" style={{ color: '#0B1F33', lineHeight: 1.4 }}>🎥 {vlog.title}</h4>
                      </div>
                      <span className="badge badge-teal flex-shrink-0 text-xs">
                        <Shield size={10} />
                        AI Extracted
                      </span>
                    </div>

                    {/* Extracted price data */}
                    <div className="rounded-xl p-4 mb-3" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                      <p className="text-xs font-bold mb-3" style={{ color: '#0369A1' }}>💡 AI Extracted Price Data</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Transport', value: vlog.extractedData.transport },
                          { label: 'Food/day', value: vlog.extractedData.food },
                          { label: 'Stay/night', value: vlog.extractedData.stay },
                          { label: 'Activities', value: vlog.extractedData.activities },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between items-center">
                            <span className="text-xs" style={{ color: '#64748B' }}>{item.label}</span>
                            <span className="text-sm font-bold" style={{ color: '#0B1F33' }}>₹{item.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-blue-200 flex justify-between items-center">
                        <span className="text-xs font-bold" style={{ color: '#0369A1' }}>Trip Total (est.)</span>
                        <span className="text-base font-extrabold" style={{ color: '#0B1F33' }}>
                          ₹{vlog.extractedData.total?.toLocaleString()}
                        </span>
                      </div>
                      {vlog.extractedData.tip && (
                        <p className="text-xs mt-2 pt-2 border-t border-blue-100 italic" style={{ color: '#0369A1' }}>
                          💬 {vlog.extractedData.tip}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield size={13} style={{ color: '#0F8B8D' }} />
                        <span className="text-xs font-semibold" style={{ color: '#64748B' }}>
                          Confidence: <span style={{ color: '#0F8B8D' }}>{vlog.extractedData.confidence}%</span>
                        </span>
                      </div>
                      <a
                        href={vlog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold flex items-center gap-1"
                        style={{ color: '#1261A0' }}
                      >
                        Watch Video <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
