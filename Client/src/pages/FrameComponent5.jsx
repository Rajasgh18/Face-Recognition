import { useState, useCallback, useRef, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import axios from 'axios';

const FrameComponent5 = () => {
  const [frameDropdownAnchorEl, setFrameDropdownAnchorEl] = useState(null);
  const navigate = useNavigate();
  const frameDropdownOpen = Boolean(frameDropdownAnchorEl);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [videoProcessed, setvideoProcessed] = useState(null);
  const [imageChecked, setImageChecked] = useState(null);
  const [timestamps, setTimestamps] = useState([]);


  const handleFrameDropdownClick = (event) => {
    setFrameDropdownAnchorEl(event.currentTarget);
  };
  const handleFrameDropdownClose = () => {
    setFrameDropdownAnchorEl(null);
  };

  const onFACERECOGNITIONClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onWEBCAMFACETRACKINGClick = useCallback(() => {
    navigate("/frame-116");
  }, [navigate]);

  useEffect(() => {
    const storeVideo = async () => {
      const videoForm = new FormData();
      videoForm.append("videoFile", video);
      const res = await axios.post('http://localhost:5000/process_video', videoForm);
      res.data === 'success' ? setvideoProcessed(true) : setvideoProcessed(false);
    }
    video && storeVideo();
  }, [video])

  useEffect(() => {
    const storeImage = async () => {
      const imageForm = new FormData();
      imageForm.append("image", image);
      const res = await axios.post('http://localhost:5000/detect', imageForm);
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
    <div className="relative bg-white w-full h-[1080px] overflow-hidden text-left text-9xl text-black font-inter">
      <div className="absolute top-[-28px] left-[864px] [background:linear-gradient(143.2deg,_#2152df_5.08%,_rgba(1,_16,_58,_0.98)_91.46%)] w-[1088px] h-[1142px]" />
      <div>
        {videoProcessed && <video src={`/assets/videos/${video.name}`} className="absolute top-[calc(50%_-_230px)] left-[1006px] shadow-[0px_22px_35px_rgba(0,_0,_0,_0.25)] w-[816px] h-[531px] overflow-hidden" controls>
        </video>}
      </div>
      <div className="absolute top-[145px] left-[30px] w-[837px] h-[803.35px]">
        <img
          className="absolute top-[0px] left-[24px] w-[690px] h-[283px]"
          alt=""
          src="/vector2.svg"
        />
        <div className="absolute top-[384px] left-[0px] w-[837px] h-[419.35px]">
          <div className="mr-20 flex">
            <div className="mx-10 flex items-center">
              <input style={{ display: "none" }} id="detection_video" type="file" onChange={(e) => { setVideo(e.target.files[0]) }} />
              <label htmlFor="detection_video" className="bg-dodgerblue m-4 cursor-pointer text-white p-4 rounded-xl shadow-[0px_16px_25px_rgba(0,_0,_0,_0.1)]">Select Video</label>
              <span className="mr-4">{video ? video.name : "No Video Selected"}</span>
              {videoProcessed !== null ? videoProcessed ? <TiTick className="h-14 w-14 fill-green-400" /> : <TiTimes className="h-14 w-14 fill-red-400" /> : ""}
            </div>
            <div className="flex items-center">
              <input style={{ display: "none" }} id="detection_image" type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
              <label htmlFor="detection_image" className="bg-dodgerblue m-4 cursor-pointer text-white p-4 rounded-xl shadow-[0px_16px_25px_rgba(0,_0,_0,_0.1)]">Select Image</label>
              <span>{image ? image.name : "No Image Selected"}</span>
            </div>
          </div>
          <div className="mt-10 ml-14">
            Detected at these timings of the Video :
            {imageChecked !== null ? imageChecked ?  timestamps.map((timestamp, index) => (
              <span key={index}>{timestamp} </span>
            )) : "The Face was not Detected!" : "No image choosen yet!"
            }
          </div>
          <div className="absolute top-[260.64px] left-[334px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[300px] h-[65px] flex flex-row py-2.5 px-[15px] box-border items-center justify-center">
            <div className="relative">
              <Button
                sx={{ width: 243.2987060546875 }}
                id="button-SSD Mobilenet V1 "
                aria-controls="menu-SSD Mobilenet V1 "
                aria-haspopup="true"
                aria-expanded={frameDropdownOpen ? "true" : undefined}
                onClick={handleFrameDropdownClick}
                color="primary"
              >{`SSD Mobilenet V1 `}</Button>
              <Menu
                anchorEl={frameDropdownAnchorEl}
                open={frameDropdownOpen}
                onClose={handleFrameDropdownClose}
              >
                <MenuItem onClick={handleFrameDropdownClose}>
                  SSD Mobilenet V1
                </MenuItem>
                <MenuItem onClick={handleFrameDropdownClose}>
                  Tiny Face Detector
                </MenuItem>
                <MenuItem onClick={handleFrameDropdownClose}>MTCNN</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="absolute top-[292.64px] left-[0px] tracking-[0.02em] leading-[128.02%]">{`choose face detector : `}</div>
          <div className="absolute top-[369px] left-[340px] w-[490px] flex flex-row items-center justify-start gap-[4px] text-11xl">
            <input
              className="cursor-pointer relative rounded-12xs bg-gainsboro-200 box-border w-[27px] h-[26px] border-[2px] border-solid border-dodgerblue"
              type="checkbox"
            />
            <div className="relative leading-[128.02%] inline-block w-[465px] shrink-0">
              Hide Bounding Boxes
            </div>
          </div>
          <div className="absolute top-[416px] left-[340px] w-[497px] flex flex-row items-center justify-start gap-[4px] text-11xl">
            <input
              className="cursor-pointer relative rounded-12xs bg-gainsboro-200 box-border w-[27px] h-[26px] border-[2px] border-solid border-dodgerblue"
              type="checkbox"
            />
            <div className="relative leading-[128.02%] inline-block w-[472px] shrink-0">
              Detect Face Landmark
            </div>
          </div>
          <div className="absolute top-[496px] left-[93px] w-[439.75px] h-[63.35px] text-5xl">
            <div className="absolute top-[62.85px] left-[-0.5px] box-border w-[290px] h-px border-t-[1px] border-solid border-black" />
            <div className="absolute top-[0px] left-[0px] leading-[128.02%]">
              miniConfidence :
            </div>
            <div className="absolute top-[29.35px] left-[0px] leading-[128.02%] font-semibold">
              0.5
            </div>
            <div className="absolute top-[6.31px] left-[277.75px] w-[162px] h-[49px] text-17xl text-dodgerblue">
              <div className="absolute top-[0px] left-[0px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
              <div className="absolute top-[0px] left-[79px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
              <div className="absolute top-[0.67px] left-[32px] leading-[128.02%]">
                -
              </div>
              <div className="absolute top-[0.67px] left-[110px] leading-[128.02%]">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[0px] left-[0px] bg-gray-200 w-[1920px] h-28 flex flex-row items-center justify-center gap-[108px]">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl tracking-[0.02em] leading-[128.02%] font-bold font-inter text-white text-left inline-block"
          onClick={onFACERECOGNITIONClick}
        >{`FACE RECOGNITION `}</button>
        <div className="relative w-[314px] h-7">
          <div className="absolute top-[0px] left-[-0.5px] w-[359px] h-[29px]">
            <div className="absolute top-[0px] left-[0px] w-[353px] h-[26px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0px] left-[0px] text-5xl tracking-[0.02em] leading-[128.02%] font-black font-inter text-white text-left inline-block">
                VIDEO FACE TRACKING
              </button>
            </div>
            <img
              className="absolute top-[27px] left-[2px] rounded-3xs w-[287px] h-1"
              alt=""
              src="/rectangle-20.svg"
            />
          </div>
        </div>
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl tracking-[0.02em] leading-[128.02%] font-bold font-inter text-white text-left inline-block"
          onClick={onWEBCAMFACETRACKINGClick}
        >
          WEBCAM FACE TRACKING
        </button>
      </div>
    </div>
  );
};

export default FrameComponent5;
