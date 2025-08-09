import React, { useEffect, useRef, useState } from "react";
import {
  CanvasTexture,
  Clock,
  Color,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget
} from "three";

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const BASE_VERT = `
varying vec2 v_uv;
void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_uv = uv;
}`;

const SIMPLE_FRAG = `
uniform sampler2D sampler;
uniform vec3 color;
uniform float time;
varying vec2 v_uv;

void main(){
  vec4 t = texture2D(sampler, v_uv);
  float alpha = smoothstep(0.1, 0.9, t.a);
  if(alpha < 0.01) discard;
  
  // Simple glow effect
  float glow = sin(time * 2.0) * 0.3 + 0.7;
  gl_FragColor = vec4(color * glow, alpha);
}`;

export interface SimpleTextTrailProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  textColor?: string;
  fontSize?: number;
}

const SimpleTextTrail: React.FC<SimpleTextTrailProps> = ({
  text = "Text",
  fontFamily = "Inter",
  fontWeight = "900",
  textColor = "#ffffff",
  fontSize = 64,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    
    // Wait for container to be properly sized
    const checkSize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width || 300;
      const h = rect.height || 100;
      
      if (w === 0 || h === 0) {
        setTimeout(checkSize, 100);
        return;
      }
      
      initializeRenderer(w, h);
    };
    
    const initializeRenderer = (w: number, h: number) => {

    // Create renderer
    const renderer = new WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false 
    });
    
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create scene
    const scene = new Scene();
    const clock = new Clock();
    const camera = new OrthographicCamera(-w/2, w/2, h/2, -h/2, 0.1, 10);
    camera.position.z = 1;

    // Create text texture
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    
    const createTextTexture = () => {
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = "#ffffff";
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Add glow effect
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 10;
      ctx.fillText(text, size/2, size/2);
      
      const texture = new CanvasTexture(canvas);
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      return texture;
    };

    const texture = createTextTexture();
    
    // Create material
    const material = new ShaderMaterial({
      uniforms: {
        sampler: { value: texture },
        color: { value: new Vector3(...hexToRgb(textColor).map(c => c / 255)) },
        time: { value: 0 }
      },
      vertexShader: BASE_VERT,
      fragmentShader: SIMPLE_FRAG,
      transparent: true,
    });

    // Create mesh
    const geometry = new PlaneGeometry(w, h);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      material.uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
    };
    
    checkSize();
  }, [text, fontFamily, fontWeight, textColor, fontSize]);

  return (
    <div 
      ref={ref} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        minWidth: '200px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} 
    >
      {!isLoaded && (
        <div 
          style={{
            fontFamily,
            fontWeight,
            fontSize: `${fontSize * 0.75}px`,
            color: textColor,
            textShadow: `0 0 10px ${textColor}`,
            animation: 'textGlow 2s infinite'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default SimpleTextTrail;