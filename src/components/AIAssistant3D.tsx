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
  const idleAnimation = useRef<gsap.core.Timeline>(null);
  const thinkingAnimation = useRef<gsap.core.Timeline>(null);
  const speakingAnimation = useRef<gsap.core.Timeline>(null);
  const listeningAnimation = useRef<gsap.core.Timeline>(null);
  const coreRotation = useRef<gsap.core.Tween>(null);
  const orbit1Rotation = useRef<gsap.core.Tween>(null);
  const orbit2Rotation = useRef<gsap.core.Tween>(null);
  const orbit3Rotation = useRef<gsap.core.Tween>(null);
  const precessionAnimation = useRef<gsap.core.Timeline>(null);

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

    // Continuous core rotation (additive to avoid resets)
    coreRotation.current = gsap.to(core, {
      rotationY: '+=360',
      duration: 12,
      ease: 'none',
      repeat: -1
    });

    // Idle float (separate from rotation to avoid yoyo resetting angles)
    idleAnimation.current = gsap.to(core, {
      y: -6,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Continuous orbit rotations at varied speeds for depth
    orbit1Rotation.current = gsap.to('.ai-orbit.orbit-1', {
      rotationY: '+=360',
      duration: 12,
      ease: 'none',
      repeat: -1
    });

    orbit2Rotation.current = gsap.to('.ai-orbit.orbit-2', {
      rotationY: '-=360',
      duration: 18,
      ease: 'none',
      repeat: -1
    });

    orbit3Rotation.current = gsap.to('.ai-orbit.orbit-3', {
      rotationY: '+=360',
      duration: 24,
      ease: 'none',
      repeat: -1
    });

    // Gentle precession for the orbits container
    precessionAnimation.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to(orbits, {
        rotationX: 10,
        rotationZ: 8,
        duration: 6,
        ease: 'sine.inOut'
      })
      .to(orbits, {
        rotationX: -6,
        rotationZ: -5,
        duration: 6,
        ease: 'sine.inOut'
      });

    // Thinking animation - faster rotation with pulsing
    thinkingAnimation.current = gsap.timeline({ repeat: -1, paused: true })
      .to(orbits, {
        rotationX: '+=360',
        rotationY: '+=360',
        rotationZ: '+=360',
        duration: 3,
        ease: 'power2.inOut',
        overwrite: 'auto',
        immediateRender: false
      }, 0);

    // Speaking animation - rhythmic pulsing
    speakingAnimation.current = gsap.timeline({ repeat: -1, paused: true })
      .to(orbits, {
        rotationY: '+=360',
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

    // Start with idle float
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
      coreRotation.current?.kill();
      thinkingAnimation.current?.kill();
      speakingAnimation.current?.kill();
      listeningAnimation.current?.kill();
      orbit1Rotation.current?.kill();
      orbit2Rotation.current?.kill();
      orbit3Rotation.current?.kill();
      precessionAnimation.current?.kill();
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
        // Pause orbit rotations during thinking mode
        orbit1Rotation.current?.pause();
        orbit2Rotation.current?.pause();
        orbit3Rotation.current?.pause();
        thinkingAnimation.current?.play();
        break;
      case 'speaking':
        // Resume orbit rotations for other modes
        orbit1Rotation.current?.play();
        orbit2Rotation.current?.play();
        orbit3Rotation.current?.play();
        speakingAnimation.current?.play();
        break;
      case 'listening':
        // Resume orbit rotations for other modes
        orbit1Rotation.current?.play();
        orbit2Rotation.current?.play();
        orbit3Rotation.current?.play();
        listeningAnimation.current?.play();
        break;
      default:
        // Resume orbit rotations for idle mode
        orbit1Rotation.current?.play();
        orbit2Rotation.current?.play();
        orbit3Rotation.current?.play();
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