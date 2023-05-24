import React from 'react'

const Navbar = () => {

  const scrollToSection = (id)=>{
    const element = document.getElementById(id);
    element.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className='h-14 px-20 flex justify-between items-center w-full z-50 bg-gradient-to-r from-[#9d9ffe] to-[#7a90fe]'>
        <img src="./assets/svgs/frLogo.png" className='h-10 bg-blue-400 text-blue-400 fill-blue-400' alt="" />
        <div className="font-['Viga'] text-white">
          <button onClick={()=>{scrollToSection('home')}} className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>HOME</button>
          <button onClick={()=>{scrollToSection('features')}} className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>FEATURES</button>
          <button onClick={()=>{scrollToSection('video')}} className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>VFT</button>
          <button onClick={()=>{scrollToSection('realtime')}} className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>RFT</button>
          <button onClick={()=>{scrollToSection('about')}} className='mx-4 transition-all duration-200 hover:text-red-600 font-inherit'>ABOUT US</button>
        </div>
    </div>
  )
}

export default Navbar