import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, MapPin, Lightbulb, ArrowRight } from 'lucide-react';
import { hiddenGems } from '../data/mockData';

const crowdColors = {
  'Low': { bg: '#DCFCE7', text: '#15803D' },
  'Very Low': { bg: '#DCFCE7', text: '#15803D' },
  'Medium': { bg: '#FEF3C7', text: '#92400E' },
};

export default function HiddenGems() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="gems" style={{ background: 'white', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-tag">Hidden Gems</div>
            <h2 className="section-heading mb-3">Go beyond the tourist map.</h2>
            <p className="section-subheading">
              Discover places that locals love but tourists rarely reach. Fewer crowds, lower costs, unforgettable experiences.
            </p>
          </div>
          <a href="#" className="btn-outline flex-shrink-0">
            <span>Discover Hidden Gems</span>
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hiddenGems.map((gem, i) => (
            <motion.div
              key={gem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card cursor-pointer"
              onMouseEnter={() => setHovered(gem.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '200px' }}>
                <motion.img
                  src={gem.image}
                  alt={gem.name}
                  className="w-full h-full object-cover"
                  animate={{ scale: hovered === gem.id ? 1.06 : 1 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(11,31,51,0.9) 0%, transparent 60%)' }}
                />
                {/* Crowd level */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: crowdColors[gem.crowd]?.bg || '#DCFCE7',
                      color: crowdColors[gem.crowd]?.text || '#15803D',
                    }}
                  >
                    <Users size={10} style={{ display: 'inline', marginRight: 3 }} />
                    {gem.crowd} Crowd
                  </span>
                </div>
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-bold text-base leading-tight">{gem.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={11} style={{ color: '#F59E0B' }} />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{gem.location}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-sm mb-3" style={{ color: '#64748B', lineHeight: 1.6 }}>{gem.why}</p>

                <div className="flex items-center justify-between mb-3 text-xs font-semibold">
                  <span style={{ color: '#0B1F33' }}>{gem.cost}</span>
                  <div className="flex items-center gap-1" style={{ color: '#0F8B8D' }}>
                    <Clock size={11} />
                    <span>{gem.bestTime}</span>
                  </div>
                </div>

                <div
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{ background: '#FEF9F0', border: '1px solid #FDE68A' }}
                >
                  <Lightbulb size={14} style={{ color: '#F59E0B', flexShrink: 0, marginTop: 1 }} />
                  <p className="text-xs font-medium" style={{ color: '#92400E' }}>{gem.localTip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
