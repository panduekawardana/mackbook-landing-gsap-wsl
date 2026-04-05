import useMacbookStore from '../store';
import clsx from 'clsx';
import { Canvas } from '@react-three/fiber';
import MacbookModel14 from './models/Macbook-14';
import StudioLights from './three/StudioLights';
import ModelSwitcher from './three/ModelSwitcher';
import { MODELS, MACBOOK_SCALE_14, MACBOOK_SCALE_16 } from '../constants/macbook';
import { useMediaQuery } from 'react-responsive';

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMacbookStore();
  const isMobile = useMediaQuery({query: '(max-width: 1024px)'});
  
  const activeModel = scale === MACBOOK_SCALE_16 ? MODELS.MACBOOK_16 : MODELS.MACBOOK_14;
  
  return (
    <section id="product-viewer" className="overflow-hidden">
      <h2>Take a closer look.</h2>
      <div className="controls">
        <p className="info">MacBookPro | Available in 14" & 16" | Space Gray & Dark Colors</p>

        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div onClick={() => setColor('#adb5bd')} className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')} />
            <div onClick={() => setColor('#2e2c2e')} className={clsx('bg-neutral-900', color === '#2e2c2e' && 'active')} />
          </div>

          <div className="size-control">
            <div onClick={() => setScale(MACBOOK_SCALE_14)} className={clsx(scale === MACBOOK_SCALE_14 ? 'bg-white text-black' : 'bg-transparent')}>
              <p>14"</p>
            </div>
            <div onClick={() => setScale(MACBOOK_SCALE_16)} className={clsx(scale === MACBOOK_SCALE_16 ? 'bg-white text-black' : 'bg-transparent')}>
              <p>16"</p>
            </div>
          </div>
        </div>
      </div>
      <Canvas id='canvas' style={{ touchAction: 'none' }} camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>
        <StudioLights />

        <ModelSwitcher model={activeModel} isMobile={isMobile} />
      </Canvas>
    </section>
  );
};

export default ProductViewer;
