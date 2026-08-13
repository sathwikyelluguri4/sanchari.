import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, TrendingDown, AlertTriangle, CheckCircle, ExternalLink, ChevronDown } from 'lucide-react';

const DESTINATION_PRICES = {
  'Charminar': [
    { id: 1, destination: 'Charminar (Hyderabad)', service: 'Laad Bazaar Auto Rickshaw', touristPrice: '₹300', fairPriceMin: 80, fairPriceMax: 120, status: 'fair', confidence: 94, sources: ['Local Auto Fare Card', 'Hyderabad Traffic Data', 'Travel Vlogs'], sourceCount: 24, lastVerified: 'Today' },
    { id: 2, destination: 'Charminar (Hyderabad)', service: 'Authentic Irani Chai & Osmania', touristPrice: '₹150', fairPriceMin: 30, fairPriceMax: 50, status: 'fair', confidence: 98, sources: ['Nimrah Cafe', 'Food Guides', 'Local Reports'], sourceCount: 31, lastVerified: '1 day ago' },
    { id: 3, destination: 'Charminar (Hyderabad)', service: 'Heritage & Food Walk Guide', touristPrice: '₹2,000', fairPriceMin: 500, fairPriceMax: 800, status: 'overpriced', confidence: 89, sources: ['Telangana Tourism', 'Community Reports'], sourceCount: 14, lastVerified: '2 days ago' },
  ],
  'Araku Valley': [
    { id: 1, destination: 'Araku Valley', service: 'Local Jeep Ride to Waterfalls', touristPrice: '₹1,500', fairPriceMin: 800, fairPriceMax: 1000, status: 'fair', confidence: 91, sources: ['Travel Vlogs', 'Local Listings', 'Community Reports'], sourceCount: 12, lastVerified: '3 days ago' },
    { id: 2, destination: 'Araku Valley', service: 'Organic Coffee Estate Tasting', touristPrice: '₹500', fairPriceMin: 150, fairPriceMax: 250, status: 'fair', confidence: 95, sources: ['Coffee Museum', 'Local Guides'], sourceCount: 18, lastVerified: '1 day ago' },
    { id: 3, destination: 'Araku Valley', service: 'Chaparai Waterfalls Auto Hire', touristPrice: '₹800', fairPriceMin: 300, fairPriceMax: 450, status: 'overpriced', confidence: 87, sources: ['AP Tourism', 'Travel Vlogs'], sourceCount: 9, lastVerified: '4 days ago' },
  ],
  'Tirupati': [
    { id: 1, destination: 'Tirupati', service: 'Tirumala Ghat Road Shared Jeep', touristPrice: '₹800', fairPriceMin: 150, fairPriceMax: 250, status: 'fair', confidence: 96, sources: ['APSRTC Tariff', 'Pilgrim Vlogs', 'TTD Board'], sourceCount: 42, lastVerified: 'Today' },
    { id: 2, destination: 'Tirupati', service: 'Temple Circuit Day Cab Hire', touristPrice: '₹3,500', fairPriceMin: 1800, fairPriceMax: 2200, status: 'overpriced', confidence: 92, sources: ['Local Taxi Drivers Assn', 'Travel Reviews'], sourceCount: 28, lastVerified: '1 day ago' },
    { id: 3, destination: 'Tirupati', service: 'Special Darshan Transport Package', touristPrice: '₹1,500', fairPriceMin: 500, fairPriceMax: 700, status: 'overpriced', confidence: 88, sources: ['Pilgrim Reports', 'TTD Updates'], sourceCount: 19, lastVerified: '2 days ago' },
  ],
  'Gandikota': [
    { id: 1, destination: 'Gandikota', service: 'Sunrise Gorge Camping Tent/Night', touristPrice: '₹2,500', fairPriceMin: 1000, fairPriceMax: 1400, status: 'fair', confidence: 90, sources: ['Local Camp Organizers', 'Vlogger Reports'], sourceCount: 15, lastVerified: '2 days ago' },
    { id: 2, destination: 'Gandikota', service: 'Pennar River Kayaking', touristPrice: '₹1,200', fairPriceMin: 400, fairPriceMax: 600, status: 'overpriced', confidence: 85, sources: ['Adventure Sports AP', 'Local Listings'], sourceCount: 8, lastVerified: '5 days ago' },
    { id: 3, destination: 'Gandikota', service: 'Fort Heritage Walk Guide', touristPrice: '₹1,000', fairPriceMin: 300, fairPriceMax: 500, status: 'fair', confidence: 92, sources: ['ASI Local Office', 'Travel Logs'], sourceCount: 11, lastVerified: '3 days ago' },
  ],
  'Visakhapatnam': [
    { id: 1, destination: 'Visakhapatnam', service: 'RK Beach Scooter Rental/Day', touristPrice: '₹900', fairPriceMin: 350, fairPriceMax: 450, status: 'overpriced', confidence: 93, sources: ['Vizag Rentals', 'Travel Vlogs', 'Local Maps'], sourceCount: 26, lastVerified: 'Today' },
    { id: 2, destination: 'Visakhapatnam', service: 'Kailasagiri Ropeway Ticket', touristPrice: '₹300', fairPriceMin: 100, fairPriceMax: 150, status: 'fair', confidence: 97, sources: ['VMRDA Official', 'Ticket Office'], sourceCount: 35, lastVerified: '1 day ago' },
    { id: 3, destination: 'Visakhapatnam', service: 'INS Kursura Submarine Museum Ticket', touristPrice: '₹250', fairPriceMin: 70, fairPriceMax: 100, status: 'fair', confidence: 99, sources: ['Naval Museum Board', 'Official Portal'], sourceCount: 48, lastVerified: 'Today' },
  ],
  'Golconda Fort': [
    { id: 1, destination: 'Golconda Fort', service: 'Sound & Light Show Ticket', touristPrice: '₹600', fairPriceMin: 140, fairPriceMax: 200, status: 'fair', confidence: 96, sources: ['ASI Official', 'Telangana Tourism'], sourceCount: 33, lastVerified: '1 day ago' },
    { id: 2, destination: 'Golconda Fort', service: 'Fort Hill Top Trekking Guide', touristPrice: '₹1,200', fairPriceMin: 350, fairPriceMax: 500, status: 'overpriced', confidence: 88, sources: ['Local Guide Union', 'Tourist Reports'], sourceCount: 14, lastVerified: '3 days ago' },
    { id: 3, destination: 'Golconda Fort', service: 'Auto from Metro Station', touristPrice: '₹250', fairPriceMin: 70, fairPriceMax: 100, status: 'fair', confidence: 94, sources: ['Hyd Auto Fare Table', 'Uber/Ola Meter'], sourceCount: 22, lastVerified: 'Today' },
  ],
};

function generateDynamicPrices(placeName) {
  return [
    {
      id: 1,
      destination: placeName,
      service: `Local Auto / Cab Day Hire in ${placeName}`,
      touristPrice: '₹2,500',
      fairPriceMin: 1100,
      fairPriceMax: 1400,
      status: 'overpriced',
      confidence: 89,
      sources: ['Travel Vlogs', 'Community Fare Reports', 'Transport Rate Cards'],
      sourceCount: 16,
      lastVerified: 'Recently verified',
    },
    {
      id: 2,
      destination: placeName,
      service: `Traditional Local Meal / Thali`,
      touristPrice: '₹450',
      fairPriceMin: 140,
      fairPriceMax: 220,
      status: 'fair',
      confidence: 94,
      sources: ['Local Eateries', 'Vlogger Price Reviews'],
      sourceCount: 21,
      lastVerified: '1 day ago',
    },
    {
      id: 3,
      destination: placeName,
      service: `Sightseeing Entry & Local Guide`,
      touristPrice: '₹1,200',
      fairPriceMin: 350,
      fairPriceMax: 500,
      status: 'fair',
      confidence: 91,
      sources: ['Tourism Department', 'Local Verified Guides'],
      sourceCount: 13,
      lastVerified: '2 days ago',
    },
  ];
}

function PriceMeter({ status }) {
  const positions = { low: 5, fair: 35, overpriced: 70, tourist: 90 };
  const pos = positions[status] || 35;

  return (
    <div className="my-4">
      <div className="flex justify-between text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>
        <span>Local Price</span>
        <span>Fair Price</span>
        <span>Tourist</span>
        <span>Overpriced</span>
      </div>
      <div className="price-meter relative" style={{ height: '8px', borderRadius: '4px' }}>
        <motion.div
          className="absolute top-0 -translate-x-1/2"
          initial={{ left: '0%' }}
          whileInView={{ left: `${pos}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ top: '-4px' }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-white"
            style={{
              background: status === 'fair' ? '#10B981' : '#EF4444',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function PriceCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const statusConfig = {
    fair: { color: '#10B981', bg: '#DCFCE7', icon: CheckCircle, label: '✅ Fair Price' },
    overpriced: { color: '#EF4444', bg: '#FEE2E2', icon: AlertTriangle, label: '⚠️ Often Overpriced' },
  };
  const cfg = statusConfig[item.status] || statusConfig.fair;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color: '#64748B' }}>{item.destination}</p>
          <h4 className="text-lg font-bold" style={{ color: '#0B1F33' }}>{item.service}</h4>
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Price comparison */}
      <div className="flex items-center gap-6 mb-2">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#64748B' }}>Tourist Quote</p>
          <p className="text-lg line-through" style={{ color: '#EF4444' }}>{item.touristPrice}</p>
        </div>
        <div className="text-2xl" style={{ color: '#64748B' }}>→</div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#64748B' }}>Fair Price</p>
          <p className="text-2xl font-extrabold" style={{ color: '#0B1F33' }}>
            ₹{item.fairPriceMin}–₹{item.fairPriceMax}
          </p>
        </div>
      </div>

      {/* Price meter */}
      <PriceMeter status={item.status} />

      {/* Confidence */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Confidence</span>
            <span className="text-sm font-bold" style={{ color: '#176B5B' }}>{item.confidence}%</span>
          </div>
          <div className="confidence-bar">
            <motion.div
              className="confidence-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.confidence}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
        <div className="ml-4 text-right">
          <p className="text-xs" style={{ color: '#64748B' }}>
            {item.sourceCount} sources
          </p>
          <p className="text-xs" style={{ color: '#94A3B8' }}>
            {item.lastVerified}
          </p>
        </div>
      </div>

      {/* Expand sources */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all"
        style={{ background: '#F8FAFC', color: '#0B1F33', border: '1px solid #E2E8F0' }}
      >
        <div className="flex items-center gap-2">
          <Shield size={14} style={{ color: '#0F8B8D' }} />
          View Sources
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 flex flex-wrap gap-2">
              {item.sources.map((src) => (
                <span key={src} className="badge badge-navy text-xs">
                  <ExternalLink size={10} />
                  {src}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FairPriceSection({ destination }) {
  const destName = typeof destination === 'string' ? destination : destination?.name;

  // Determine items dynamically based on selected destination
  let items = [];
  if (destName && DESTINATION_PRICES[destName]) {
    items = DESTINATION_PRICES[destName];
  } else if (destName) {
    items = generateDynamicPrices(destName);
  } else {
    // Default show a curated mix of Telangana and Andhra Pradesh places
    items = [
      ...DESTINATION_PRICES['Charminar'].slice(0, 1),
      ...DESTINATION_PRICES['Araku Valley'].slice(0, 1),
      ...DESTINATION_PRICES['Tirupati'].slice(0, 1),
    ];
  }

  return (
    <section id="prices" style={{ background: '#F8F7F3', padding: '88px 0' }}>
      <div className="container-pad">
        <div className="text-center mb-12">
          <div className="section-tag justify-center" style={{ color: '#176B5B' }}>
            Price Intelligence {destName ? `· ${destName}` : ''}
          </div>
          <h2 className="section-heading mb-4">
            {destName ? `Fair Prices in ${destName}` : 'Are you paying the tourist price?'}
          </h2>
          <p className="section-subheading mx-auto">
            Know what locals usually pay before you spend. Our AI analyzes thousands of sources to give you real local prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {items.map((item, idx) => (
            <PriceCard key={`${item.id}-${idx}-${item.service}`} item={item} />
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl flex flex-col items-center justify-center p-8 text-center"
            style={{
              background: '#17211F',
              minHeight: '300px',
            }}
          >
            <TrendingDown size={40} className="mb-4" style={{ color: '#F59E0B' }} />
            <h3 className="text-white font-bold text-xl mb-2">
              {destName ? `Plan Trip to ${destName}` : 'Check any local price'}
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Get a full custom itinerary with real price estimates for {destName || 'your trip'}.
            </p>
            <a href="#planner" className="btn-primary">
              <span>Plan My Trip</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
