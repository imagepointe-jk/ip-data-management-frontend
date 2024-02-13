import { Link } from "react-router-dom";
import { Design } from "../../dbSchema";
import styles from "../../styles/DesignList.module.css";

type DesignListProps = {
  designs: Design[];
};

export function DesignList({ designs }: DesignListProps) {
  return (
    <div className={styles["main"]}>
      {designs.map((design) => (
        <Link to={`${design.id}`} key={design.id}>
          <div className={styles["design-container"]}>
            <img src={design.image.url} alt="" />
            <div>#{design.designNumber}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
