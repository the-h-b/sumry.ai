import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Brain, MessageCircle, Zap, Eye, Cpu, Waves } from 'lucide-react';
import './AIAssistant3D.css';

interface AIAssistant3DProps {
  className?: string;
}

const AIAssistant3D: React.FC<AIAssistant3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentMode, setCurrentMode] = useState<'idle' | 'thinking' | 'speaking' | 'listening'>('idle');

  // Animation timelines
  const idleAnimation = useRef<gsap.core.Timeline>();
  const thinkingAnimation = useRef<gsap.core.Timeline>();
  const speakingAnimation = useRef<gsap.core.Timeline>();
  const listeningAnimation = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!containerRef.current || !coreRef.current || !orbitsRef.current) return;

    const container = containerRef.current;
    const core = coreRef.current;
    const orbits = orbitsRef.current;
    const particles = particlesRef.current;

    // Create particles
    if (particles) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'ai-particle';
        particle.style.setProperty('--delay', `${i * 0.1}s`);
        particles.appendChild(particle);
      }
    }

    // Initialize 3D transforms
    gsap.set(container, {
      transformStyle: 'preserve-3d',
      perspective: 1000
    });

    gsap.set(core, {
      transformStyle: 'preserve-3d'
    });

    gsap.set(orbits, {
      transformStyle: 'preserve-3d'
    });

    // Idle animation - gentle floating and rotation
    idleAnimation.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to(core, {
        rotationY: 360,
        duration: 8,
        ease: 'none'
      }, 0)
      .to(core, {
        y: -10,
        duration: 3,
        ease: 'power2.inOut'
      }, 0)
      .to(orbits, {
        rotationX: 15,
        rotationZ: 10,
        duration: 4,
        ease: 'power2.inOut'
      }, 0);

    // Thinking animation - faster rotation with pulsing
    thinkingAnimation.current = gsap.timeline({ repeat: -1, paused: true })
      .to(core, {
        rotationY: 360,
        duration: 2,
        ease: 'none'
      }, 0)
      .to(core, {
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'power2.inOut'
      }, 0)
      .to(orbits, {
        rotationX: 360,
        rotationZ: 180,
        duration: 3,
        ease: 'power2.inOut'
      }, 0);

    // Speaking animation - rhythmic pulsing
    speakingAnimation.current = gsap.timeline({ repeat: -1, paused: true })
      .to(core, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: -1,
        ease: 'power2.inOut'
      }, 0)
      .to(orbits, {
        rotationY: 360,
        duration: 4,
        ease: 'none'
      }, 0);

    // Listening animation - gentle wave-like motion
    listeningAnimation.current = gsap.timeline({ repeat: -1, paused: true })
      .to(core, {
        rotationX: 10,
        rotationZ: -5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      }, 0)
      .to(orbits, {
        scale: 1.1,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      }, 0);

    // Start with idle animation
    idleAnimation.current.play();

    // Cycle through different modes
    const modeInterval = setInterval(() => {
      const modes: typeof currentMode[] = ['idle', 'thinking', 'speaking', 'listening'];
      const currentIndex = modes.indexOf(currentMode);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      setCurrentMode(nextMode);
    }, 5000);

    return () => {
      clearInterval(modeInterval);
      idleAnimation.current?.kill();
      thinkingAnimation.current?.kill();
      speakingAnimation.current?.kill();
      listeningAnimation.current?.kill();
    };
  }, []);

  useEffect(() => {
    // Stop all animations
    idleAnimation.current?.pause();
    thinkingAnimation.current?.pause();
    speakingAnimation.current?.pause();
    listeningAnimation.current?.pause();

    // Start the appropriate animation based on current mode
    switch (currentMode) {
      case 'thinking':
        thinkingAnimation.current?.play();
        break;
      case 'speaking':
        speakingAnimation.current?.play();
        break;
      case 'listening':
        listeningAnimation.current?.play();
        break;
      default:
        idleAnimation.current?.play();
    }
  }, [currentMode]);

  const handleMouseEnter = () => {
    setIsActive(true);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const getModeIcon = () => {
    switch (currentMode) {
      case 'thinking':
        return <Brain size={24} />;
      case 'speaking':
        return <MessageCircle size={24} />;
      case 'listening':
        return <Eye size={24} />;
      default:
        return <Cpu size={24} />;
    }
  };

  const getModeText = () => {
    switch (currentMode) {
      case 'thinking':
        return 'Processing...';
      case 'speaking':
        return 'Responding...';
      case 'listening':
        return 'Listening...';
      default:
        return 'Ready';
    }
  };

  return (
    <div 
      className={`ai-assistant-3d ${className} ${isActive ? 'active' : ''} mode-${currentMode}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Particles background */}
      <div ref={particlesRef} className="ai-particles"></div>
      
      {/* Main AI core */}
      <div ref={coreRef} className="ai-core">
        <div className="ai-core-inner">
          <div className="ai-core-center">
            {getModeIcon()}
          </div>
          <div className="ai-core-rings">
            <div className="ai-ring ring-1"></div>
            <div className="ai-ring ring-2"></div>
            <div className="ai-ring ring-3"></div>
          </div>
        </div>
      </div>

      {/* Orbital elements */}
      <div ref={orbitsRef} className="ai-orbits">
        <div className="ai-orbit orbit-1">
          <div className="ai-orbit-dot">
            <Zap size={16} />
          </div>
        </div>
        <div className="ai-orbit orbit-2">
          <div className="ai-orbit-dot">
            <Waves size={16} />
          </div>
        </div>
        <div className="ai-orbit orbit-3">
          <div className="ai-orbit-dot">
            <Brain size={16} />
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="ai-status">
        <div className="ai-status-text">{getModeText()}</div>
        <div className="ai-status-indicator"></div>
      </div>

      {/* Energy field */}
      <div className="ai-energy-field"></div>
    </div>
  );
};

export default AIAssistant3D;