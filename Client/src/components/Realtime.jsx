import React from 'react'

const Realtime = ({imageUrl, modelPara, modelHeading, modelName}) => {
    return (
        <aside className={`flex flex-col ${modelName === "REALTIME" ? "items-start" : "items-end"} justify-center w-[40%]`}>
            <h2 className='text-3xl font-["Viga"] text-slate-600'>{modelName} FACE TRACKING</h2>
            <div className={`flex relative bottom-8 ${modelName === "REALTIME" ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`flex flex-col ${modelName === "REALTIME" ? "items-start" : "text-right items-end"}  justify-center w-50% py-6`}>
                    <h3 className='text-lg text-slate-700'>{modelHeading}</h3>
                    <p className="text-sm text-slate-600 my-2">{modelPara}</p>
                    <button className='py-2 px-4 rounded mt-2 bg-[#4A57EB] text-white'>Try Now</button>
                </div>
                <img src={`/assets/svgs/${imageUrl}`} className='w-[40%]' alt="" />
            </div>
        </aside>
    )
}

export default Realtime