import ProfilePhoto from "../assets/images/person.png";
import InformativeIcon from "../assets/images/icons/informativeIcon.svg";
import ReportIcon from "../assets/images/icons/reportIcon.svg";
import { useState } from "react";

const AppreciationDetailCard = () => {
  const [sliderValue, setSliderValue] = useState("100");

  return (
    // h-[calc(100vh-200px)]
    <div className="relative mt-14 w-80 min-w-80 bg-[#F7F7F7] h-full rounded-2xl">
      {/* Profile Photos */}
      <div className="absolute flex justify-center items-center left-[45%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="size-24 rounded-r-full rounded-t-full rounded-b-full bg-zinc-100 border-[#3069F6] border-2">
          <img
            src={ProfilePhoto}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        {/* <div className=" z-10 before:top-0 before:absolute before:-right-9 before:size-12 before:rounded-full  before:border-[#3069F6] before:border-2"></div> */}
        <div className="absolute -right-9 size-16 rounded-r-full rounded-t-full rounded-b-full bg-zinc-100">
          <div className="absolute top-0 left-0 w-full h-full border-2 border-solid border-transparent border-t-[#3069F6] rounded-[100%] transform rotate-[290deg]"></div>
          <img
            src={ProfilePhoto}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
      </div>
      {/* Info */}
      <div className="mt-16">
        <div className="flex justify-center items-center flex-col">
          <span className="text-base font-medium">Mangesh Pawar</span>
          <span className="text-xs font-light">Technical Lead</span>
          <div className="bg-[#F5E6D6] text-sm px-3 py-1 rounded-xl mt-4">
            <span>Technical Excellence</span>
          </div>
        </div>

        <div className="bg-[#F5E6D6] font-light text-sm px-4 py-2 rounded-xl mt-4 mx-4">
          <span className="break-words">
            We are committed to delivering excellence in every product, service,
            and experience we provide, striving for continuous improvement.
          </span>
        </div>
        <div className="pl-6 mt-4">
          <span className="text-xs">
            Words by <span className="font-bold">Manas Joshi</span>
          </span>
        </div>

        <div className="bg-white font-normal text-sm p-3 rounded-xl mt-1 mx-4 max-h-80 overflow-auto">
          <span className="break-words">
            Lorem Ipsumis simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop. Lorem Ipsumis simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop.
          </span>
        </div>
        <div className="mt-4 pl-4 flex gap-2 justify-start items-center">
          <span className="text-xs font-medium">Ratings</span>
          <img src={InformativeIcon} className="size-4" />
          <span className="text-xs font-normal">4 peoples rated</span>
        </div>
        <div className="my-4 pl-4 flex gap-2 justify-start items-start">
          <img src={ReportIcon} className="size-6" />
          <div className="relative mb-6 w-full px-6">
            <input
              id="labels-range-input"
              type="range"
              value={sliderValue}
              min="100"
              max="1500"
              onChange={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setSliderValue(event.target.value);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-500 absolute start-6 -bottom-6">
              Good
            </span>
            <span className="text-sm text-gray-500  absolute start-36  -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
              Nice
            </span>
            <span className="text-sm text-gray-500 absolute end-4 -bottom-6">
              Love
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppreciationDetailCard;
