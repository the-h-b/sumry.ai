import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations = () => {
  useEffect(() => {
    // Animate problem cards
    gsap.fromTo('.problem-card', 
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 45
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.problem-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate problem icons with delay
    gsap.fromTo('.problem-icon', 
      {
        scale: 0,
        rotation: -180,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.problem-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate solution features
    gsap.fromTo('.feature-item',
      {
        x: -50,
        opacity: 0,
        scale: 0.9
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.solution-section',
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate feature icons
    gsap.fromTo('.feature-icon',
      {
        scale: 0,
        rotation: 90,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: {
          trigger: '.solution-section',
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate capability cards
    gsap.fromTo('.capability-card',
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotationY: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.capabilities-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate capability icons
    gsap.fromTo('.capability-icon',
      {
        scale: 0,
        rotation: -90,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.capabilities-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate section titles
    gsap.fromTo('.section-title',
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate introducing header
    gsap.fromTo('.introducing-header .introducing-text',
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.introducing-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.introducing-header .introducing-visual',
      {
        x: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.introducing-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Add continuous floating animation for icons
    gsap.to('.problem-icon', {
      y: -5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });

    gsap.to('.capability-icon', {
      y: -8,
      rotation: 5,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    });

    gsap.to('.feature-icon', {
      scale: 1.05,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.4
    });

    // Add parallax effect to sections
    gsap.to('.problem-section', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.problem-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.solution-section', {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.solution-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Add hover animations for cards
    const problemCards = document.querySelectorAll('.problem-card');
    const capabilityCards = document.querySelectorAll('.capability-card');
    const featureItems = document.querySelectorAll('.feature-item');

    const addHoverAnimation = (elements: NodeListOf<Element>, hoverScale = 1.05) => {
      elements.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: hoverScale,
            y: -10,
            rotationY: 5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    };

    addHoverAnimation(problemCards, 1.08);
    addHoverAnimation(capabilityCards, 1.05);
    
    // Special hover for feature items
    featureItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.03,
          x: 10,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollAnimations;