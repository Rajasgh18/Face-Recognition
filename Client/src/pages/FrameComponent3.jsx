import { useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FrameComponent3 = () => {
  const [frameDropdownAnchorEl, setFrameDropdownAnchorEl] = useState(null);
  const navigate = useNavigate();
  const frameDropdownOpen = Boolean(frameDropdownAnchorEl);
  const handleFrameDropdownClick = (event) => {
    setFrameDropdownAnchorEl(event.currentTarget);
  };
  const handleFrameDropdownClose = () => {
    setFrameDropdownAnchorEl(null);
  };

  const onFACERECOGNITIONClick = useCallback(() => {
    navigate("/frame-112");
  }, [navigate]);

  const onWEBCAMFACETRACKINGClick = useCallback(() => {
    navigate("/frame-118");
  }, [navigate]);

  return (
    <div className="relative bg-white w-full h-[1080px] overflow-hidden text-left text-9xl text-black font-inter">
      <div className="absolute top-[-28px] left-[864px] [background:linear-gradient(143.2deg,_#2152df_5.08%,_rgba(1,_16,_58,_0.98)_91.46%)] w-[1088px] h-[1142px]" />
      <video
        className="absolute top-[calc(50%_-_230px)] left-[1006px] shadow-[0px_22px_35px_rgba(0,_0,_0,_0.25)] w-[816px] h-[531px] overflow-hidden"
        controls
      >
        <source src="/recording_2023-05-09 0504192.mp4" />
      </video>
      <div className="absolute top-[145px] left-[30px] w-[837px] h-[798.35px]">
        <img
          className="absolute top-[0px] left-[24px] w-[690px] h-[283px]"
          alt=""
          src="/vector2.svg"
        />
        <div className="absolute top-[384px] left-[0px] w-[837px] h-[414.35px]">
          <div className="absolute top-[50.03px] left-[77.16px] tracking-[0.02em] leading-[128.02%]">
            pick an video
          </div>
          <div className="absolute top-[40.5px] left-[76.66px] box-border w-[196.02px] h-px border-t-[1px] border-solid border-black" />
          <div className="absolute top-[0px] left-[77.16px] tracking-[0.02em] leading-[128.02%] font-semibold">
            video.mp4
          </div>
          <img
            className="absolute top-[15.25px] left-[229.22px] w-[18.26px] h-[17px]"
            alt=""
            src="/polygon-1.svg"
          />
          <input
            className="absolute top-[15.5px] left-[331.22px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[237px] h-[63px] flex flex-row py-2.5 px-5 box-border items-center justify-center"
            type="file"
          />
          <div className="absolute top-[122.64px] left-[0px] tracking-[0.02em] leading-[128.02%]">{`choose face detector : `}</div>
          <div className="absolute top-[269px] left-[340px] w-[490px] flex flex-row items-center justify-start gap-[4px] text-11xl">
            <input
              className="cursor-pointer relative rounded-12xs bg-gainsboro-200 box-border w-[27px] h-[26px] border-[2px] border-solid border-dodgerblue"
              type="checkbox"
            />
            <div className="relative leading-[128.02%] inline-block w-[465px] shrink-0">
              Hide Bounding Boxes
            </div>
          </div>
          <div className="absolute top-[216px] left-[340px] w-[497px] flex flex-row items-center justify-start gap-[4px] text-11xl">
            <input
              className="cursor-pointer relative rounded-12xs bg-gainsboro-200 box-border w-[27px] h-[26px] border-[2px] border-solid border-dodgerblue"
              type="checkbox"
            />
            <div className="relative leading-[128.02%] inline-block w-[472px] shrink-0">
              Detect Face Landmark
            </div>
          </div>
          <div className="absolute top-[354px] left-[38px] w-[748px] h-[60.35px] text-17xl text-dodgerblue">
            <div className="absolute top-[57.99px] left-[408.75px] box-border w-[201px] h-px border-t-[1px] border-solid border-black" />
            <div className="absolute top-[0px] left-[391px] text-5xl leading-[128.02%] text-black">
              scoreThreshold :
            </div>
            <div className="absolute top-[28.49px] left-[409.25px] text-xl leading-[128.02%] font-semibold text-black">
              0.5
            </div>
            <div className="absolute top-[1.45px] left-[586px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[1.45px] left-[665px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[2.12px] left-[618px] leading-[128.02%]">
              -
            </div>
            <div className="absolute top-[2.12px] left-[696px] leading-[128.02%]">
              +
            </div>
            <div className="absolute top-[1.45px] left-[586px] w-[162px] h-[49px]">
              <div className="absolute top-[0px] left-[0px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
              <div className="absolute top-[0px] left-[79px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
              <div className="absolute top-[0.67px] left-[32px] leading-[128.02%]">
                -
              </div>
              <div className="absolute top-[0.67px] left-[110px] leading-[128.02%]">
                +
              </div>
            </div>
            <div className="absolute top-[59.85px] left-[24.75px] box-border w-[151px] h-px border-t-[1px] border-solid border-black" />
            <div className="absolute top-[2px] left-[0px] text-5xl leading-[128.02%] text-black">
              sacleFactor:
            </div>
            <div className="absolute top-[4.31px] left-[150px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[4.31px] left-[229px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[4.98px] left-[182px] leading-[128.02%]">
              -
            </div>
            <div className="absolute top-[4.98px] left-[259px] leading-[128.02%]">
              +
            </div>
            <div className="absolute top-[4.31px] left-[150px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[4.31px] left-[229px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[4.98px] left-[182px] leading-[128.02%]">
              -
            </div>
            <div className="absolute top-[4.98px] left-[259px] leading-[128.02%]">
              +
            </div>
            <div className="absolute top-[33.35px] left-[24.62px] text-xl leading-[128.02%] font-semibold text-black">
              0.709
            </div>
          </div>
          <div className="absolute top-[110.64px] left-[343px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[200px] h-[65px] flex flex-row py-2.5 px-[21px] box-border items-center justify-center">
            <div className="relative">
              <Button
                sx={{ width: 126 }}
                id="button-MTCNN"
                aria-controls="menu-MTCNN"
                aria-haspopup="true"
                aria-expanded={frameDropdownOpen ? "true" : undefined}
                onClick={handleFrameDropdownClick}
                color="primary"
              >
                MTCNN
              </Button>
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
        </div>
      </div>
      <div className="absolute top-[0px] left-[0px] bg-gray-200 w-[1920px] h-28 flex flex-row items-center justify-center gap-[108px]">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl tracking-[0.02em] leading-[128.02%] font-bold font-inter text-white text-left inline-block"
          onClick={onFACERECOGNITIONClick}
        >{`FACE RECOGNITION `}</button>
        <div className="relative w-[314px] h-7">
          <div className="absolute top-[0px] left-[-0.5px] w-[359px] h-[29px]">
            <div className="absolute top-[0px] left-[0px] w-[342px] h-[26px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0px] left-[0px] text-5xl tracking-[0.02em] leading-[128.02%] font-black font-inter text-white text-left inline-block w-[354px]">
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

export default FrameComponent3;
