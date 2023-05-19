import { useState, useCallback, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import axios from 'axios';

const FrameComponent2 = () => {
  const [frameDropdownAnchorEl, setFrameDropdownAnchorEl] = useState(null);
  const navigate = useNavigate();
  const frameDropdownOpen = Boolean(frameDropdownAnchorEl);

  const [image, setImage] = useState(null);
  // const [webcamProcessed, setWebcamProcessed] = useState(null);
  // const [imageChecked, setImageChecked] = useState(null);
  // const [timestamps, setTimestamps] = useState([]);


  const onFACERECOGNITIONClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onVIDEOFACETRACKINGClick = useCallback(() => {
    navigate("/frame-113");
  }, [navigate]);


  // const storeWebcamEncoding = async () => {
  //   const res = await axios.get('http://localhost:5000/realtime');
  //   res.data === 'success' ? setWebcamProcessed(true) : setWebcamProcessed(false);
  // }

  useEffect(() => {
    const storeImage = async () => {
      const imageForm = new FormData();
      imageForm.append("image", image);
      const res = await axios.post('http://localhost:5000/realtime_detection', imageForm);
      if (res.data.message === "success") {
        setTimestamps(res.data.timestamps);
        setImageChecked(true);
      } else {
        setImageChecked(false);
      }

    }
    image && storeImage();
  }, [image])

  return (
    <div className="relative bg-white h-[1080px] overflow-hidden text-left text-9xl text-black font-inter">
      <div className="absolute top-[-28px] left-[864px] [background:linear-gradient(143.2deg,_#2152df_5.08%,_rgba(1,_16,_58,_0.98)_91.46%)] w-[1088px] h-[1142px]" />
      <video
        className="absolute top-[calc(50%_-_230px)] left-[1006px] shadow-[0px_22px_35px_rgba(0,_0,_0,_0.25)] w-[816px] h-[531px] overflow-hidden"
        controls
      >
        <source src="/videoplayback2.webm" />
      </video>
      <div className="absolute top-[168px] left-[29px] w-[838px] h-[780.35px]">
        <div className="absolute top-[240px] left-[1px] w-[837px] h-[419.35px]">
          <div className="ml-72 flex">
            {/* <div className="mx-10 flex items-center">
              <button onClick={storeWebcamEncoding} className="bg-dodgerblue m-4 cursor-pointer text-white p-4 rounded-xl shadow-[0px_16px_25px_rgba(0,_0,_0,_0.1)]">Open Webcam</button>
              <span className="mr-4">{webcamProcessed ? "Data Processed" : "No Data processed"}</span>
              {webcamProcessed !== null ? webcamProcessed ? <TiTick className="h-14 w-14 fill-green-400" /> : <TiTimes className="h-14 w-14 fill-red-400" /> : ""}
            </div> */}
            <div className="flex items-center">
              <input style={{ display: "none" }} id="realtime_detection_image" type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
              <label htmlFor="realtime_detection_image" className="bg-dodgerblue m-4 cursor-pointer text-white p-4 rounded-xl shadow-[0px_16px_25px_rgba(0,_0,_0,_0.1)]">Select Image</label>
              <span>{image ? image.name : "No Image Selected"}</span>
            </div>
          </div>
          {/* <div className="mt-10 ml-14 text-xl font-medium">
            Detected at these timings of the Video : 
            {imageChecked !== null ? imageChecked ? timestamps.map((timestamp, index) => (
              <p className="ml-10 text-[16px] font-normal" key={index}>Matching Face found at: {timestamp}</p>
            )) : " The Face was not Detected!" : " No image choosen yet!"
            }
          </div> */}
        </div>
        <img
          className="absolute top-[0px] left-[0px] w-[792px] h-[191px]"
          alt=""
          src="/vector.svg"
        />
      </div>
      <div className="absolute top-[0px] left-[0px] bg-gray-200 w-[1920px] h-28 flex flex-row items-center justify-center gap-[107px] text-5xl text-white">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl tracking-[0.02em] leading-[128.02%] font-bold font-inter text-white text-left inline-block"
          onClick={onFACERECOGNITIONClick}
        >{`FACE RECOGNITION `}</button>
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl tracking-[0.02em] leading-[128.02%] font-bold font-inter text-white text-left inline-block"
          onClick={onVIDEOFACETRACKINGClick}
        >
          VIDEO FACE TRACKING
        </button>
        <div className="relative w-[356px] h-[30px]">
          <div className="absolute top-[28px] left-[1.5px] rounded-3xs bg-gainsboro-100 w-[330px] h-1" />
          <div className="absolute top-[0px] left-[-0.5px] w-[367px] h-[26px]">
            <div className="absolute top-[0px] left-[0px] tracking-[0.02em] leading-[128.02%] font-black">
              WEBCAM FACE TRACKING
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
