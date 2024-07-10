import BackArrowIcon from "../assets/images/icons/backArrow.svg";
import AppreciationDetailCard from "../components/AppreciationDetailCard";

interface IProps {
  onBackArrowClickHandler: VoidFunction;
}

const AppreciationPage = (props: IProps) => {
  const { onBackArrowClickHandler } = props;
  return (
    <>
      <div>
        <button
          className="mx-6 mt-6 cursor-pointer"
          onClick={onBackArrowClickHandler}
        >
          <img src={BackArrowIcon} className="size-6" />
        </button>
      </div>
      {/* <ul className="flex gap-4 pl-6 mt-4 pb-6 overflow-auto scroll-smooth focus:scroll-auto"> */}
      <div className="flex gap-4 pl-8 overflow-auto scroll-smooth focus:scroll-auto">
        {/* w-[85%] min-w-[calc(100vw-50px)] */}
        <AppreciationDetailCard />
        <AppreciationDetailCard />
        <AppreciationDetailCard />
        <AppreciationDetailCard />
        <AppreciationDetailCard />
        <AppreciationDetailCard />
        <AppreciationDetailCard />
        <AppreciationDetailCard />
      </div>
    </>
  );
};

export default AppreciationPage;
