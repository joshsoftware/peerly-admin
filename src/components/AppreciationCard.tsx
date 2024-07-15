import BlackStarIcon from "../assets/images/icons/blackStar.svg";
import ProfilePhoto from "../assets/images/person.png";

interface IProps {
  onAppreciationCardClick: VoidFunction;
}

const AppreciationCard = (props: IProps) => {
  const { onAppreciationCardClick } = props;
  return (
    <div
      className="bg-[#F7F7F7] rounded-2xl w-full min-h-36  relative mt-8 cursor-pointer"
      onClick={onAppreciationCardClick}
    >
      {/* Appreciations Points */}
      <div className="bg-[#F7F7F7] w-12 h-6 absolute -top-3 rounded-t-lg right-0 gap-1 flex justify-center items-center text-xs">
        <img src={BlackStarIcon} className="size-3" />
        <div>40</div>
      </div>
      {/* Images */}
      <div className="absolute flex justify-center items-center -top-8">
        <div className="size-16 rounded-r-full rounded-t-full rounded-b-full bg-zinc-100 border-[#3069F6] border-2">
          <img
            src={ProfilePhoto}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div className="absolute -right-9 size-12 rounded-r-full rounded-t-full rounded-b-full bg-zinc-100">
          <div className="absolute top-0 left-0 w-full h-full border-2 border-solid border-transparent border-t-[#3069F6] rounded-[50%] transform rotate-[270deg]"></div>
          <img
            src={ProfilePhoto}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-col mt-10 mb-12 pl-3">
        <span className="text-sm text-[#151515] font-semibold">
          Mangesh Pawar
        </span>
        <span className="text-[10px] text-[#000000]">Technical Lead</span>
        <span className="text-[10px] text-[#797979] pt-2">Appreciated by</span>
        <span className="text-sm text-[#151515] font-semibold">
          Manas Joshi
        </span>
        <span className="text-[10px] text-[#797979]">10 Days ago</span>
      </div>
      {/* Core Value */}
      <div className="flex justify-center flex-col items-center bg-[#F5E6D6] absolute bottom-0 w-full rounded-b-2xl py-1">
        <div className="text-[10px] text-[#1F1F1F]">Core Value</div>
        <div className="text-[10px] text-[##1F1F1F] font-medium ">
          Technical Excellence
        </div>
      </div>
    </div>
  );
};

export default AppreciationCard;
