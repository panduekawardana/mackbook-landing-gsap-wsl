import { PresentationControls } from '@react-three/drei';
import { useRef } from 'react';
import MacbookModel14 from '../models/Macbook-14';
import MacbookModel16 from '../models/Macbook-16';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MODELS, MACBOOK_SCALE_14, MACBOOK_SCALE_16, MACBOOK_SCALE_14_MOBILE, MACBOOK_SCALE_16_MOBILE } from '../../constants/macbook';

const ANIMATE_DURATION = 1;
const OFFSET_DISTANCE = 5;
const OFFSET_DISTANCE_MOBILE = 3;

const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATE_DURATION });
    }
  });
};

const moveGroup = (group, x) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATE_DURATION });
};

const ModelSwitcher = ({ model, isMobile }) => {
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const showLargeMacbook = model === MODELS.MACBOOK_16;

  useGSAP(() => {
    const currentOffset = isMobile ? OFFSET_DISTANCE_MOBILE : OFFSET_DISTANCE;

    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -currentOffset);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
   } else {
       moveGroup(smallMacbookRef.current, 0);
       moveGroup(largeMacbookRef.current, currentOffset);
 
       fadeMeshes(smallMacbookRef.current, 1);
       fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [model, isMobile]);

  const controlConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlConfig}>
          <group ref={largeMacbookRef}>
            <MacbookModel16 scale={isMobile ? MACBOOK_SCALE_16_MOBILE : MACBOOK_SCALE_16} />
          </group>

          <group ref={smallMacbookRef}>
            <MacbookModel14 scale={isMobile ? MACBOOK_SCALE_14_MOBILE : MACBOOK_SCALE_14} />
          </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
