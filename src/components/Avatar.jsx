import { useGLTF } from '@react-three/drei';

export default function Avatar(props) {
  // Loads the GLB avatar and returns the root object
  const { scene } = useGLTF('/models/688081d01a4d9ab6d09a6cd1.glb');
  return <primitive object={scene} {...props} />;
}
