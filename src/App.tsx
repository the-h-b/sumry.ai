import './App.css'
import { Clock, Brain, FileText, X, Target, Globe, BarChart3, CheckCircle, Ear, BookOpen, PenTool, MessageCircle, Users, User, Briefcase, GraduationCap, Microscope } from 'lucide-react'
import TargetCursor from './components/TargetCursor'
import MetallicPaint, { parseLogoImage } from './components/MetallicPaint'
import { useState, useEffect } from 'react'
import logo from './assets/sumry-logo.svg'

function MetallicBrand() {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "sumry-logo.svg", { type: blob.type });
        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading logo image:", err);
      }
    }
    loadDefaultImage();
  }, []);

  return (
    <div style={{ width: '400px', height: '100px', position: 'relative' }}>
      <MetallicPaint 
        imageData={imageData ?? new ImageData(1, 1)} 
        params={{ 
          edge: 2, 
          patternBlur: 0.005, 
          patternScale: 2, 
          refraction: 0.015, 
          speed: 0.3, 
          liquid: 0.07 
        }} 
      />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h2>Sumry.ai</h2>
          </div>
          <nav className="nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <button className="cta-button cursor-target">Get Started</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-brand">
              <MetallicBrand />
            </div>
            <h1 className="hero-title">
              The AI That Attends, Understands & Speaks For You
            </h1>
            <h2 className="hero-subtitle">
              Your Smartest Teammate — in Any Language
            </h2>
            <p className="hero-description">
              In today's fast-paced work environment, meetings have become a time sink. You're expected to be everywhere at once, but the reality is you attend dozens of calls each week, miss critical details, struggle to capture notes, and often forget important follow-ups.
            </p>
            <div className="hero-cta">
              <button className="primary-button cursor-target">Start Free Trial</button>
              <button className="secondary-button cursor-target">Watch Demo</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ai-avatar">
              <div className="avatar-circle">
                <div className="pulse-ring"></div>
                <div className="pulse-ring delay-1"></div>
                <div className="pulse-ring delay-2"></div>
                <div className="avatar-text">
                  <div className="floating-avatars">
                    <div className="floating-avatar avatar-1">
                      <div className="avatar-placeholder"><User size={20} /></div>
                    </div>
                    <div className="floating-avatar avatar-2">
                      <div className="avatar-placeholder"><Users size={20} /></div>
                    </div>
                    <div className="floating-avatar avatar-3">
                      <div className="avatar-placeholder"><Briefcase size={20} /></div>
                    </div>
                    <div className="floating-avatar avatar-4">
                      <div className="avatar-placeholder"><User size={20} /></div>
                    </div>
                    <div className="floating-avatar avatar-5">
                      <div className="avatar-placeholder"><GraduationCap size={20} /></div>
                    </div>
                    <div className="floating-avatar avatar-6">
                      <div className="avatar-placeholder"><Microscope size={20} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="container">
          <h2 className="section-title">The Meeting Problem</h2>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon"><Clock size={48} /></div>
              <h3>Time Sink</h3>
              <p>Dozens of calls each week eating into your productive time</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon"><Brain size={48} /></div>
              <h3>Missing Details</h3>
              <p>Critical information gets lost in the noise of back-to-back meetings</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon"><FileText size={48} /></div>
              <h3>Poor Notes</h3>
              <p>Struggling to capture everything while actively participating</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon"><X size={48} /></div>
              <h3>Forgotten Follow-ups</h3>
              <p>Important action items slip through the cracks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <div className="solution-content">
            <h2 className="section-title">What if an AI could be your proxy in every meeting?</h2>
            <p className="solution-description">
              An intelligent assistant that attends for you, understands every conversation in your team's native language, and delivers a concise summary with all the decisions and next steps — all without you lifting a finger?
            </p>
            <div className="solution-features">
              <div className="feature-item">
                <span className="feature-icon"><Target size={24} /></span>
                <span>Attends meetings on your behalf</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon"><Globe size={24} /></span>
                <span>Understands any language</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon"><BarChart3 size={24} /></span>
                <span>Delivers concise summaries</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon"><CheckCircle size={24} /></span>
                <span>Tracks decisions & next steps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introducing Section */}
      <section className="introducing-section">
        <div className="container">
          <div className="introducing-content">
            <h2 className="introducing-title">
              Introducing <span className="brand-highlight">Sumry.ai</span>
            </h2>
            <p className="introducing-description">
              The AI co-worker that listens, learns, transcribes, and can even participate, giving you back your time and providing clarity in every discussion.
            </p>
            <div className="capabilities-grid">
              <div className="capability-card">
                <div className="capability-icon"><Ear size={48} /></div>
                <h3>Listens</h3>
                <p>Actively monitors every conversation with advanced audio processing</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon"><BookOpen size={48} /></div>
                <h3>Learns</h3>
                <p>Understands context, relationships, and your team's communication patterns</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon"><PenTool size={48} /></div>
                <h3>Transcribes</h3>
                <p>Creates accurate, searchable records of all discussions</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon"><MessageCircle size={48} /></div>
                <h3>Participates</h3>
                <p>Can ask clarifying questions and provide relevant information when needed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to reclaim your time?</h2>
            <p>Join thousands of professionals who've already made meetings work for them, not against them.</p>
            <div className="cta-buttons">
              <button className="primary-button large cursor-target">Start Your Free Trial</button>
              <button className="secondary-button large cursor-target">Schedule a Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Sumry.ai</h3>
              <p>Your AI meeting assistant</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#integrations">Integrations</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#docs">Documentation</a>
                <a href="#status">Status</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Sumry.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
