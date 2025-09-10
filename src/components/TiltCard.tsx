import React, { useRef, useCallback } from 'react';
import type { JSX } from 'react';
import './TiltCard.css';

// TiltCard: mouse-relative 3D tilt with optional glare & shadow
export type TiltCardProps = {
  className?: string;
  children: React.ReactNode;
  maxTiltDeg?: number; // max tilt angle
  scale?: number; // hover scale
  glare?: boolean; // enable glare overlay
  shadow?: boolean; // enable dynamic shadow
  as?: keyof JSX.IntrinsicElements; // wrapper element
};

const TiltCard: React.FC<TiltCardProps> = ({
  className,
  children,
  maxTiltDeg = 10,
  scale = 1.03,
  glare = true,
  shadow = true,
  as = 'div',
}) => {
  const innerRef = useRef<HTMLDivElement | null>(null);

  const setTransform = useCallback((xRatio: number, yRatio: number) => {
    const rotateY = xRatio * maxTiltDeg * 2; // left/right
    const rotateX = -yRatio * maxTiltDeg * 2; // up/down (invert for natural feel)
    const el = innerRef.current;
    if (!el) return;

    const shadowX = shadow ? (-rotateY * 1.2) : 0;
    const shadowY = shadow ? (rotateX * 1.2) : 0;

    el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
    if (shadow) el.style.boxShadow = `${shadowX.toFixed(0)}px ${shadowY.toFixed(0)}px 24px rgba(0,0,0,0.18)`;

    if (glare) {
      const glareLayer = el.querySelector('.tilt-glare') as HTMLDivElement | null;
      if (glareLayer) {
        const angle = Math.atan2(yRatio, xRatio) * (180 / Math.PI) + 180; // 0..360
        const intensity = Math.min(1, Math.hypot(xRatio, yRatio) * 2); // 0..1
        glareLayer.style.background = `linear-gradient(${angle.toFixed(0)}deg, rgba(255,255,255,${0.25 * intensity}) 0%, rgba(255,255,255,0) 60%)`;
        glareLayer.style.opacity = `${0.6 * intensity}`;
      }
    }
  }, [glare, maxTiltDeg, scale, shadow]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0..width
    const y = e.clientY - rect.top;  // 0..height
    const xRatio = x / rect.width - 0.5; // -0.5..0.5
    const yRatio = y / rect.height - 0.5; // -0.5..0.5
    setTransform(xRatio, yRatio);
  }, [setTransform]);

  const handleEnter = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.willChange = 'transform, box-shadow';
    el.style.transition = 'transform 120ms ease, box-shadow 150ms ease';
  }, []);

  const handleLeave = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = 'transform 250ms ease, box-shadow 250ms ease';
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.boxShadow = '';
    const glareLayer = el.querySelector('.tilt-glare') as HTMLDivElement | null;
    if (glareLayer) glareLayer.style.opacity = '0';
  }, []);

  const Component = as as any;

  return (
    <Component
      className={"tilt-card"}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={innerRef} className={`tilt-inner ${className ?? ''}`}>
        {children}
        {glare && <div className="tilt-glare" />}
      </div>
    </Component>
  );
};

export default TiltCard;