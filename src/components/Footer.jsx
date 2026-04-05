import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer>
      <div className='info'>
         <p>More ways to shop: Find an Apple Store or other retailer near you. Or call 0000880 040 1996</p>
         <img src='/logo.svg' alt='Logo'/>
      </div>

      <hr/>

      <div className='links'>
         <p>Copyright 2026 Apple Inc. All rights reserved.</p>

         <ul>
            {footerLinks.map(({label, link}) => (
               <li key={label}>
                  <a href={link}>{label}</a>
               </li>
            ))}
         </ul>
      </div>
    </footer>
  )
}

export default Footer
