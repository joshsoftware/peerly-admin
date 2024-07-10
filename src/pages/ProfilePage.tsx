import BackArrowIcon from "../assets/images/icons/backArrow.svg";
import ProfilePhoto from "../assets/images/person.png";
import GoldBadge from "../assets/images/icons/GoldBadge.svg";
import InformativeIcon from "../assets/images/icons/informativeIcon.svg";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import AppreciationCard from "../components/AppreciationCard";

interface IProps {
  onBackArrowClickHandler: VoidFunction;
}

const ProfilePage = (props: IProps) => {
  const { onBackArrowClickHandler } = props;

  const [isActive, setActiveVisibility] = useState(true);

  const toggleActiveVisibility = () => {
    setActiveVisibility((isActive) => !isActive);
  };

  return (
    <>
      {/* Back button profile */}
      <div className="mx-6 mt-6 flex items-center">
        <button className=" cursor-pointer" onClick={onBackArrowClickHandler}>
          <img src={BackArrowIcon} className="size-6" />
        </button>
        <div>
          <span className="text-base ml-4 font-semibold">Profile</span>
        </div>
      </div>
      {/* User Info */}
      <div className="relative mx-6 mt-6 flex rounded-lg bg-[#F5F8FF]">
        <div className="pl-4 py-4 flex">
          <img
            src={ProfilePhoto}
            className="size-16 border-[#3069F6] border-2 object-cover rounded-full"
          />
          <div className="flex pl-4 flex-col justify-center">
            <span className="text-base font-medium text-black">
              Mangesh Pawar
            </span>
            <span className="text-xs font-light">Technical Lead</span>
            <span className="text-xs font-light">Gold</span>
          </div>
          <div className=" absolute right-4 -top-7 flex flex-col w-14 justify-center items-center text-center">
            <img src={GoldBadge} className="size-14" />
            <span className="text-sm font-semibold mt-1">
              2000 Reward Points
            </span>
          </div>
        </div>
      </div>
      {/* Reward Balance */}
      <div className="relative mx-6 mt-6 flex flex-row rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-sm font-medium">Reward Balance</span>
            <img src={InformativeIcon} className="size-4 ml-2" />
          </div>
          <div className="flex">
            <span className="text-xs font-light">Refill on September 2024</span>
          </div>
        </div>
        <div className="size-12 p-1 -mt-2 ml-4 bg-[#F5F8FF] rounded-xl">
          <CircularProgressbarWithChildren
            strokeWidth={10}
            value={90}
            styles={buildStyles({
              pathColor: "#F3A552",
              trailColor: "transparent",
            })}
          >
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <img className="size-4" src="/goldenStar.svg" alt="gold star" />
          </CircularProgressbarWithChildren>
        </div>
      </div>
      {/* recived and expressed appreciations */}
      <div className="flex mt-6 justify-center">
        <div className="inline-flex rounded-md bg-[#F1F1F1]" role="group">
          <button
            type="button"
            onClick={toggleActiveVisibility}
            className={`${
              isActive === true ? "active" : ""
            } [&.active]:bg-[#3069F6] [&.active]:text-zinc-50 inline-flex items-center px-12 py-2 text-sm font-medium text-gray-900 bg-transparent rounded-s-xl rounded-e-xl focus:z-10`}
          >
            Received
          </button>
          <button
            type="button"
            onClick={toggleActiveVisibility}
            className={`${
              isActive === false ? "active" : ""
            } [&.active]:bg-[#3069F6]   [&.active]:text-zinc-50 inline-flex items-center px-12 py-2 text-sm font-medium text-gray-900 bg-transparent  rounded-s-xl rounded-e-xl  focus:z-10`}
          >
            Expressed
          </button>
        </div>
      </div>
      <div className="grid mt-6 grid-cols-2 px-6 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AppreciationCard onAppreciationCardClick={() => {}} />
        <AppreciationCard onAppreciationCardClick={() => {}} />
      </div>
    </>
  );
};

export default ProfilePage;
