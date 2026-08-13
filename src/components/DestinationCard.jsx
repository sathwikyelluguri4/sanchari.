import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight } from 'lucide-react';

export function DestinationCard({ dest, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.55 }}
      className="card relative cursor-pointer"
      style={{ minWidth: '260px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <motion.img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(11,31,51,0.85) 0%, rgba(11,31,51,0.2) 50%, transparent 100%)',
          }}
        />
        {/* Trending badge */}
        {dest.trending && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-saffron text-xs font-bold">🔥 Trending</span>
          </div>
        )}
        {/* Rating */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
        >
          <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
          <span className="text-white text-xs font-bold">{dest.rating}</span>
        </div>
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg leading-tight">{dest.name}</h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{dest.state}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {dest.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#F1F5F9', color: '#64748B' }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium" style={{ color: '#64748B' }}>Starting from</p>
            <p className="text-xl font-extrabold" style={{ color: '#0B1F33' }}>{dest.budget}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium mb-1" style={{ color: '#64748B' }}>Best time</p>
            <div className="flex items-center gap-1">
              <Clock size={11} style={{ color: '#0F8B8D' }} />
              <span className="text-xs font-semibold" style={{ color: '#0F8B8D' }}>{dest.bestTime}</span>
            </div>
          </div>
        </div>

        <motion.button
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all"
          animate={{
            background: hovered ? '#0B1F33' : '#F8FAFC',
            color: hovered ? 'white' : '#0B1F33',
          }}
          transition={{ duration: 0.2 }}
        >
          Explore
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={15} />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
