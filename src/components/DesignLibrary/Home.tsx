import { useSearchParams } from "react-router-dom";
import { PageControls } from "../PageControls";
import { DesignList } from "./DesignList";
import { defaultPerPage, pageSizeChoices } from "../../constants";
import { useEffect, useState } from "react";
import { fetchDesigns } from "../../fetch";
import { parseDesigns } from "../../validations";
import { Design } from "../../dbSchema";

export function DesignLibraryHome() {
  const [designs, setDesigns] = useState(null as Design[] | null);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams] = useSearchParams();
  const pageNumberParam = searchParams.get("pageNumber");
  const perPageParam = searchParams.get("perPage");
  const totalPages = perPageParam
    ? totalResults / +perPageParam
    : totalResults / defaultPerPage;

  async function getDesigns() {
    try {
      const designsResponse = await fetchDesigns(searchParams);
      const json = await designsResponse.json();
      if (designsResponse.ok) {
        const parsed = parseDesigns(json);
        setDesigns(parsed.designs);
        setTotalResults(parsed.totalResults);
      } else {
        console.log(designsResponse);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDesigns();
  }, [searchParams]);

  return (
    <div>
      <h1>Design Library</h1>
      {designs && (
        <>
          <DesignList designs={designs} />
          <PageControls
            curItemsPerPage={perPageParam ? +perPageParam : defaultPerPage}
            curPageNumber={pageNumberParam ? +pageNumberParam : 1}
            pageSizeChoices={pageSizeChoices}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
