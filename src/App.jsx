import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap';
import ShowCase from './components/Showcase'
import Performance from './components/Performance'
import Feature from './components/Feature'
import Highlights from './components/Highlights';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ProductViewer/>
      <ShowCase/>
      <Performance/>
      <Feature/>
      <Highlights/>
      <Footer/>
    </div>
  )
}

export default App
