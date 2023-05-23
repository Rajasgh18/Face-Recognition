import React from 'react'

const Navbar = () => {
  return (
    <div className='h-14 px-20 flex justify-between items-center w-full z-50 bg-gradient-to-r from-[#9d9ffe] to-[#7a90fe]'>
        <img src="./assets/svgs/frLogo.png" className='h-10 bg-blue-400 text-blue-400 fill-blue-400' alt="" />
        <div className="font-['Viga'] text-white">
          <button className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>HOME</button>
          <button className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>FEATURES</button>
          <button className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>VFT</button>
          <button className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>RFT</button>
          <button className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>ABOUT US</button>
        </div>
    </div>
  )
}

export default Navbar