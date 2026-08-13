import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (direction) => {
    setDir(direction);
    setActive((prev) => (prev + direction + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section id="testimonials" style={{ background: '#FFF9F0', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="text-center mb-12">
          <div className="section-tag justify-center">Testimonials</div>
          <h2 className="section-heading mb-4">Travelers who stopped overpaying.</h2>
          <p className="section-subheading mx-auto">
            Real stories from real travelers who used Sanchari to plan smarter trips.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial */}
          <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.4 }}
                className="card p-8"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} size={18} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  ))}
                </div>

                <blockquote className="text-xl font-medium mb-6" style={{ color: '#0B1F33', lineHeight: 1.6 }}>
                  "{t.text}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                      style={{ border: '3px solid #FEF3C7' }}
                    />
                    <div>
                      <p className="font-bold" style={{ color: '#0B1F33' }}>{t.name}</p>
                      <p className="text-sm" style={{ color: '#64748B' }}>{t.location} · {t.trip}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold" style={{ color: '#64748B' }}>Saved</p>
                    <p className="text-2xl font-extrabold" style={{ color: '#10B981' }}>{t.saved}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'white', border: '2px solid #E2E8F0' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1261A0'; e.currentTarget.style.color = '#1261A0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = 'inherit'; }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                  className="rounded-full transition-all"
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    background: i === active ? '#F59E0B' : '#E2E8F0',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'white', border: '2px solid #E2E8F0' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1261A0'; e.currentTarget.style.color = '#1261A0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = 'inherit'; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Avatar row */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
              >
                <motion.img
                  src={t.avatar}
                  alt={t.name}
                  className="rounded-full object-cover cursor-pointer"
                  animate={{
                    width: i === active ? '44px' : '36px',
                    height: i === active ? '44px' : '36px',
                    opacity: i === active ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.25 }}
                  style={{ border: i === active ? '3px solid #F59E0B' : '2px solid #E2E8F0' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
