import React from 'react'

const Background = () => {
    return (
        <section className='w-full h-2/3 flex flex-col justify-center items-start'>
            <h1 className='font-["Viga"] ml-[10%] z-[1] text-6xl my-2 text-white'>WELCOME TO</h1>
            <h1 className='font-["Viga"] ml-[10%] z-[1] text-6xl my-2 text-white p-3 rounded bg-[#4A51ED]'>TRACKFLIX</h1>
            <img src="/assets/svgs/homeBg.svg" className='absolute h-2/3 w-full object-cover' alt="" />
            <img src="/assets/svgs/character.svg" className=' absolute h-2/3 w-full object-contain z-10' alt="" />
        </section>
    )
}

export default Background