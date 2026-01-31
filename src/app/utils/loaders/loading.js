import React from 'react'

// css
import './pageloader.css'
const PageLoader = () => {
  return (
        <div className="loader w-full h-screen flex flex-col justify-center items-center gap-4">
        <div className="sofa-parent">
            <div className="top-sofa"></div>
            <div className="bottom-sofa"></div>
        </div>
        <p>Loading</p>
        </div>
  )
}

export default PageLoader
