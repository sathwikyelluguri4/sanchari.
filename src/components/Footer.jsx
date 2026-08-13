import { Compass } from 'lucide-react';

const XIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const footerLinks = {
  Explore: ['Destinations', 'Hidden Gems', 'Travel Guides', 'Routes'],
  Intelligence: ['Fair Prices', 'Travel Vlogs', 'AI Itineraries', 'Local Tips'],
  Company: ['About Sanchari', 'Contact Us', 'Privacy Policy', 'Terms of Use'],
};

export default function Footer() {
  const linkStyle = {
    display: 'block',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.38)',
    textDecoration: 'none',
    padding: '4px 0',
    transition: 'color 0.15s',
  };

  return (
    <footer style={{ background: '#0F1A18' }}>
      {/* Main */}
      <div className="container-pad" style={{ padding: '64px 20px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 40 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div style={{ gridColumn: '1 / 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: '#176B5B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Compass size={16} color="white" />
              </div>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>Sanchari</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: 240, marginBottom: 24 }}>
              Practical travel intelligence for Telangana and Andhra Pradesh.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[InstagramIcon, XIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.38)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(23,107,91,0.25)'; e.currentTarget.style.color = '#5DC9B4'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h5 style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: '0.8125rem', marginBottom: 16, letterSpacing: '0.03em' }}>
                {section}
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={linkStyle}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-pad" style={{ padding: '20px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Sanchari. Built for Indian travelers.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#176B5B' }} />
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
              Telangana & Andhra Pradesh
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
