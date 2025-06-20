import { RiseLoader } from "react-spinners";
import styles from "./loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderStyle}>
      <RiseLoader />
    </div>
  );
};

export default Loader;
