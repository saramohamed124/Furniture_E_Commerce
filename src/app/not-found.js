import React from 'react'
import Image from 'next/image'

// Gif
import not_found_gif from '@public/imgs/not_found.gif'
const not_found = () => {
  return (
    <div className='w-full h-screen justify-items-center align-content-center bg-white py-6'>
      <p className='text-xl md:text-4xl font-bold text-[var(--main-color)!important]'>This Page is Not Found!</p>
      <Image src="/imgs/not_found.gif" width={500} height={500} alt="Not Found Gif" unoptimized/>
    </div>
  )
}

export default not_found
