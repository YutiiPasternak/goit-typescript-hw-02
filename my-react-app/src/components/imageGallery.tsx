import ImgCards from "./imageCard";
import styles from "./imageGallery.module.css";

type ImageItem = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
};

type ImageGalleryProps = {
  items: ImageItem[];
  onImageClick: (item: ImageItem) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onImageClick }) => {
  if (items.length === 0) return null;

  return (
    <ul className={styles.listGallery}>
      {items.map((item) => (
        <li key={item.id}>
          <ImgCards item={item} onClick={() => onImageClick(item)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
