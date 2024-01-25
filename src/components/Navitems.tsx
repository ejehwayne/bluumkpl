'use client'


import { PRODUCT_CATEGORIES } from '@/config'
import React, { useEffect, useRef, useState } from 'react'
import NavItem from './Navitem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const Navitems = () => {
    const [activateIndex, setActivateIndex] = useState<null | number>(null)
 
      const isAnyOpen = activateIndex !== null

      useEffect(() => {
        const handler = (e : KeyboardEvent) => {
          if(e.key === "Escape") {
            setActivateIndex(null)
          }
        }

        document.addEventListener("keydown", handler)
        return () => {
          document.removeEventListener('keydown', handler)
        }
      }, [])

      const navRef = useRef<HTMLDivElement | null>(null)

 // Close the menu when clicking outside of it  

   useOnClickOutside(navRef, () => setActivateIndex(null))
  return (
    <div className='flex gap-4 h-full' ref={navRef}>
       {PRODUCT_CATEGORIES.map((category, i) => {
        
        const handleOpen = () => {
          if(activateIndex === i) {
            setActivateIndex(null)
          } else {
            setActivateIndex(i)
          }
        }
        
         const isOpen = i === activateIndex

        return(
          <NavItem category={category}
           handleOpen={handleOpen}
            isOpen={isOpen} 
            key={category.value}
            isAnyOpen={isAnyOpen}
            />
        )
       })} 
    </div>
  )
}

export default Navitems