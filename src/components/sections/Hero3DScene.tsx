import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network({ count = 250 }) {
  const group = useRef<THREE.Group>(null);

  const [positions, indices] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Generate points in a slightly flattened sphere for a nicer web look
      const r = 3.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8; // flattened slightly
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    const idx = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        // Connect points that are close to each other
        if (distSq < 2.0) {
          idx.push(i, j);
        }
      }
    }
    return [pos, new Uint16Array(idx)];
  }, [count]);

  useFrame((state, delta) => {
    if (group.current) {
      // Slow elegant rotation
      group.current.rotation.y -= delta * 0.05;
      group.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#2563eb" transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial color="#1e40af" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 2]}>
        {/* Subtle fog matching the beige-light background to fade the edges */}
        <fog attach="fog" args={["#f1f5f9", 4, 12]} />
        <Network count={250} />
      </Canvas>
    </div>
  );
}
