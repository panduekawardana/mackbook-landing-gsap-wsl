import { Canvas } from '@react-three/fiber';
import StudioLights from './three/StudioLights';
import { features, featureSequence } from '../constants';
import clsx from 'clsx';
import { Suspense, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import MacbookModel from './models/Macbook';
import { Html } from '@react-three/drei';
import useMacbookStore from '../store/index.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const ModelScroll = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const groupRef = useRef();
  const {setTexture} = useMacbookStore();

  useEffect(() => {
    const videos = [];
    featureSequence.forEach((feature) => {
      const v = document.createElement('video');

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: 'auto',
        crossOrigin: 'anonymous',
      });
      v.load();
      videos.push(v);
    });

    return () => {
      videos.forEach((v) => {
        v.src = '';
        v.load();
      });
    };
  }, []);

  useGSAP(() => {
    // 3D Model rotation
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#features',
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#features',
        start: 'top top',
        end: '+=3000',
        scrub: 1,
      },
    });

    let lastIndex = -1;
    ScrollTrigger.create({
      trigger: '#features',
      start: 'top top',
      end: '+=3000',
      scrub: 1,
      onUpdate: (self) => {
        const index = Math.min(Math.floor(self.progress * 5), 4);
        if (index !== lastIndex) {
          setTexture(`/videos/feature-${index + 1}.mp4`);
          lastIndex = index;
        }
      },
    });

    // 3D SPIN
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: 'none',
      });
    }

    timeline
      .to('.box1', { opacity: 1, y: 0, delay: 1 })
      .to('.box2', { opacity: 1, y: 0 })
      .to('.box3', { opacity: 1, y: 0 })
      .to('.box4', { opacity: 1, y: 0 })
      .to('.box5', { opacity: 1, y: 0 });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }>
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Feature = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <Canvas id="f-canvas" camera={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0 overflow-hidden">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx('box', `box${index + 1}`, feature.styles)}>
            <img src={feature.icon} alt={feature.highlight}/>
            <p>
               <span className='text-white'>{feature.highlight}</span>
               {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
