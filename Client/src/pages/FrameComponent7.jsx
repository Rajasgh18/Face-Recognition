import { useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FrameComponent7 = () => {
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
    navigate("/frame-114");
  }, [navigate]);

  const onWEBCAMFACETRACKINGClick = useCallback(() => {
    navigate("/frame-117");
  }, [navigate]);

  return (
    <div className="relative bg-white w-full h-[1080px] overflow-hidden text-left text-xl text-white font-inter">
      <div className="absolute top-[-28px] left-[864px] [background:linear-gradient(143.2deg,_#2152df_5.08%,_rgba(1,_16,_58,_0.98)_91.46%)] w-[1088px] h-[1142px]" />
      <div className="absolute top-[0px] left-[0px] bg-gray-100 w-[1920px] h-28 overflow-hidden flex flex-col py-[43px] px-[311px] box-border items-center justify-center gap-[10px]">
        <div className="w-[1145px] h-[46px] flex flex-col p-2.5 box-border items-start justify-start">
          <div className="w-[1017px] h-[26px] flex flex-row items-baseline justify-between">
            <b className="relative tracking-[0.02em] leading-[128.02%]">{` `}</b>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-[268px] h-[26px]">
              <div className="absolute top-[0px] left-[-0.17px] w-[299px] h-[26px]">
                <div className="absolute top-[0px] left-[0px] text-5xl tracking-[0.02em] leading-[128.02%] font-black font-inter text-white text-left">{`FACE RECOGNITION `}</div>
              </div>
              <div className="absolute top-[31px] left-[3.5px] rounded-3xs bg-gainsboro-100 w-[244px] h-1" />
            </button>
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
      <div className="absolute top-[152px] left-[88px] w-[872px] h-[869.37px] text-9xl text-black">
        <img
          className="absolute top-[0px] left-[0px] w-[612px] h-[251px]"
          alt=""
          src="/vector4.svg"
        />
        <div className="absolute top-[306px] left-[1px] w-[871px] h-[563.37px]">
          <div className="absolute top-[62px] left-[72px] tracking-[0.02em] leading-[128.02%] inline-block w-60 h-[30px]">
            pick an image
          </div>
          <div className="absolute top-[50.5px] left-[71.5px] box-border w-[262px] h-px border-t-[1px] border-solid border-black" />
          <div className="absolute top-[0px] left-[72px] tracking-[0.02em] leading-[128.02%] font-semibold inline-block w-[154px] h-[39px]">
            image.jpg
          </div>
          <img
            className="absolute top-[17.25px] left-[260.67px] w-[25px] h-[21px]"
            alt=""
            src="/polygon-11.svg"
          />
          <input
            className="absolute top-[19px] left-[412px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[237px] h-[63px] flex flex-row py-2.5 px-5 box-border items-center justify-center"
            type="file"
          />
          <div className="absolute top-[194px] left-[72px] tracking-[0.02em] leading-[128.02%] inline-block w-60 h-[30px]">
            pick an image
          </div>
          <div className="absolute top-[182.5px] left-[71.5px] box-border w-[262px] h-px border-t-[1px] border-solid border-black" />
          <div className="absolute top-[132px] left-[72px] tracking-[0.02em] leading-[128.02%] font-semibold inline-block w-[219px] h-[39px]">
            image.jpg
          </div>
          <img
            className="absolute top-[149.25px] left-[260.67px] w-[25px] h-[21px]"
            alt=""
            src="/polygon-11.svg"
          />
          <input
            className="absolute top-[152px] left-[412px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[237px] h-[63px] flex flex-row py-2.5 px-5 box-border items-center justify-center"
            type="file"
            required
            defaultChecked={true}
          />
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
          <div className="absolute top-[504.14px] left-[348.25px] w-[334.75px] h-[58.35px] text-17xl text-dodgerblue">
            <div className="absolute top-[57.85px] left-[-0.5px] box-border w-[201px] h-px border-t-[1px] border-solid border-black" />
            <div className="absolute top-[-0.14px] left-[-18.25px] text-5xl leading-[128.02%] text-black">
              scoreThreshold :
            </div>
            <div className="absolute top-[28.35px] left-[0px] text-xl leading-[128.02%] font-semibold text-black">
              0.5
            </div>
            <div className="absolute top-[1.31px] left-[176.75px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[1.31px] left-[255.75px] rounded bg-gainsboro-200 box-border w-[79px] h-[49.38px] border-[2px] border-solid border-dodgerblue" />
            <div className="absolute top-[1.98px] left-[208.75px] leading-[128.02%]">
              -
            </div>
            <div className="absolute top-[1.98px] left-[286.75px] leading-[128.02%]">
              +
            </div>
            <div className="absolute top-[1.31px] left-[176.75px] w-[162px] h-[49px]">
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
          <div className="absolute top-[530px] left-[31px] w-[160.25px] h-[33.37px] text-5xl">
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
          <div className="absolute top-[274px] left-[354px] rounded-lg bg-dodgerblue shadow-[0px_16px_25px_rgba(0,_0,_0,_0.25)] w-[300px] h-[65px] flex flex-row py-2.5 pr-[27px] pl-[15px] box-border items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default FrameComponent7;
