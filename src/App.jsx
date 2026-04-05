import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap';
import ShowCase from './components/three/Showcase'

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ProductViewer/>
      <ShowCase/>
    </div>
  )
}

export default App
