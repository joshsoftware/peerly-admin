import WhiteStarIcon from "../assets/images/icons/whiteStar.svg";

import PlatinumIcon from "../assets/images/icons/platinumReward.svg";
import GoldRewardIcon from "../assets/images/icons/goldReward.svg";
import SilverRewardIcon from "../assets/images/icons/silverReward.svg";

import ProfilePhoto from "../assets/images/person.png";

interface IProps {
  badgeType: "platinum" | "gold" | "silver" | "none";
  appretiationPoint: number;
}

const badgeColor = {
  platinum: "#FFB128",
  gold: "#888888",
  silver: "#CC6741",
  none: "#3069F6",
};

const LeaderboardCard = (props: IProps) => {
  const { badgeType, appretiationPoint } = props;

  let badgeIcon = "";
  switch (badgeType) {
    case "platinum":
      badgeIcon = PlatinumIcon;
      break;
    case "gold":
      badgeIcon = GoldRewardIcon;
      break;
    case "silver":
      badgeIcon = SilverRewardIcon;
      break;
    case "none":
      badgeIcon = "";
      break;
  }

  return (
    <li className="relative">
      <div
        style={{ borderColor: `${badgeColor[badgeType]}` }}
        className="size-16 min-w-16 min-h-16 rounded-full border-2"
      >
        {badgeIcon !== "" && (
          <div className="absolute top-0 right-0">
            <img src={badgeIcon} className="size-5 object-cover rounded-full" />
          </div>
        )}
        <img
          src={ProfilePhoto}
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <div
        style={{ backgroundColor: `${badgeColor[badgeType]}` }}
        className="absolute rounded-xl flex gap-1 -bottom-3 left-1 justify-center items-center p-1 text-[#FFFFFF] text-sm"
      >
        <img src={WhiteStarIcon} className="size-4" />
        <div>{appretiationPoint}</div>
      </div>
      <div className="absolute flex flex-col  -bottom-12 text-center">
        <span className="text-xs">Shailendra</span>
        <span className="text-xs">Kanherkar</span>
      </div>
    </li>
  );
};

export default LeaderboardCard;
