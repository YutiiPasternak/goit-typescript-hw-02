import styles from "./imageCard.module.css";

type ImageItem = {
  urls: {
    small: string;
  };
  alt_description: string;
};

type ImageCardProps = {
  item: ImageItem;
  onClick: (item: ImageItem) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ item, onClick }) => {
  const { urls, alt_description } = item;

  return (
    <div onClick={() => onClick(item)}>
      <img className={styles.image} src={urls.small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
