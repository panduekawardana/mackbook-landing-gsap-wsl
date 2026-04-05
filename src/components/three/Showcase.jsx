import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive"

const ShowCase = () => {
   const showcaseRef = useRef(null);

   // Responsive media
   const isTablet = useMediaQuery({query: '(max-width: 1024px)'});

   useGSAP(() => {
      if(!isTablet) {
         const q = gsap.utils.selector(showcaseRef);
         const timeLine = gsap.timeline({
            scrollTrigger: {
               trigger: showcaseRef.current,
               start: 'top top',
               end: 'bottom top',
               scrub: true,
               pin: true
            }
         })
         timeLine.to(q('.mask img'), {
            transform: 'scale(1.1)'
         }).to(q('.content'), {opacity: 1, y: 0, ease: 'power1.in'});
      }
   }, { dependencies: [isTablet], scope: showcaseRef });

  return (
    <section id="showcase" ref={showcaseRef}>
      <div className='media'>
         <video src='/videos/game.mp4' loop muted autoPlay playsInline />

         <div className="mask">
            <img src="/mask-logo.svg" alt="Apple logo mask" />
         </div>
      </div>

      <div className="content">
         <div className="wrapper">
            <div className="lg:max-w-md">
               <h2>Rocket Chip</h2>

               <div className="space-y-5 mt-7 pe-10">
                  <p>
                     Introducing <span className="text-white">M4, the next generation of Apple</span>. M4 powers
                  </p>
                  <p>
                     It drives Apple Intelligence on iPad Pro, so you can write, create, and accomplish more with ease. All in a design that's unbelievably thin, light, and powerful.
                  </p>
                  <p>A brand-new display engine delivers breathtaking precision, color accuracy, and brightness. And a next-gen GPU with hardware-accelerated ray tracing brings console-level graphics to your fingertips</p>
                  <p className="text-primary">Learn more about Apple Intelligence</p>
               </div>
            </div>

            <div className="max-w-3xs space-y-14">
               <div className="space-y-2">
                  <p>Up to</p>
                  <h3>4x faster</h3>
                  <p>Pro rendering performance than M2</p>
               </div>
               <div className="space-y-2">
                  <p>Up to</p>
                  <h3>1.5x</h3>
                  <p>CPU performance than M2</p>
               </div>
            </div>
         </div>
      </div>
    </section>
  )
}

export default ShowCase
