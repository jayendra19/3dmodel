
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations, PerspectiveCamera } from '@react-three/drei';
import PHONEME_MAP from './PHONEME_MAP';

function LipSyncAvatar({ speakText, headTurn }) {
  const { scene, nodes } = useGLTF('/models/688081d01a4d9ab6d09a6cd1.glb');
  const influences = nodes.Wolf3D_Head?.morphTargetInfluences;
  const dict = nodes.Wolf3D_Head?.morphTargetDictionary;
  const activeMorph = useRef(null);
  const headRef = useRef();
  const [headAngle, setHeadAngle] = useState(0);

  // Animation logic (idle only, matching tutorial)
  const idleFBX = useFBX('animations/Idle.fbx');
  const { actions, mixer } = useAnimations(idleFBX.animations, scene);

  useEffect(() => {
    if (actions && actions['Idle']) {
      actions['Idle'].reset().fadeIn(0.5).play();
    } else if (Object.values(actions)[0]) {
      Object.values(actions)[0].reset().fadeIn(0.5).play();
    }
    return () => {
      if (actions && actions['Idle']) {
        actions['Idle'].fadeOut(0.5);
      } else if (Object.values(actions)[0]) {
        Object.values(actions)[0].fadeOut(0.5);
      }
    };
  }, [actions]);

  useEffect(() => {
    if (!speakText) return;
    const utt = new window.SpeechSynthesisUtterance(speakText);
    utt.onboundary = (e) => {
      const morphName = PHONEME_MAP['open'];
      if (morphName && dict[morphName] !== undefined) {
        activeMorph.current = dict[morphName];
        influences.fill(0);
        influences[activeMorph.current] = 1;
      }
      // Animate head turn for greeting
      if (headRef.current) {
        setHeadAngle(headTurn ? 0.3 : 0);
      }
    };
    utt.onend = () => {
      if (influences) influences.fill(0);
      activeMorph.current = null;
      setHeadAngle(0);
    };
    window.speechSynthesis.speak(utt);
  }, [speakText, headTurn, influences, dict]);

  useFrame(() => {
    if (activeMorph.current !== null && influences) {
      influences[activeMorph.current] *= 0.9;
      if (influences[activeMorph.current] < 0.05) {
        influences[activeMorph.current] = 0;
        activeMorph.current = null;
      }
    }
    // Smoothly animate head rotation
    if (nodes.Wolf3D_Head) {
      nodes.Wolf3D_Head.parent.rotation.y += (headAngle - nodes.Wolf3D_Head.parent.rotation.y) * 0.1;
    }
  });

  // Crop camera to show only half-body
  return (
    <primitive object={scene} position={[0, -1, 0]} scale={[1.4, 1.4, 1.4]} />
  );
}

function Experience({ speakText, headTurn }) {
  return (
    <Canvas
      style={{ background: 'radial-gradient(circle, #2323ff 0%, #0a0a23 100%)', width: '100%', height: '100%' }}
    >
      <PerspectiveCamera makeDefault position={[0, 1.2, 2]} fov={35} near={0.1} far={10} />
      <ambientLight intensity={1.5} color={'#fff'} />
      <directionalLight position={[2, 4, 2]} intensity={1.5} color={'#aaffff'} />
      <pointLight position={[0, 2, 2]} intensity={2.2} color={'#00ffff'} />
      <LipSyncAvatar speakText={speakText} headTurn={headTurn} />
    </Canvas>
  );
}

export default Experience;
