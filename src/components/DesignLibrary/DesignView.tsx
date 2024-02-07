import { Link, useParams } from "react-router-dom";
import { Design } from "../../dbSchema";

export function DesignView() {
  const { designId } = useParams();

  return (
    <div>
      <Link to="/design-library">Back</Link>
      <h1>{designId}</h1>
    </div>
  );
}
