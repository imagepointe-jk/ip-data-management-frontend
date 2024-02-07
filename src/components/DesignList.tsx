import { useEffect, useState } from "react";
import { Design } from "../dbSchema";
import { fetchDesigns } from "../fetch";
import { parseDesigns } from "../validations";
import styles from "../styles/DesignList.module.css";

export function DesignList() {
  const [designs, setDesigns] = useState(null as Design[] | null);

  async function getDesigns() {
    try {
      const designsResponse = await fetchDesigns();
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
          <div className={styles["design-container"]}>
            #{design.designNumber}
          </div>
        ))}
    </div>
  );
}
