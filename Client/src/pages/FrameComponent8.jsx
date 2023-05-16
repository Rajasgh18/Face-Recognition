import { useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FrameComponent8 = () => {
  const [frameDropdownAnchorEl, setFrameDropdownAnchorEl] = useState(null);
  const navigate = useNavigate();
  const frameDropdownOpen = Boolean(frameDropdownAnchorEl);
  const handleFrameDropdownClick = (event) => {
    setFrameDropdownAnchorEl(event.currentTarget);
  };
  const handleFrameDropdownClose = () => {
    setFrameDropdownAnchorEl(null);
  };

  const onVIDEOFACETRACKINGClick = useCallback(() => {
    navigate("/frame-113");
  }, [navigate]);

  const onWEBCAMFACETRACKINGClick = useCallback(() => {
    navigate("/frame-116");
  }, [navigate]);

  return (
    <div className="relative bg-white w-full h-[1080px] overflow-hidden text-left text-9xl text-black font-inter">
      <div className="absolute top-[-28px] left-[864px] [background:linear-gradient(143.2deg,_#2152df_5.08%,_rgba(1,_16,_58,_0.98)_91.46%)] w-[1088px] h-[1142px]" />
      <img
        className="absolute top-[calc(50%_+_58px)] left-[1011px] w-[674px] h-[453px] overflow-hidden object-cover"
        alt=""
        src="/vectary-layout@2x.png"
      />
      <img
        className="absolute top-[calc(50%_-_422px)] left-[1004px] w-[686px] h-[465px] overflow-hidden object-cover"
        alt=""
        src="/vectary-layout1@2x.png"
      />
      <div className="absolute top-[1018.5px] left-[142.5px] box-border w-[299px] h-px border-t-[1px] border-solid border-black" />
      <div className="absolute top-[152px] left-[88px] w-[854px] h-[860px]">
        <img
          className="absolute top-[0px] left-[0px] w-[612px] h-[251px]"
          alt=""
          src="/vector4.svg"
        />
        <div className="absolute top-[306px] left-[1px] w-[853px] h-[554px]">
          <div className="absolute top-[62px] left-[54px] tracking-[0.02em] leading-[128.02%] inline-block w-[214px] h-[30px]">
            pick an image
          </div>
          <div className="absolute top-[50.5px] left-[53.5px] box-border w-[262px] h-px border-t-[1px] border-solid border-black" />
          <div className="absolute top-[0px] left-[54px] tracking-[0.02em] leading-[128.02%] font-semibold inline-block w-[195px] h-[39px]">
            image.jpg
          </div>
          <img
            className="absolute top-[17.25px] left-[242.67px] w-[25px] h-[21px]"
            alt=""
            src="/polygon-11.svg"
          />
          <input
            className="absolute top-[19px] left-[394px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[237px] h-[63px] flex flex-row py-2.5 px-5 box-border items-center justify-center"
            type="file"
          />
          <div className="absolute top-[194px] left-[54px] tracking-[0.02em] leading-[128.02%] inline-block w-[214px] h-[30px]">
            pick an image
          </div>
          <div className="absolute top-[182.5px] left-[53.5px] box-border w-[262px] h-px border-t-[1px] border-solid border-black" />
          <div className="absolute top-[132px] left-[54px] tracking-[0.02em] leading-[128.02%] font-semibold inline-block w-[195px] h-[39px]">
            image.jpg
          </div>
          <img
            className="absolute top-[149.25px] left-[242.67px] w-[25px] h-[21px]"
            alt=""
            src="/polygon-11.svg"
          />
          <input
            className="absolute top-[152px] left-[394px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[237px] h-[63px] flex flex-row py-2.5 px-5 box-border items-center justify-center"
            type="file"
            required
            defaultChecked={true}
          />
          <div className="absolute top-[274px] left-[350px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[300px] h-[65px] flex flex-row py-2.5 px-[15px] box-border items-center justify-center">
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
          <div className="absolute top-[284px] left-[0px] tracking-[0.02em] leading-[128.02%] inline-block w-[344px]">{`choose face detector : `}</div>
          <div className="absolute top-[432px] left-[354px] flex flex-row items-center justify-start gap-[10px] text-11xl">
            <input
              className="cursor-pointer relative rounded-12xs bg-gainsboro-200 box-border w-[27px] h-[26px] border-[2px] border-solid border-dodgerblue"
              type="checkbox"
            />
            <div className="relative leading-[128.02%] inline-block w-[482px] shrink-0">
              Hide Bounding Boxes
            </div>
          </div>
          <div className="absolute top-[383px] left-[354px] flex flex-row items-center justify-start gap-[10px] text-11xl">
            <input
              className="cursor-pointer relative rounded-12xs bg-gainsboro-200 box-border w-[27px] h-[26px] border-[2px] border-solid border-dodgerblue"
              type="checkbox"
            />
            <div className="relative leading-[128.02%] inline-block w-[495px] shrink-0">
              Detect Face Landmark
            </div>
          </div>
          <div className="absolute top-[500px] left-[52px] text-5xl leading-[128.02%] inline-block w-[250px]">
            miniConfidence :
          </div>
          <div className="absolute top-[528px] left-[52px] text-xl leading-[128.02%] font-semibold inline-block w-[76px]">
            0.5
          </div>
          <div className="absolute top-[505px] left-[398px] w-[162px] h-[49px] text-17xl text-dodgerblue">
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
      <div className="absolute top-[0px] left-[0px] bg-gray-100 w-[1920px] h-28 overflow-hidden flex flex-col py-[43px] px-[311px] box-border items-center justify-center gap-[10px] text-xl text-white">
        <div className="w-[1145px] h-[46px] flex flex-col p-2.5 box-border items-start justify-start">
          <div className="w-[1017px] h-[26px] flex flex-row items-baseline justify-between">
            <b className="relative tracking-[0.02em] leading-[128.02%]">{` `}</b>
            <div className="relative w-[268px] h-[26px] text-5xl">
              <div className="absolute top-[0px] left-[-0.17px] w-[299px] h-[26px]">
                <div className="absolute top-[0px] left-[0px] tracking-[0.02em] leading-[128.02%] font-black">{`FACE RECOGNITION `}</div>
              </div>
              <div className="absolute top-[31px] left-[3.5px] rounded-3xs bg-gainsboro-100 w-[244px] h-1" />
            </div>
            <button
              className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl tracking-[0.02em] leading-[128.02%] font-bold font-inter text-white text-left inline-block"
              onClick={onVIDEOFACETRACKINGClick}
            >
              VIDEO FACE TRACKING
            </button>
            <button
              className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl tracking-[0.02em] leading-[128.02%] font-bold font-inter text-white text-left inline-block"
              onClick={onWEBCAMFACETRACKINGClick}
            >
              WEBCAM FACE TRACKING
            </button>
          </div>
        </div>
        <div className="relative bg-gainsboro-100 w-[192.34px] h-0" />
      </div>
    </div>
  );
};

export default FrameComponent8;
