import React from 'react'

const FaceTracking = ({name, id}) => {
  return (
    <aside id={id} className='my-28 flex flex-col items-center justify-center'>
        <h1 className='text-5xl m-20 font-["Viga"] text-slate-700'>{name} FACE TRACKING</h1>
        <div className='w-full flex'>
            <div className='w-1/3 p-10 bg-[#8381FD] flex flex-col items-center justify-center'>
                <button className='p-4 bg-[#4A51ED] text-white text-2xl rounded-xl my-8'>Upload Image</button>
                <button className={`p-4 bg-[#4A51ED] text-white text-2xl rounded-xl my-8`}>{name === "realtime" ? "Download" : "Upload Video"}</button>
            </div>
            <div className='w-1/3 p-14 bg-[#5F64E6] flex items-center justify-center'>
                <img src="/assets/svgs/faceTracking.svg" alt="" />
            </div>
            <div className='w-1/3 p-10 bg-[#2E3E8A] flex flex-col items-center'>
                <h3 className='text-3xl text-white'>Timestamp</h3>
            </div>
        </div>
    </aside>
  )
}

export default FaceTracking