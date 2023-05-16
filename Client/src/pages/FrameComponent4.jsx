import { useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FrameComponent4 = () => {
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
    navigate("/frame-111");
  }, [navigate]);

  const onWEBCAMFACETRACKINGClick = useCallback(() => {
    navigate("/frame-117");
  }, [navigate]);

  return (
    <div className="relative bg-white w-full h-[1080px] overflow-hidden text-left text-17xl text-dodgerblue font-inter">
      <div className="absolute top-[-28px] left-[864px] [background:linear-gradient(143.2deg,_#2152df_5.08%,_rgba(1,_16,_58,_0.98)_91.46%)] w-[1088px] h-[1142px]" />
      <video
        className="absolute top-[calc(50%_-_230px)] left-[1006px] shadow-[0px_22px_35px_rgba(0,_0,_0,_0.25)] w-[816px] h-[531px] overflow-hidden"
        controls
      >
        <source src="/recording_2023-05-09 0504192.mp4" />
      </video>
      <div className="absolute top-[884.45px] left-[733px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
      <div className="absolute top-[885.12px] left-[764px] leading-[128.02%]">
        +
      </div>
      <div className="absolute top-[145px] left-[30px] w-[837px] h-[796.49px] text-9xl text-black">
        <img
          className="absolute top-[0px] left-[24px] w-[690px] h-[283px]"
          alt=""
          src="/vector3.svg"
        />
        <div className="absolute top-[384px] left-[0px] w-[837px] h-[412.49px]">
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
          <div className="absolute top-[110.64px] left-[334px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[300px] h-[65px] flex flex-row py-2.5 pr-[27px] pl-[15px] box-border items-center justify-center">
            <div className="relative">
              <Button
                sx={{ width: 243.2987060546875 }}
                id="button-Tiny Face Detector"
                aria-controls="menu-Tiny Face Detector"
                aria-haspopup="true"
                aria-expanded={frameDropdownOpen ? "true" : undefined}
                onClick={handleFrameDropdownClick}
                color="primary"
              >
                Tiny Face Detector
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
          <div className="absolute top-[411.99px] left-[446.75px] box-border w-[201px] h-px border-t-[1px] border-solid border-black" />
          <div className="absolute top-[354px] left-[429px] text-5xl leading-[128.02%]">
            scoreThreshold :
          </div>
          <div className="absolute top-[382.49px] left-[447.25px] text-xl leading-[128.02%] font-semibold">
            0.5
          </div>
          <div className="absolute top-[355.45px] left-[624px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
          <div className="absolute top-[356.12px] left-[656px] text-17xl leading-[128.02%] text-dodgerblue">
            -
          </div>
          <div className="absolute top-[355.45px] left-[624px] w-[162px] h-[49px] text-17xl text-dodgerblue">
            <div className="absolute top-[0px] left-[0px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[0px] left-[79px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[0.67px] left-[32px] leading-[128.02%]">
              -
            </div>
            <div className="absolute top-[0.67px] left-[110px] leading-[128.02%]">
              +
            </div>
          </div>
          <div className="absolute top-[375px] left-[100px] w-[160.25px] h-[33.37px] text-5xl">
            <div className="absolute top-[32.87px] left-[79.75px] box-border w-[81px] h-px border-t-[1px] border-solid border-black" />
            <div className="absolute top-[0px] left-[-28px] leading-[128.02%]">{`input size     `}</div>
            <div className="absolute top-[1.97px] left-[96.5px] text-lg leading-[128.02%] font-semibold">
              416
            </div>
            <img
              className="absolute top-[7.14px] left-[136.97px] w-[18.26px] h-[17px]"
              alt=""
              src="/polygon-3.svg"
            />
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
            <div className="absolute top-[0px] left-[0px] w-[237px] h-[26px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0px] left-[0px] text-5xl tracking-[0.02em] leading-[128.02%] font-black font-inter text-white text-left inline-block w-[361px]">
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

export default FrameComponent4;
