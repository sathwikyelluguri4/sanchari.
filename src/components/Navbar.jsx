import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Explore', href: '#destinations' },
  { label: 'Fair Prices', href: '#prices' },
  { label: 'Travel Vlogs', href: '#vlogs' },
];

export default function Navbar({ user, onSignInClick, onSignOut }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navBg = scrolled
    ? 'rgba(255,255,255,0.97)'
    : 'transparent';
  const navShadow = scrolled
    ? '0 1px 0 rgba(20,30,25,0.08)'
    : 'none';
  const logoColor = scrolled ? '#17211F' : '#FFFFFF';
  const linkColor = scrolled ? '#66736F' : 'rgba(255,255,255,0.82)';
  const linkHover = scrolled ? '#17211F' : '#FFFFFF';

  return (
    <>
      {/* Main nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: navBg,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: navShadow,
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="container-pad">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: 9,
                background: '#176B5B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Compass size={17} color="white" />
              </div>
              <span style={{
                fontSize: '1.0625rem',
                fontWeight: 700,
                color: logoColor,
                letterSpacing: '-0.02em',
                transition: 'color 0.3s',
              }}>
                Sanchari
              </span>
            </a>

            {/* Desktop links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden lg:flex">
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: linkColor,
                    textDecoration: 'none',
                    transition: 'color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = linkHover;
                    e.currentTarget.style.background = scrolled ? '#F0EFEB' : 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = linkColor;
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Plan My Trip */}
              <a
                href="#planner"
                className="btn-primary hidden sm:inline-flex"
                style={{ fontSize: '0.85rem', padding: '9px 18px' }}
              >
                Plan My Trip
              </a>

              {/* Auth */}
              {user ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '7px 12px',
                      borderRadius: 9,
                      border: scrolled ? '1.5px solid #E4E7E3' : '1.5px solid rgba(255,255,255,0.25)',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s, border-color 0.15s',
                    }}
                    className="hidden sm:flex"
                    onMouseEnter={e => e.currentTarget.style.background = scrolled ? '#F0EFEB' : 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: '#176B5B',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700, color: 'white',
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: scrolled ? '#17211F' : 'white', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={13} style={{ color: scrolled ? '#66736F' : 'rgba(255,255,255,0.7)' }} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                          background: '#FFFFFF',
                          borderRadius: 12, border: '1px solid #E4E7E3',
                          boxShadow: '0 12px 32px rgba(20,30,25,0.10)',
                          minWidth: 196, overflow: 'hidden', zIndex: 100,
                        }}
                      >
                        <div style={{ padding: '13px 16px', borderBottom: '1px solid #F0EFEB' }}>
                          <p style={{ fontWeight: 600, color: '#17211F', fontSize: '0.9rem', margin: 0 }}>{user.name}</p>
                          <p style={{ color: '#A8B5B1', fontSize: '0.78rem', margin: '3px 0 0' }}>{user.email}</p>
                        </div>
                        <button
                          onClick={() => { onSignOut(); setUserMenuOpen(false); }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            width: '100%', padding: '11px 16px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#DC2626', fontSize: '0.875rem', fontWeight: 600,
                            transition: 'background 0.12s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={onSignInClick}
                  className="hidden sm:flex"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '8px 16px', borderRadius: 9,
                    border: scrolled ? '1.5px solid #E4E7E3' : '1.5px solid rgba(255,255,255,0.3)',
                    background: 'transparent',
                    color: scrolled ? '#17211F' : 'white',
                    fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = scrolled ? '#F0EFEB' : 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = scrolled ? '#C8D5D2' : 'rgba(255,255,255,0.55)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = scrolled ? '#E4E7E3' : 'rgba(255,255,255,0.3)';
                  }}
                >
                  <User size={14} /> Sign In
                </button>
              )}

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                style={{
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer',
                  color: scrolled ? '#17211F' : 'white',
                }}
                className="lg:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49,
              background: '#FFFFFF',
              borderBottom: '1px solid #E4E7E3',
              boxShadow: '0 8px 24px rgba(20,30,25,0.08)',
            }}
          >
            <div className="container-pad" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '11px 14px', borderRadius: 9,
                    fontSize: '0.9rem', fontWeight: 500, color: '#17211F',
                    textDecoration: 'none', transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F0EFEB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {link.label}
                </a>
              ))}
              <div style={{ borderTop: '1px solid #E4E7E3', marginTop: 8, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="#planner" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ justifyContent: 'center' }}>
                  Plan My Trip
                </a>
                {user ? (
                  <button
                    onClick={() => { onSignOut(); setMenuOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      padding: '10px', borderRadius: 9,
                      background: '#FEF2F2', color: '#DC2626',
                      border: 'none', cursor: 'pointer',
                      fontSize: '0.875rem', fontWeight: 600,
                    }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => { onSignInClick(); setMenuOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      padding: '10px', borderRadius: 9,
                      background: '#F0EFEB', color: '#17211F',
                      border: '1.5px solid #E4E7E3', cursor: 'pointer',
                      fontSize: '0.875rem', fontWeight: 600,
                    }}
                  >
                    <User size={14} /> Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User menu backdrop */}
      {userMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  );
}
