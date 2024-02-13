import { Link, useSearchParams } from "react-router-dom";
import styles from "../styles/PageControls.module.css";

type PageControlsProps = {
  totalPages: number;
  curPageNumber: number;
  curItemsPerPage: number;
  pageSizeChoices: number[];
};

export function PageControls({
  totalPages,
  curItemsPerPage,
  curPageNumber,
  pageSizeChoices,
}: PageControlsProps) {
  return (
    <div className={styles["main"]}>
      <PageNumberControl
        curPageNumber={curPageNumber}
        totalPages={totalPages}
      />
      <JumpToControl curPageNumber={curPageNumber} totalPages={totalPages} />
      <PageSizeControl
        curItemsPerPage={curItemsPerPage}
        pageSizeChoices={pageSizeChoices}
      />
    </div>
  );
}

type PageNumberControlProps = {
  totalPages: number;
  curPageNumber: number;
};

function PageNumberControl({
  curPageNumber,
  totalPages,
}: PageNumberControlProps) {
  const pageControlNumbers = addEllipsisToNumberArray(
    getPageControlNumbers(totalPages, curPageNumber)
  );
  const [searchParams] = useSearchParams();

  return (
    <div className={styles["controls-subsection"]}>
      <span className={styles["page-buttons-label"]}>Page</span>
      {pageControlNumbers.map((numberOrEllipsis) => {
        if (numberOrEllipsis === "...") return <div>...</div>;
        const newParams = new URLSearchParams(searchParams);
        newParams.set("pageNumber", `${numberOrEllipsis}`);

        return (
          <Link
            className={
              curPageNumber === numberOrEllipsis
                ? styles["page-active"]
                : styles["page-inactive"]
            }
            style={{
              pointerEvents:
                curPageNumber === numberOrEllipsis ? "none" : "initial",
            }}
            to={`?${newParams}`}
          >
            {numberOrEllipsis}
          </Link>
        );
      })}
    </div>
  );
}

type JumpToControlProps = {
  totalPages: number;
  curPageNumber: number;
};

function JumpToControl({ curPageNumber, totalPages }: JumpToControlProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function submitJumpToPage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const jumpToPage = formData.get("jump-to-page");
    const roundedPages = Math.ceil(totalPages);
    if (
      !jumpToPage ||
      isNaN(+jumpToPage) ||
      +jumpToPage < 1 ||
      +jumpToPage > roundedPages ||
      +jumpToPage === curPageNumber
    )
      return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pageNumber", `${+jumpToPage}`);
    setSearchParams(newSearchParams);
  }

  return (
    <div className={styles["controls-subsection"]}>
      <div>Jump To</div>
      <form
        className={styles["controls-subsection"]}
        onSubmit={submitJumpToPage}
      >
        <input
          className={styles["jump-to-page-input"]}
          type="number"
          name="jump-to-page"
          id="jump-to-page"
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

type PageSizeControlProps = {
  curItemsPerPage: number;
  pageSizeChoices: number[];
};

function PageSizeControl({
  curItemsPerPage,
  pageSizeChoices,
}: PageSizeControlProps) {
  const [searchParams] = useSearchParams();
  return (
    <div className={styles["controls-subsection"]}>
      <div>Results Per Page</div>
      {pageSizeChoices.map((choice, i) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("perPage", `${choice}`);
        newParams.set("pageNumber", "1");
        return (
          <Link
            className={
              (i === 0 && !curItemsPerPage) || curItemsPerPage === choice
                ? ""
                : "button-minor"
            }
            style={{
              pointerEvents:
                (i === 0 && !curItemsPerPage) || curItemsPerPage === choice
                  ? "none"
                  : "initial",
            }}
            to={`?${newParams}`}
          >
            {choice}
          </Link>
        );
      })}
    </div>
  );
}

function getPageControlNumbers(
  totalPages: number,
  currentPage: number
): number[] {
  const roundedPages = Math.ceil(totalPages);
  if (currentPage < 1 || currentPage > roundedPages) {
    console.error("The current page must be between 1 and totalPages.");
    return [];
  }

  const pageNumbers = Array.from(
    { length: roundedPages },
    (_, i) => i + 1
  ).filter((thisPage, i, arr) => {
    function distanceCondition(thisPage: number) {
      const distanceToStart = thisPage - 1;
      const distanceToEnd = roundedPages - thisPage;
      const distanceToCurrentPage = Math.abs(currentPage - thisPage);
      const currentPageIsLimit =
        currentPage === 1 || currentPage === roundedPages;
      return (
        distanceToStart === 0 ||
        distanceToEnd === 0 ||
        (currentPageIsLimit && distanceToCurrentPage < 3) ||
        (!currentPageIsLimit && distanceToCurrentPage < 2)
      );
    }
    const distanceConditionHere = distanceCondition(thisPage);
    const distanceConditionPrev = i > 1 ? distanceCondition(arr[i - 1]) : true;
    const distanceConditionNext =
      i < roundedPages ? distanceCondition(arr[i + 1]) : true;

    return (
      distanceConditionHere || (distanceConditionPrev && distanceConditionNext)
    );
  });

  return pageNumbers;
}

function addEllipsisToNumberArray(array: number[]): (number | "...")[] {
  const newArr: (number | "...")[] = [];
  for (let i = 0; i < array.length; i++) {
    newArr.push(array[i]);
    const deltaToNext = array[i + 1] - array[i];
    if (deltaToNext > 1) newArr.push("...");
  }
  return newArr;
}
