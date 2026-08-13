import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { destinations } from '../data/mockData';
import { DestinationCard } from './DestinationCard';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'mountains', label: '⛰️ Mountains' },
  { key: 'beaches', label: '🏖️ Beaches' },
  { key: 'heritage', label: '🏛️ Heritage' },
  { key: 'offbeat', label: '🗺️ Offbeat' },
];

export default function DestinationExplorer() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? destinations
    : destinations.filter((d) => d.category === activeFilter);

  return (
    <section id="destinations" style={{ background: '#FFF9F0', padding: '90px 0' }}>
      <div className="container-pad">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-tag">Explore India</div>
            <h2 className="section-heading mb-3">Where will you go next?</h2>
            <p className="section-subheading">
              Explore destinations based on your budget, travel style and interests.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className="tag-chip"
                style={activeFilter === cat.key ? {
                  background: '#0B1F33',
                  color: 'white',
                  borderColor: '#0B1F33',
                } : {}}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
        >
          {filtered.map((dest, i) => (
            <DestinationCard key={dest.id} dest={dest} delay={i * 0.06} />
          ))}
        </motion.div>

        {/* See all CTA */}
        <div className="mt-10 text-center">
          <a href="#" className="btn-outline">
            <span>View All Destinations</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
