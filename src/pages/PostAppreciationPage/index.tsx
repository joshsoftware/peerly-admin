import PostAppreciationForm from "./PostAppreciationForm";

import BackArrowIcon from "../../assets/images/icons/backArrow.svg";

interface IProps {
  onBackArrowClickHandler: VoidFunction;
}

const PostAppreciationPage = (props: IProps) => {
  const { onBackArrowClickHandler } = props;

  return (
    <>
      {/* Back button profile */}
      <div className="mx-6 mt-6 flex items-center">
        <button className=" cursor-pointer" onClick={onBackArrowClickHandler}>
          <img src={BackArrowIcon} className="size-6" />
        </button>
        <div>
          <span className="text-base ml-4 font-semibold">Appreciation</span>
        </div>
      </div>
      <PostAppreciationForm />
    </>
  );
};

export default PostAppreciationPage;
