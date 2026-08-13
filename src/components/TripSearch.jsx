import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import { destinations } from '../data/mockData';

// Group destinations by state
const grouped = destinations.reduce((acc, d) => {
  if (!acc[d.state]) acc[d.state] = [];
  acc[d.state].push(d);
  return acc;
}, {});

export default function TripSearch({ onDestinationSelect }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  const filteredGroups = Object.entries(grouped).reduce((acc, [state, dests]) => {
    const filtered = dests.filter(d =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length) acc[state] = filtered;
    return acc;
  }, {});

  // Close on outside click
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (dest) => {
    setSelected(dest);
    setQuery(dest.name);
    setOpen(false);
    if (onDestinationSelect) onDestinationSelect(dest);
  };

  return (
    <section id="destinations" style={{ background: '#F8F7F3', padding: '80px 0' }}>
      <div className="container-pad">
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Plan My Trip</span>
            <h2 className="section-heading" style={{ marginBottom: 12 }}>
              Choose your destination
            </h2>
            <p className="section-subheading" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
              Select from our supported destinations in Telangana and Andhra Pradesh. We'll give you local knowledge, fair prices, and an AI-powered itinerary.
            </p>
          </motion.div>

          {/* Selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div ref={ref} style={{ position: 'relative', textAlign: 'left' }}>
              {/* Input */}
              <div
                onClick={() => setOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 18px',
                  background: '#FFFFFF',
                  border: open ? '1.5px solid #176B5B' : '1.5px solid #E4E7E3',
                  borderRadius: 12,
                  boxShadow: open ? '0 0 0 3px rgba(23,107,91,0.1)' : '0 2px 8px rgba(20,30,25,0.05)',
                  cursor: 'text',
                  transition: 'border-color 0.18s, box-shadow 0.18s',
                }}
              >
                <Search size={17} style={{ color: '#A8B5B1', flexShrink: 0 }} />
                <input
                  value={query}
                  onChange={e => { setQuery(e.target.value); setOpen(true); setSelected(null); }}
                  onFocus={() => setOpen(true)}
                  placeholder="Search destinations — Charminar, Araku Valley, Tirupati…"
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    fontSize: '0.9375rem', color: '#17211F',
                    background: 'transparent', fontFamily: 'Inter, sans-serif',
                  }}
                />
                <ChevronDown
                  size={16}
                  style={{
                    color: '#A8B5B1', flexShrink: 0,
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                      background: '#FFFFFF',
                      border: '1px solid #E4E7E3',
                      borderRadius: 12,
                      boxShadow: '0 12px 32px rgba(20,30,25,0.10)',
                      zIndex: 50,
                      maxHeight: 320,
                      overflowY: 'auto',
                    }}
                  >
                    {Object.entries(filteredGroups).length === 0 ? (
                      <div style={{ padding: '20px 16px', textAlign: 'center', color: '#A8B5B1', fontSize: '0.875rem' }}>
                        No destinations found. Try a different name.
                      </div>
                    ) : (
                      Object.entries(filteredGroups).map(([state, dests]) => (
                        <div key={state}>
                          {/* State header */}
                          <div style={{
                            padding: '10px 16px 6px',
                            fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            color: '#A8B5B1',
                          }}>
                            {state}
                          </div>
                          {dests.map(d => (
                            <div
                              key={d.id}
                              onClick={() => handleSelect(d)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 16px', cursor: 'pointer',
                                background: selected?.id === d.id ? '#EBF5F2' : 'transparent',
                                transition: 'background 0.12s',
                              }}
                              onMouseEnter={e => { if (selected?.id !== d.id) e.currentTarget.style.background = '#F8F7F3'; }}
                              onMouseLeave={e => { if (selected?.id !== d.id) e.currentTarget.style.background = 'transparent'; }}
                            >
                              <div style={{
                                width: 32, height: 32, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
                              }}>
                                <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div style={{ flex: 1, textAlign: 'left' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: selected?.id === d.id ? '#176B5B' : '#17211F', margin: 0 }}>
                                  {d.name}
                                </p>
                                <p style={{ fontSize: '0.75rem', color: '#A8B5B1', margin: 0 }}>{state}</p>
                              </div>
                              <span style={{
                                fontSize: '0.75rem', fontWeight: 600,
                                color: '#176B5B', background: '#EBF5F2',
                                padding: '2px 8px', borderRadius: 6,
                              }}>{d.budget}</span>
                            </div>
                          ))}
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <a
                href="#planner"
                onClick={() => selected && onDestinationSelect && onDestinationSelect(selected)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: selected ? '#176B5B' : '#E4E7E3',
                  color: selected ? '#FFFFFF' : '#A8B5B1',
                  padding: '12px 28px', borderRadius: 10,
                  fontWeight: 600, fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                  boxShadow: selected ? '0 4px 16px rgba(23,107,91,0.25)' : 'none',
                  pointerEvents: selected ? 'auto' : 'none',
                }}
              >
                {selected ? `Explore ${selected.name}` : 'Select a destination first'} <ArrowRight size={16} />
              </a>
            </div>

            {/* Selected destination info */}
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: 24,
                  display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
                }}
              >
                {[
                  { label: 'Budget', value: selected.budget },
                  { label: 'Best Time', value: selected.bestTime },
                  { label: 'Rating', value: `${selected.rating} ★` },
                ].map(item => (
                  <div key={item.label} style={{
                    background: '#FFFFFF', border: '1px solid #E4E7E3',
                    borderRadius: 10, padding: '10px 18px', textAlign: 'center',
                  }}>
                    <p style={{ fontSize: '0.72rem', color: '#A8B5B1', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#176B5B' }}>{item.value}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
