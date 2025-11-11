import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  shouldExplode?: boolean;
}

function ParticleField({ shouldExplode }: { shouldExplode: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const [isExploded, setIsExploded] = useState(false);
  const velocitiesRef = useRef<Float32Array>();
  const originalPositionsRef = useRef<Float32Array>();
  
  const { positions, count } = useMemo(() => {
    const particleCount = 2500;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Random sphere distribution - positioned as background element
      const r = Math.cbrt(Math.random()) * 2.8; // Medium sphere size
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      // SPHERE VERTICAL POSITION: Change this value to move sphere up/down (0 = center, positive = up, negative = down)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 1; // Moved down
      pos[i3 + 2] = r * Math.cos(phi);
    }
    return { positions: pos, count: particleCount };
  }, []);

  // Initialize velocities and store original positions
  useEffect(() => {
    if (!velocitiesRef.current) {
      velocitiesRef.current = new Float32Array(count * 3);
      originalPositionsRef.current = new Float32Array(positions.length);
      originalPositionsRef.current.set(positions);
      
      // Initialize velocities for explosion
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Create explosion velocities - MUCH SMALLER FORCE to keep particles contained
        const explosionForce = 0.05 + Math.random() * 0.1; // DRASTICALLY REDUCED: Very small explosion force
        const angle = Math.random() * Math.PI * 2;
        const upwardBias = -0.05 - Math.random() * 0.05; // MINIMAL: Very small downward bias
        
        velocitiesRef.current[i3] = Math.cos(angle) * explosionForce;
        velocitiesRef.current[i3 + 1] = upwardBias + Math.random() * 0.05; // Y velocity (up/down)
        velocitiesRef.current[i3 + 2] = Math.sin(angle) * explosionForce;
      }
    }
  }, [positions, count]);

  // Handle explosion trigger
  useEffect(() => {
    if (shouldExplode && !isExploded) {
      setIsExploded(true);
      // Don't reset - keep particles exploded permanently
    }
  }, [shouldExplode, isExploded]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    
    // SPHERE HORIZONTAL/DEPTH POSITION: Change these values to move sphere left/right (x) or forward/back (z)
    // x: negative = left, positive = right | y: negative = down, positive = up | z: negative = closer, positive = further
    ref.current.position.set(1.5, -0.5, 0); // Moved right and down
    
    if (isExploded) {
      // Explosion animation with STRICT boundary constraints
      const positionAttribute = ref.current.geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;
      const velocities = velocitiesRef.current!;
      const gravity = -0.003; // VERY WEAK: Minimal gravity effect
      const damping = 0.98; // STRONG: Heavy air resistance to contain particles
      
      // STRICT BOUNDARY LIMITS: Much smaller boundaries to keep particles visible even at high zoom out
      const boundaryX = 4; // REDUCED: Very tight left/right boundary
      const boundaryY = 4; // REDUCED: Very tight up/down boundary  
      const boundaryZ = 3; // REDUCED: Very tight forward/back boundary
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Update positions based on velocities
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Apply gravity to Y velocity
        velocities[i3 + 1] += gravity;
        
        // Apply damping
        velocities[i3] *= damping;
        velocities[i3 + 1] *= damping;
        velocities[i3 + 2] *= damping;
        
        // STRICT BOUNDARY CONSTRAINTS: Hard containment within tight bounds
        // X boundaries (left/right) - HARD STOP
        if (positions[i3] > boundaryX) {
          positions[i3] = boundaryX;
          velocities[i3] = -Math.abs(velocities[i3]) * 0.1; // Strong reverse with energy loss
        } else if (positions[i3] < -boundaryX) {
          positions[i3] = -boundaryX;
          velocities[i3] = Math.abs(velocities[i3]) * 0.1; // Strong reverse with energy loss
        }
        
        // Y boundaries (up/down) - HARD STOP
        if (positions[i3 + 1] > boundaryY) {
          positions[i3 + 1] = boundaryY;
          velocities[i3 + 1] = -Math.abs(velocities[i3 + 1]) * 0.1; // Strong reverse with energy loss
        } else if (positions[i3 + 1] < -boundaryY) {
          positions[i3 + 1] = -boundaryY;
          velocities[i3 + 1] = Math.abs(velocities[i3 + 1]) * 0.1; // Bounce up with energy loss
        }
        
        // Z boundaries (forward/back) - HARD STOP
        if (positions[i3 + 2] > boundaryZ) {
          positions[i3 + 2] = boundaryZ;
          velocities[i3 + 2] = -Math.abs(velocities[i3 + 2]) * 0.1; // Strong reverse with energy loss
        } else if (positions[i3 + 2] < -boundaryZ) {
          positions[i3 + 2] = -boundaryZ;
          velocities[i3 + 2] = Math.abs(velocities[i3 + 2]) * 0.1; // Strong reverse with energy loss
        }
      }
      
      positionAttribute.needsUpdate = true;
    } else {
      // ROTATION SPEED: Change these values to adjust rotation speed
      ref.current.rotation.y = t * 0.08; // Y-axis rotation speed (horizontal spin)
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.05; // X-axis oscillation (vertical wobble)
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isExploded ? 0.05 : 0.03} // Slightly larger particles during explosion
        // CHANGED COLOR: from '#ff6b6b' (red) to '#22c55e' (green) for explosion
        color={isExploded ? '#22c55e' : '#a78bfa'} // Green during explosion, purple normally
        depthWrite={false}
        transparent
        opacity={isExploded ? 0.8 : 0.95}
        sizeAttenuation
      />
    </points>
  );
}

const HeroCanvas = ({ shouldExplode = false }: HeroCanvasProps) => {
  return (
    <Canvas
      dpr={[1, 2]}
      // FIXED CAMERA: Static camera position to prevent movement during scroll
      camera={{ position: [0, 0, 8], fov: 75 }} // Fixed camera position
      gl={{ antialias: true }}
      className="absolute inset-0 w-full h-full"
      // DISABLE CAMERA CONTROLS: Prevent any camera movement
      frameloop="always"
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 2, 1]} intensity={1.2} />
      <ParticleField shouldExplode={shouldExplode} />
    </Canvas>
  );
};

export default HeroCanvas;