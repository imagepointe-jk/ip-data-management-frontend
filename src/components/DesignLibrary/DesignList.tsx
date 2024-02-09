import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Design } from "../../dbSchema";
import { fetchDesigns } from "../../fetch";
import styles from "../../styles/DesignList.module.css";
import { parseDesigns } from "../../validations";

export function DesignList() {
  const [designs, setDesigns] = useState(null as Design[] | null);
  const [searchParams] = useSearchParams();

  async function getDesigns() {
    try {
      const designsResponse = await fetchDesigns(searchParams);
      const json = await designsResponse.json();
      if (designsResponse.ok) {
        const parsed = parseDesigns(json);
        setDesigns(parsed);
      } else {
        console.log(designsResponse);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDesigns();
  }, []);

  return (
    <div className={styles["main"]}>
      {designs &&
        designs.map((design) => (
          <Link to={`${design.id}`}>
            <div className={styles["design-container"]}>
              <img src={design.image.url} alt="" />
              <div>#{design.designNumber}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}
