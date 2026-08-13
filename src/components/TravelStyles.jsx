import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { travelStyles, destinations } from '../data/mockData';

const styleImages = {
  1: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&q=80',
  2: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80',
  3: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
  4: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400&q=80',
  5: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
  6: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
};

export default function TravelStyles() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const filtered = active
    ? destinations.filter((d) => d.category === travelStyles.find((s) => s.id === active)?.filter)
    : [];

  return (
    <section id="styles" style={{ background: '#FFF9F0', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="text-center mb-12">
          <div className="section-tag justify-center">Travel Styles</div>
          <h2 className="section-heading mb-4">What's your travel style?</h2>
          <p className="section-subheading mx-auto">
            Pick your style and we'll recommend the best matching destinations and experiences.
          </p>
        </div>

        {/* Style cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {travelStyles.map((style, i) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setActive(active === style.id ? null : style.id)}
              onMouseEnter={() => setHovered(style.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer relative rounded-2xl overflow-hidden"
              style={{ height: '160px' }}
            >
              {/* Background image */}
              <motion.img
                src={styleImages[style.id]}
                alt={style.name}
                className="w-full h-full object-cover"
                animate={{ scale: hovered === style.id || active === style.id ? 1.08 : 1 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
              {/* Overlay */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: active === style.id
                    ? `linear-gradient(to top, ${style.color}EE 0%, ${style.color}66 100%)`
                    : 'linear-gradient(to top, rgba(11,31,51,0.8) 0%, rgba(11,31,51,0.3) 100%)',
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-3 text-center">
                <div className="text-3xl mb-1">{style.icon}</div>
                <h4 className="text-white font-bold text-sm">{style.name}</h4>
                <p className="text-white text-xs opacity-70 leading-tight mt-0.5">{style.desc}</p>
              </div>

              {/* Active ring */}
              {active === style.id && (
                <div className="absolute inset-0 rounded-2xl" style={{ border: `3px solid ${style.color}` }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Filtered destinations */}
        {active && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl"
            style={{ background: 'white', boxShadow: '0 4px 20px rgba(11,31,51,0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold" style={{ color: '#0B1F33' }}>
                Recommended for {travelStyles.find((s) => s.id === active)?.name}s
              </h4>
              <span className="badge badge-navy">{filtered.length} destinations</span>
            </div>
            <div className="scroll-row pb-2">
              {filtered.map((dest) => (
                <div
                  key={dest.id}
                  className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer"
                  style={{ width: '160px' }}
                >
                  <img src={dest.image} alt={dest.name} className="w-full object-cover" style={{ height: '100px' }} loading="lazy" />
                  <div className="p-2" style={{ background: '#F8FAFC' }}>
                    <p className="font-bold text-xs" style={{ color: '#0B1F33' }}>{dest.name}</p>
                    <p className="text-xs" style={{ color: '#F59E0B', fontWeight: 700 }}>{dest.budget}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
