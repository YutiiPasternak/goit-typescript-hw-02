import styles from "./searchBar.module.css";

// Типізація пропсів
interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button className={styles.buttonStyled} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
