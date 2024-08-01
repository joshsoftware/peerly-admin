import AppreciationTable from "./components/table";
import { useGetAppreciationsQuery, useGetReportedAppreciationsQuery } from "./apiSlice";
import { useMemo, useState } from "react";

const Appreciations = () => {
  const { data: appreciations, isError: listAppreciationsError } = useGetAppreciationsQuery({
    page: 1,
    page_size: 10,
  });
  const { data: reportedAppreciations, isError: listReportedAppreciationsError} = useGetReportedAppreciationsQuery()
  const [filter, setFilter] = useState<string>("appreciations")

  const response = useMemo(() => {
    if(filter == "appreciations"){
      return appreciations?.data.appreciations
    }
    else if(filter == "reported"){
      return reportedAppreciations?.data.appreciations
    }

  },[filter, appreciations?.data.appreciations, reportedAppreciations?.data.appreciations])

  return (
    <>
      {listAppreciationsError || listReportedAppreciationsError ? (
            <h1>Error</h1>
      ) : (
        <AppreciationTable response={response} setFilter={setFilter} filter={filter} />
      )}
    </>
  );
};

export default Appreciations;
