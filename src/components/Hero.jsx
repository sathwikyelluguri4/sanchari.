import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

// Approved TS/AP destination chips
const DEST_CHIPS = [
  'Charminar', 'Araku Valley', 'Golconda Fort',
  'Tirupati', 'Gandikota', 'Ramappa Temple',
  'Borra Caves', 'Papikondalu',
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        background: '#17211F',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 64,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 70% 40%, rgba(23,107,91,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(23,107,91,0.10) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div className="container-pad" style={{ width: '100%', padding: '64px 20px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)',
          gap: '64px',
          alignItems: 'center',
        }}
          className="grid-cols-1 md:grid-cols-[1fr_0.9fr]"
        >
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(23,107,91,0.2)',
              border: '1px solid rgba(23,107,91,0.3)',
              borderRadius: 8, padding: '5px 12px',
              marginBottom: 28,
            }}>
              <MapPin size={13} style={{ color: '#5DC9B4' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#5DC9B4', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Telangana & Andhra Pradesh
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.75rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              maxWidth: 560,
            }}>
              Travel smarter.<br />
              <span style={{ color: '#5DC9B4' }}>Travel locally.</span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7,
              maxWidth: 460,
              marginBottom: 36,
            }}>
              Practical travel information for Telangana and Andhra Pradesh, built from real local knowledge — fair prices, local tips, and AI-powered itineraries.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
              <a
                href="#planner"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#176B5B', color: '#FFFFFF',
                  padding: '12px 24px', borderRadius: 10,
                  fontWeight: 600, fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'background 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0F5044'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(23,107,91,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#176B5B'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Plan My Trip <ArrowRight size={16} />
              </a>
              <a
                href="#prices"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: 'rgba(255,255,255,0.75)',
                  padding: '11px 22px', borderRadius: 10,
                  fontWeight: 500, fontSize: '0.9rem',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
              >
                Fair Prices
              </a>
            </div>

            {/* Destination chips */}
            <div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Supported Destinations
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DEST_CHIPS.map(chip => (
                  <a
                    key={chip}
                    href="#planner"
                    style={{
                      padding: '5px 12px', borderRadius: 7,
                      fontSize: '0.8rem', fontWeight: 500,
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(23,107,91,0.25)'; e.currentTarget.style.borderColor = 'rgba(93,201,180,0.35)'; e.currentTarget.style.color = '#5DC9B4'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                  >
                    {chip}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            className="hidden md:block"
            style={{ position: 'relative' }}
          >
            {/* Main image */}
            <div style={{
              borderRadius: 20,
              overflow: 'hidden',
              aspectRatio: '4/5',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=800&q=85"
                alt="Charminar, Hyderabad"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(to top, rgba(23,33,31,0.7), transparent)',
              }} />
              {/* Caption */}
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginBottom: 2 }}>Featured destination</p>
                <p style={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>Charminar, Hyderabad</p>
              </div>
            </div>

            {/* Floating info card */}
            <div style={{
              position: 'absolute', top: 24, left: -28,
              background: '#FFFFFF',
              borderRadius: 12, padding: '14px 18px',
              boxShadow: '0 8px 28px rgba(20,30,25,0.14)',
              border: '1px solid #E4E7E3',
              minWidth: 148,
            }}>
              <p style={{ fontSize: '0.72rem', color: '#66736F', marginBottom: 4, fontWeight: 500 }}>Entry fee</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#176B5B' }}>₹25 – ₹50</p>
              <p style={{ fontSize: '0.72rem', color: '#A8B5B1', marginTop: 2 }}>Verified local price</p>
            </div>

            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: 80, right: -20,
              background: '#176B5B', color: 'white',
              borderRadius: 10, padding: '10px 16px',
              boxShadow: '0 6px 20px rgba(23,107,91,0.35)',
            }}>
              <p style={{ fontSize: '0.72rem', opacity: 0.8, marginBottom: 2 }}>Supported states</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>TS + AP Destinations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
