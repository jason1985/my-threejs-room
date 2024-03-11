import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader, MeshStandardMaterial } from "three";

const Sticker = ({ texture, position, rotation, scale }) => {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry attach="geometry" args={[1, 1]} />{" "}
      <meshStandardMaterial
        attach="material"
        map={texture}
        transparent={true}
      />
    </mesh>
  );
};

export default function N64Cart(props) {
  const obj = useLoader(OBJLoader, "/my-threejs-room/N64_Cart.obj");

  const diffuse = useLoader(
    TextureLoader,
    "/my-threejs-room/N64_Cart_diffuse.png"
  );
  const normal = useLoader(
    TextureLoader,
    "/my-threejs-room/N64_Cart_normal.png"
  );

  obj.traverse((child) => {
    if (child.isMesh) {
      const material = new MeshStandardMaterial({
        map: diffuse,
        normalMap: normal,
      });

      child.material = material;
    }
  });

  const stickerTexture = useLoader(
    TextureLoader,
    "/my-threejs-room/sticker.jpg"
  );

  const stickerProps = {
    position: [0, -0.01, 0.038 ],
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.065, 0.065, 0.065],
  };

  return (
    <group {...props}>
      <primitive object={obj} />
      <Sticker texture={stickerTexture} {...stickerProps} />
    </group>
  );
}
