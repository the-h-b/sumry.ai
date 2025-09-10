import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Caustics } from '@react-three/drei';

// Simple animated 3D object to enrich hero visuals
function TwistedTorus() {
  const ref = useRef<any>(null);
  // Use delta for frame-rate–independent motion and add subtle z wobble
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += 0.35 * delta;
      ref.current.rotation.y += 0.45 * delta;
      const t = state.clock.elapsedTime;
      ref.current.position.y = Math.sin(t * 0.9) * 0.15;
      ref.current.position.z = Math.cos(t * 0.6) * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.28, 220, 32, 2, 5]} />
        <meshStandardMaterial color="#84a98c" metalness={0.5} roughness={0.25} />
      </mesh>
    </Float>
  );
}

const Hero3DCanvas: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas shadows camera={{ position: [0, 1.3, 3.2], fov: 55 }}>
        <color attach="background" args={[0, 0, 0,]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <Caustics causticsOnly={false} backside={false}>
            <TwistedTorus />
          </Caustics>
          <Stars radius={80} depth={40} count={2500} factor={4} saturation={0} fade speed={1} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.7} />
      </Canvas>
    </div>
  );
};

export default Hero3DCanvas;