import React, { useEffect, useState } from 'react'
import axios from 'axios';

const FaceTracking = ({ name, id }) => {

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [timestamps, setTimestamps] = useState([]);
    const [frames, setFrames] = useState([]);

    const storeImage = async (urlName) => {
        const formData = new FormData();
        formData.append('image', file1);
        try {
            const response = await axios.post(`http://localhost:5000/${urlName}`, formData);
            if (response.data.message === "success")
                setTimestamps(response.data.timestamps);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (id === "video")
            file1 && storeImage("detect");
        else
            file1 && storeImage("realtime");

    }, [file1, id]);

    id === "video" && useEffect(() => {
        const storeVideo = async () => {
            const formData = new FormData();
            formData.append('videoFile', file2);
            try {
                const response = await axios.post(`http://localhost:5000/process_video`, formData);
                console.log(response);
            } catch (error) {
                console.error(error)
            }
        }
        file2 && storeVideo();
    }, [file2])

    id === "realtime" && useEffect(() => {
        const storeVideo = async () => {
            const formData = new FormData();
            formData.append('image', file2);
            try {
                const response = await axios.post(`http://localhost:5000/realtime-download`, formData);
                if (response.data.message === "success") {
                    setTimestamps(response.data.timestamps);
                    setFrames(response.data.frames);
                }
            } catch (error) {
                console.error(error)
            }
        }
        file2 && storeVideo();
    }, [file2]);

    return (
        <aside id={id} className='my-28 flex flex-col items-center justify-center'>
            <h1 className='text-5xl m-20 font-["Viga"] text-slate-700'>{name} FACE TRACKING</h1>
            <div className='w-full flex'>
                <div className={`w-1/3 p-10 bg-[#8381FD] flex ${id === "video" ? "flex-col-reverse" : "flex-col"} flex-col items-center justify-center`}>
                    <input onChange={(e) => setFile1(e.target.files[0])} className='hidden' id={`${id === "video" ? "fbtn1" : "rbtn1"}`} type="file" />
                    <label htmlFor={`${id === "video" ? "fbtn1" : "rbtn1"}`} className='cursor-pointer p-4 bg-[#4A51ED] text-white text-2xl rounded-xl my-8'>Upload Image</label>
                    <input onChange={(e) => setFile2(e.target.files[0])} className='hidden' id={`${id === "video" ? "fbtn2" : "rbtn2"}`} type="file" />
                    <label htmlFor={`${id === "video" ? "fbtn2" : "rbtn2"}`} className={`cursor-pointer p-4 bg-[#4A51ED] text-white text-2xl rounded-xl my-8`}>{id === "realtime" ? "Download" : "Upload Video"}</label>
                </div>
                <div className='w-1/3 p-14 bg-[#5F64E6] flex items-center justify-center'>
                    <img src="/assets/svgs/faceTracking.svg" alt="" />
                </div>
                <div className='w-1/3 p-10 bg-[#2E3E8A] text-slate-300 overflow-y-auto flex flex-col items-center'>
                    <h3 className='text-3xl mb-2 text-white'>Timestamp</h3>
                    {(id === "realtime" && file2) || file1 !== null ? (timestamps.length !== 0 ? timestamps.map((timestamp, index) => (<p key={index}>Face Detected at {timestamp} seconds</p>)) : "No Face Detected!") : "No Image Selected!"}
                </div>
            </div>
            <div className='bg-[#b7b6ff] h-40 flex overflow-x-hidden'>
                {
                    frames?.map(frame => {
                        return <img src={'/assets/realtimeFrames/'+frame}/>
                    })
                }
            </div>
        </aside>
    )
}

export default FaceTracking