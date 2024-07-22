"use client"
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


function BackButton() {
    const router = useRouter()
    
    const goBack = () => {
        router.back()
    }

  return (
      <button className='fixed text-primary md:left-14 top-11 hidden md:block' onClick={goBack}>
          <ChevronLeft size={45}/>
    </button>
  )
}

export default BackButton