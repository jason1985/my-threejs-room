import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stars,
  DragControls,
  Gltf,
  TransformControls,
  PivotControls,
  useVideoTexture,
  useProgress,
  Html,
} from "@react-three/drei";
import N64Cart from "./N64Cart";
import { Suspense, useRef, useState } from "react";

function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry attach="geometry" args={[5, 5]} />
      <meshStandardMaterial
        attach="material"
        color="grey"
        metalness={0.8}
        roughness={0.4}
        side={2}
      />
    </mesh>
  );
}

const Desk1 = (props) => {
  const deskRef = useRef();

  return (
    <Gltf
      {...props}
      rotation={[0, -Math.PI / 2, 0]}
      ref={deskRef}
      scale={0.5}
      src="/my-threejs-room/Desk1.glb"
      receiveShadow
      castShadow
    />
  );
};

const Monitor = () => {
  const texture = useVideoTexture("/my-threejs-room/ratm.mp4", { start: true });

  return (
    <group position={[0, -0.43, 0]}>
      <Gltf
        position={[0, 0, 0]}
        scale={0.5}
        src="/my-threejs-room/Monitor.glb"
        receiveShadow
        castShadow
      />
      <mesh rotation={[0, 0, 0]} position={[0, 0.12, 0.0109]}>
        <planeGeometry attach="geometry" args={[0.432, 0.235]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html style={{ color: "white" }} center>
      {progress} % loaded
    </Html>
  );
};

const App = () => {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <Environment preset="sunset" background={false} />
        <Stars />
        <Plane />
        <OrbitControls makeDefault />
        <DragControls>
          <N64Cart position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </DragControls>
        <Desk1 position={[0, -1, 0]} />
        <Monitor />
      </Suspense>
    </Canvas>
  );
};

export default App;
