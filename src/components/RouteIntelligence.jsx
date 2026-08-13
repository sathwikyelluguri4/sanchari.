import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const colorMap = { teal: '#176B5B', navy: '#1261A0', saffron: '#D97745' };
const bgMap = { teal: '#EBF5F2', navy: '#EEF4FF', saffron: '#FBF0E8' };
const textMap = { teal: '#176B5B', navy: '#1D4ED8', saffron: '#D97745' };

function ComfortDots({ score, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i < score ? '#176B5B' : '#E4E7E3' }}
        />
      ))}
    </div>
  );
}

function ScoreBar({ score, max = 5 }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="w-3 h-2 rounded-sm"
          style={{ background: i < score ? '#176B5B' : '#E4E7E3' }}
        />
      ))}
    </div>
  );
}

const ROUTE_DATA = {
  'Araku Valley': {
    from: 'Hyderabad',
    to: 'Araku Valley',
    options: [
      { mode: 'train', icon: '🚆', name: 'Express Train', price: 450, duration: '10h 20m', transfers: 0, comfort: 4, value: 5, badge: 'Best Value', badgeColor: 'teal' },
      { mode: 'bus', icon: '🚌', name: 'Direct Sleeper Bus', price: 650, duration: '8h 30m', transfers: 0, comfort: 3, value: 3, badge: 'Fastest Budget', badgeColor: 'navy' },
      { mode: 'mixed', icon: '🚗', name: 'Bus + Local Jeep', price: 520, duration: '9h 00m', transfers: 1, comfort: 3, value: 4, badge: 'Recommended', badgeColor: 'saffron' },
    ],
  },
  'Tirupati': {
    from: 'Hyderabad',
    to: 'Tirupati',
    options: [
      { mode: 'train', icon: '🚆', name: 'Vande Bharat / Express', price: 380, duration: '9h 15m', transfers: 0, comfort: 5, value: 5, badge: 'Best Value', badgeColor: 'teal' },
      { mode: 'bus', icon: '🚌', name: 'RTC / Private Sleeper', price: 720, duration: '8h 00m', transfers: 0, comfort: 4, value: 4, badge: 'Overnight Sleeper', badgeColor: 'navy' },
      { mode: 'mixed', icon: '✈️', name: 'Flight + Cab', price: 2850, duration: '2h 45m', transfers: 1, comfort: 5, value: 3, badge: 'Fastest Option', badgeColor: 'saffron' },
    ],
  },
  'Gandikota': {
    from: 'Hyderabad',
    to: 'Gandikota (Kadapa)',
    options: [
      { mode: 'train', icon: '🚆', name: 'Train to Muddanuru + Auto', price: 340, duration: '7h 30m', transfers: 1, comfort: 3, value: 5, badge: 'Best Value', badgeColor: 'teal' },
      { mode: 'bus', icon: '🚌', name: 'Direct Bus to Jammalamadugu', price: 580, duration: '6h 45m', transfers: 1, comfort: 3, value: 4, badge: 'Direct Route', badgeColor: 'navy' },
      { mode: 'mixed', icon: '🚗', name: 'Shared Cab / Carpool', price: 750, duration: '5h 30m', transfers: 0, comfort: 4, value: 4, badge: 'Recommended', badgeColor: 'saffron' },
    ],
  },
  'Visakhapatnam': {
    from: 'Hyderabad',
    to: 'Visakhapatnam (Vizag)',
    options: [
      { mode: 'train', icon: '🚆', name: 'Vande Bharat Express', price: 580, duration: '8h 30m', transfers: 0, comfort: 5, value: 5, badge: 'Top Rated', badgeColor: 'teal' },
      { mode: 'bus', icon: '🚌', name: 'Volvo AC Sleeper', price: 850, duration: '10h 00m', transfers: 0, comfort: 4, value: 4, badge: 'Overnight Comfort', badgeColor: 'navy' },
      { mode: 'mixed', icon: '✈️', name: 'Direct Flight', price: 2400, duration: '1h 15m', transfers: 0, comfort: 5, value: 3, badge: 'Fastest Option', badgeColor: 'saffron' },
    ],
  },
  'Charminar': {
    from: 'Secunderabad Railway Stn',
    to: 'Charminar (Old City)',
    options: [
      { mode: 'train', icon: '🚇', name: 'Metro Train (MGBS)', price: 45, duration: '35m', transfers: 0, comfort: 5, value: 5, badge: 'Cheapest & Fast', badgeColor: 'teal' },
      { mode: 'bus', icon: '🚌', name: 'TSRTC City Bus', price: 25, duration: '45m', transfers: 0, comfort: 3, value: 4, badge: 'Local Favorite', badgeColor: 'navy' },
      { mode: 'mixed', icon: '🛺', name: 'Direct Auto Rickshaw', price: 180, duration: '30m', transfers: 0, comfort: 4, value: 4, badge: 'Door to Door', badgeColor: 'saffron' },
    ],
  },
};

function getDynamicRoute(destName) {
  if (destName && ROUTE_DATA[destName]) {
    return ROUTE_DATA[destName];
  }
  const name = destName || 'Araku Valley';
  return {
    from: 'Hyderabad',
    to: name,
    options: [
      { mode: 'train', icon: '🚆', name: 'Express Train', price: 360, duration: '6h 30m', transfers: 0, comfort: 4, value: 5, badge: 'Best Value', badgeColor: 'teal' },
      { mode: 'bus', icon: '🚌', name: 'Direct Bus', price: 620, duration: '7h 15m', transfers: 0, comfort: 3, value: 4, badge: 'Direct Route', badgeColor: 'navy' },
      { mode: 'mixed', icon: '🚗', name: 'Shared Cab / Local Transport', price: 550, duration: '6h 00m', transfers: 1, comfort: 4, value: 4, badge: 'Recommended', badgeColor: 'saffron' },
    ],
  };
}

export default function RouteIntelligence({ destination }) {
  const destName = typeof destination === 'string' ? destination : destination?.name;
  const route = getDynamicRoute(destName);

  return (
    <section id="routes" style={{ background: '#FFFFFF', padding: '88px 0', borderTop: '1px solid #E4E7E3' }}>
      <div className="container-pad">
        <div className="text-center mb-12">
          <div className="section-tag justify-center" style={{ color: '#176B5B' }}>
            Route Intelligence {destName ? `· ${destName}` : ''}
          </div>
          <h2 className="section-heading mb-4">The cheapest way isn't always the best way.</h2>
          <p className="section-subheading mx-auto">
            Compare route options to {route.to} — price, duration, comfort and value from real travel data.
          </p>
        </div>

        {/* Route header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8 p-4 rounded-2xl border"
          style={{ background: '#F8F7F3', borderColor: '#E4E7E3', maxWidth: '520px', margin: '0 auto 36px' }}
        >
          <div className="text-center">
            <p className="text-xs font-semibold" style={{ color: '#66736F' }}>From</p>
            <p className="text-base font-bold" style={{ color: '#17211F' }}>{route.from}</p>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <div className="flex-1 h-px" style={{ background: '#176B5B' }} />
            <div className="text-base">✈️</div>
            <div className="flex-1 h-px" style={{ background: '#176B5B' }} />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold" style={{ color: '#66736F' }}>To</p>
            <p className="text-base font-bold" style={{ color: '#176B5B' }}>{route.to}</p>
          </div>
        </motion.div>

        {/* Route option cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {route.options.map((opt, i) => (
            <motion.div
              key={opt.mode}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-5 relative"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-md"
                  style={{ background: bgMap[opt.badgeColor], color: textMap[opt.badgeColor] }}
                >
                  {opt.badge}
                </span>
              </div>

              {/* Mode icon + name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${colorMap[opt.badgeColor]}15` }}
                >
                  {opt.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: '#17211F' }}>{opt.name}</h4>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} style={{ color: '#66736F' }} />
                    <span className="text-xs font-semibold" style={{ color: '#66736F' }}>{opt.duration}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b" style={{ borderColor: '#E4E7E3' }}>
                <p className="text-3xl font-extrabold" style={{ color: '#176B5B' }}>₹{opt.price}</p>
                <p className="text-xs" style={{ color: '#66736F' }}>per person</p>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: '#66736F' }}>Transfers</span>
                  <span className="text-sm font-bold" style={{ color: '#17211F' }}>
                    {opt.transfers === 0 ? 'Direct' : `${opt.transfers} stop`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: '#66736F' }}>Comfort</span>
                  <ComfortDots score={opt.comfort} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: '#66736F' }}>Value Score</span>
                  <ScoreBar score={opt.value} />
                </div>
              </div>

              <a
                href="#planner"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm border transition-all no-underline"
                style={{ borderColor: colorMap[opt.badgeColor], color: colorMap[opt.badgeColor] }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colorMap[opt.badgeColor];
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colorMap[opt.badgeColor];
                }}
              >
                Select Route <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
