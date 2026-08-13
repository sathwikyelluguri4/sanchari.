import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, X, Loader, AlertCircle, CheckCircle } from 'lucide-react';

// ─── Simple localStorage-based MVP auth ──────────────────────────────────────
const STORAGE_KEY = 'sanchari_user';

function getStoredUser() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
}
function storeUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}
function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

// Simple registry to simulate accounts across sessions
const REGISTRY_KEY = 'sanchari_accounts';
function getAccounts() {
  try { return JSON.parse(localStorage.getItem(REGISTRY_KEY)) || {}; } catch { return {}; }
}
function saveAccount(email, name, password) {
  const accounts = getAccounts();
  accounts[email.toLowerCase()] = { name, password };
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(accounts));
}
function findAccount(email, password) {
  const accounts = getAccounts();
  const acc = accounts[email.toLowerCase()];
  if (!acc) return null;
  if (acc.password !== password) return null;
  return { name: acc.name, email: email.toLowerCase() };
}

// ─── Validation helpers ───────────────────────────────────────────────────────
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(pw) {
  return pw.length >= 6;
}

// ─── Main AuthModal component ─────────────────────────────────────────────────
export default function AuthModal({ isOpen, onClose, onAuthChange }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [apiError, setApiError] = useState('');

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Reset state when modal opens / mode changes
  useEffect(() => {
    setForm({ name: '', email: '', password: '', confirm: '' });
    setErrors({});
    setStatus('idle');
    setApiError('');
    setShowPw(false);
    setShowConfirm(false);
  }, [isOpen, mode]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  function validate() {
    const e = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (!validatePassword(form.password)) e.password = 'Password must be at least 6 characters.';
    if (mode === 'signup') {
      if (!form.confirm) e.confirm = 'Please confirm your password.';
      else if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';
    }
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    setApiError('');

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 900));

    if (mode === 'signin') {
      const user = findAccount(form.email, form.password);
      if (!user) {
        setStatus('error');
        setApiError('Invalid email or password. Please try again.');
        return;
      }
      storeUser(user);
      setStatus('success');
      setTimeout(() => { onAuthChange(user); onClose(); }, 900);
    } else {
      const accounts = getAccounts();
      if (accounts[form.email.toLowerCase()]) {
        setStatus('error');
        setApiError('An account with this email already exists. Sign in instead.');
        return;
      }
      saveAccount(form.email, form.name.trim(), form.password);
      const user = { name: form.name.trim(), email: form.email.toLowerCase() };
      storeUser(user);
      setStatus('success');
      setTimeout(() => { onAuthChange(user); onClose(); }, 900);
    }
  }

  if (!isOpen) return null;

  const inputStyle = (field) => ({
    width: '100%',
    padding: '11px 14px',
    borderRadius: 12,
    border: `1.5px solid ${errors[field] ? '#EF4444' : '#E2E8F0'}`,
    outline: 'none',
    fontSize: '0.9rem',
    color: '#0B1F33',
    background: '#F8FAFC',
    transition: 'border-color 0.2s',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(11,31,51,0.6)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              width: '100%',
              maxWidth: 440,
              background: 'white',
              borderRadius: 24,
              boxShadow: '0 24px 80px rgba(11,31,51,0.25)',
              padding: '36px 32px 32px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 32, height: 32, borderRadius: '50%',
                border: 'none', background: '#F1F5F9',
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: '#64748B', transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#E2E8F0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#F1F5F9'}
            >
              <X size={16} />
            </button>

            {/* Logo + Title */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'linear-gradient(135deg, #176B5B, #0F8B8D)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
              }}>
                <span style={{ fontSize: 22 }}>🧭</span>
              </div>
              <h2 style={{ color: '#0B1F33', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.88rem', marginTop: 6 }}>
                {mode === 'signin' ? 'Sign in to Sanchari' : 'Join Sanchari — it\'s free'}
              </p>
            </div>

            {/* Success state */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 14px', borderRadius: 12,
                  background: '#F0FDF4', border: '1.5px solid #BBF7D0',
                  marginBottom: 20,
                }}
              >
                <CheckCircle size={18} style={{ color: '#16A34A', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', color: '#15803D', fontWeight: 600 }}>
                  {mode === 'signin' ? 'Signed in successfully!' : 'Account created! Welcome to Sanchari!'}
                </span>
              </motion.div>
            )}

            {/* API Error */}
            {status === 'error' && apiError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '12px 14px', borderRadius: 12,
                  background: '#FEF2F2', border: '1.5px solid #FECACA',
                  marginBottom: 20,
                }}
              >
                <AlertCircle size={18} style={{ color: '#DC2626', flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: '0.88rem', color: '#DC2626', fontWeight: 500 }}>
                  {apiError}
                </span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Name — signup only */}
                {mode === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B1F33', marginBottom: 6 }}>
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={set('name')}
                      style={inputStyle('name')}
                      onFocus={(e) => e.target.style.borderColor = '#176B5B'}
                      onBlur={(e) => e.target.style.borderColor = errors.name ? '#EF4444' : '#E2E8F0'}
                      disabled={status === 'loading' || status === 'success'}
                    />
                    {errors.name && <p style={{ fontSize: '0.78rem', color: '#DC2626', marginTop: 4 }}>{errors.name}</p>}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B1F33', marginBottom: 6 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={set('email')}
                    style={inputStyle('email')}
                    onFocus={(e) => e.target.style.borderColor = '#1261A0'}
                    onBlur={(e) => e.target.style.borderColor = errors.email ? '#EF4444' : '#E2E8F0'}
                    disabled={status === 'loading' || status === 'success'}
                    autoComplete="email"
                  />
                  {errors.email && <p style={{ fontSize: '0.78rem', color: '#DC2626', marginTop: 4 }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B1F33', marginBottom: 6 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPw ? 'text' : 'password'}
                      placeholder={mode === 'signup' ? 'Create a password (min. 6 chars)' : 'Enter your password'}
                      value={form.password}
                      onChange={set('password')}
                      style={{ ...inputStyle('password'), paddingRight: 44 }}
                      onFocus={(e) => e.target.style.borderColor = '#1261A0'}
                      onBlur={(e) => e.target.style.borderColor = errors.password ? '#EF4444' : '#E2E8F0'}
                      disabled={status === 'loading' || status === 'success'}
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2,
                      }}
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p style={{ fontSize: '0.78rem', color: '#DC2626', marginTop: 4 }}>{errors.password}</p>}
                </div>

                {/* Confirm password — signup only */}
                {mode === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B1F33', marginBottom: 6 }}>
                      Confirm Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={form.confirm}
                        onChange={set('confirm')}
                        style={{ ...inputStyle('confirm'), paddingRight: 44 }}
                        onFocus={(e) => e.target.style.borderColor = '#1261A0'}
                        onBlur={(e) => e.target.style.borderColor = errors.confirm ? '#EF4444' : '#E2E8F0'}
                        disabled={status === 'loading' || status === 'success'}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        style={{
                          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                          background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2,
                        }}
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.confirm && <p style={{ fontSize: '0.78rem', color: '#DC2626', marginTop: 4 }}>{errors.confirm}</p>}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={status === 'idle' || status === 'error' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' || status === 'error' ? { scale: 0.98 } : {}}
                style={{
                  width: '100%', marginTop: 24,
                  padding: '13px',
                  background: status === 'success'
                    ? '#16A34A'
                    : '#176B5B',
                  color: 'white', border: 'none', borderRadius: 12,
                  fontSize: '0.95rem', fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.85 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background 0.3s',
                }}
              >
                {status === 'loading' && <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                {status === 'success' && <CheckCircle size={16} />}
                {status === 'loading'
                  ? (mode === 'signin' ? 'Signing in…' : 'Creating account…')
                  : status === 'success'
                  ? 'Done!'
                  : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </motion.button>
            </form>

            {/* Toggle mode */}
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', color: '#64748B' }}>
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#176B5B', fontWeight: 700, fontSize: '0.85rem', padding: 0,
                }}
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
