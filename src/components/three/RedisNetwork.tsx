"use client";
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export const RedisNetwork = () => {
  const nodes = ['Client', 'TCP Layer', 'RESP Parser', 'Command Handler', 'KV Store'];

  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
      {/* High-quality lighting setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
      
      {nodes.map((node, i) => (
        <group key={i} position={[0, 4 - i * 2, 0]}>
          <mesh>
            <boxGeometry args={[3, 1.2, 0.4]} />
            <meshStandardMaterial 
              color="#09090b" 
              emissive="#3b82f6" 
              emissiveIntensity={0.2} 
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <Text 
            fontSize={0.4} 
            color="white" 
            position={[0, 0, 0.25]}
            anchorX="center"
            anchorY="middle"
          >
            {node}
          </Text>
        </group>
      ))}
    </Canvas>
  );
};