import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 30, suffix: '+', label: 'Destinations Covered' },
  { value: 10, suffix: 'K+', label: 'Travel Sources Analyzed' },
  { value: 91, suffix: '%', label: 'Price Accuracy' },
  { value: 2, suffix: ' states', label: 'Telangana & AP' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 18);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E4E7E3' }}>
      <div className="container-pad">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderLeft: '1px solid #E4E7E3',
        }}
          className="grid-cols-2 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '32px 24px',
                borderRight: '1px solid #E4E7E3',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#176B5B',
                letterSpacing: '-0.03em',
                marginBottom: 4,
              }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#66736F', fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
