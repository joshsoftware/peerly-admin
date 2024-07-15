import Select from "react-select";

const colourOptions = [
  { label: "Shailendra Kaherkar", value: "SK1" },
  { label: "Shailendra Kaherkar", value: "SK2" },
  { label: "Shailendra Kaherkar", value: "SK3" },
  { label: "Shailendra Kaherkar", value: "SK4" },
  { label: "Shailendra Kaherkar", value: "SK5" },
  { label: "Shailendra Kaherkar", value: "SK6" },
  { label: "Shailendra Kaherkar", value: "SK7" },
  { label: "Shailendra Kaherkar", value: "SK8" },
];

const PostAppreciationForm = () => {
  return (
    <form className="max-w-80 mx-auto mt-8">
      <div className="mb-5">
        <label
          htmlFor="co-workers"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Co-worker Name
        </label>

        <Select
          className="basic-single"
          classNamePrefix="select-co-worker"
          placeholder="Select co-worker"
          defaultValue={null}
          isSearchable
          name="color"
          options={colourOptions}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "#3069F6" : "#A0A0A0",
              paddingTop: "4px",
              paddingBottom: "4px",
              paddingLeft: "8px",
              paddingRight: "8px",
              fontSize: "14px",
            }),
          }}
        />
      </div>
      <div className="mb-5">
        <div>
          <label
            htmlFor="core-values"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Core values
          </label>
        </div>

        <Select
          className="basic-single"
          classNamePrefix="select-co-worker"
          placeholder="Select core value"
          defaultValue={null}
          isSearchable
          name="color"
          options={colourOptions}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "#3069F6" : "#A0A0A0",
              paddingTop: "4px",
              paddingBottom: "4px",
              paddingLeft: "8px",
              paddingRight: "8px",
              fontSize: "14px",
            }),
          }}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          id="message"
          rows={15}
          className="block p-2.5 w-full resize-none text-sm text-gray-900 rounded-lg border border-[#A0A0A0] focus:ring-[#3069F6] focus:border-[#3069F6] "
          placeholder="Start typing about apprecitation..."
        ></textarea>
      </div>
      <button
        type="submit"
        className="text-white bg-[#3069F6] focus:ring-blue-300 font-medium rounded-lg text-base w-full px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};

export default PostAppreciationForm;
