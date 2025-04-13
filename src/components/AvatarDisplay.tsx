import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const AvatarModel: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  return (
    <primitive object={scene} scale={10} position={[0, -5, 0]} />
  );
};

const AvatarDisplay: React.FC<{ userAvatarUrl: string, peerAvatarUrl: string }> = ({ userAvatarUrl, peerAvatarUrl }) => {
  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <OrbitControls enablePan={false} enableZoom={false} />
        <AvatarModel url={userAvatarUrl} />
      </Canvas>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <OrbitControls enablePan={false} enableZoom={false} />
        <AvatarModel url={peerAvatarUrl} />
      </Canvas>
    </div>
  );
};

export default AvatarDisplay;
