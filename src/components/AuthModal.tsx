import React, { useEffect, useMemo, useState } from 'react';
import './auth.css';

export type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  open: boolean;
  mode?: AuthMode;
  onClose: () => void;
  onSuccess?: (user: { name: string; email: string; phone: string }) => void;
}

// Very light validation helpers
const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const phoneRegex = /^[0-9\-+()\s]{7,20}$/;

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('sumry_user');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const setStoredUser = (user: { name: string; email: string; phone: string }) => {
  localStorage.setItem('sumry_user', JSON.stringify(user));
};

const AuthModal: React.FC<AuthModalProps> = ({ open, mode = 'signup', onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<AuthMode>(mode);
  const storedUser = useMemo(getStoredUser, []);

  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setName('');
      setEmail('');
      setPhone('');
      setError('');
    }
  }, [open]);

  if (!open) return null;

  const validateSignup = () => {
    if (!name.trim()) return 'Please enter your name';
    if (!emailRegex.test(email)) return 'Please enter a valid email';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return '';
  };

  const validateLogin = () => {
    if (!emailRegex.test(email)) return 'Enter your registered email';
    if (!phoneRegex.test(phone)) return 'Enter your registered phone number';
    return '';
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateSignup();
    if (err) {
      setError(err);
      return;
    }
    const user = { name: name.trim(), email: email.trim(), phone: phone.trim() };
    setStoredUser(user);
    onSuccess?.(user);
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateLogin();
    if (err) {
      setError(err);
      return;
    }
    const user = getStoredUser();
    if (!user) {
      setError('No account found. Please sign up first.');
      return;
    }
    const ok = user.email === email.trim() && user.phone === phone.trim();
    if (!ok) {
      setError('Email or phone does not match our records.');
      return;
    }
    onSuccess?.(user);
    onClose();
  };

  return (
    <div className="auth-modal-overlay" role="dialog" aria-modal="true">
      <div className="auth-modal">
        <div className="auth-modal-header">
          <h3>{activeTab === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
          <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Log In
          </button>
        </div>

        {activeTab === 'signup' ? (
          <form className="auth-form" onSubmit={handleSignup}>
            <label>
              <span>Name</span>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="jane@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Phone number</span>
              <input
                type="tel"
                placeholder="+1 555 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="primary-button full">Create account</button>
            {storedUser && (
              <p className="auth-hint">Already have an account? Try logging in.</p>
            )}
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="your@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Phone number</span>
              <input
                type="tel"
                placeholder="Your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="primary-button full">Log in</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;