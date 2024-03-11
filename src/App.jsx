import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";

import N64Cart from "./N64Cart";

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

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <Environment preset="sunset" background={false} />
      <Stars />
      <Plane />
      <OrbitControls />
      <N64Cart position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </Canvas>
  );
};

export default App;
