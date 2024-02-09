import { Link, useParams } from "react-router-dom";
import { Design } from "../../dbSchema";
import { useEffect, useState } from "react";
import { fetchSingleDesign } from "../../fetch";
import { parseSingleDesign } from "../../validations";

export function DesignView() {
  const { designId } = useParams();
  const [design, setDesign] = useState(null as Design | null);

  async function getDesign() {
    if (!designId) return;
    try {
      const response = await fetchSingleDesign(+designId);
      const json = await response.json();
      const parsed = parseSingleDesign(json);
      setDesign(parsed);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDesign();
  }, []);

  return (
    <div>
      <Link to="/design-library">Back</Link>
      <h1>{designId}</h1>
      {design && <img src={design.image.url} />}
    </div>
  );
}
