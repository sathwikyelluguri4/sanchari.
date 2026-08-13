import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section
      id="cta"
      style={{
        background: '#17211F',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(23,107,91,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-pad" style={{ position: 'relative', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Icon */}
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'rgba(23,107,91,0.25)',
            border: '1px solid rgba(93,201,180,0.2)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}>
            <Compass size={24} style={{ color: '#5DC9B4' }} />
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 700, color: '#FFFFFF',
            letterSpacing: '-0.03em', lineHeight: 1.15,
            marginBottom: 16, maxWidth: 560, margin: '0 auto 16px',
          }}>
            Plan your next trip with real local knowledge.
          </h2>

          <p style={{
            fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65, maxWidth: 420, margin: '0 auto 40px',
          }}>
            Fair prices, AI-powered itineraries, and local insights — all in one place.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a
              href="#planner"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#176B5B', color: 'white',
                padding: '13px 28px', borderRadius: 10,
                fontWeight: 600, fontSize: '0.9375rem',
                textDecoration: 'none',
                transition: 'background 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0F5044'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(23,107,91,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#176B5B'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Plan My Trip <ArrowRight size={16} />
            </a>
            <a
              href="#destinations"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: 'rgba(255,255,255,0.65)',
                padding: '12px 26px', borderRadius: 10,
                fontWeight: 500, fontSize: '0.9rem',
                textDecoration: 'none',
                border: '1.5px solid rgba(255,255,255,0.15)',
                transition: 'color 0.15s, border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
            >
              Explore Destinations
            </a>
          </div>

          {/* Trust line */}
          <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 28px' }}>
            {['Real local prices', 'Telangana & AP focused', 'AI-powered planning', 'No booking fees'].map(item => (
              <span key={item} style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                · {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
