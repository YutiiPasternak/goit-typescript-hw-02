import Modal from "react-modal";
import styles from "./imageModal.module.css";

export type ModalImage = {
  urls: {
    regular: string;
  };
  alt_description: string | null;
};

type ImageModalProps = {
  isOpen: boolean;
  image: ModalImage | null;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onClose }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      ariaHideApp={false}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.wrapperModal}>
        <button className={styles.buttonStyled} onClick={onClose}>
          Close
        </button>
        <img
          src={image.urls.regular}
          alt={image.alt_description ?? "Image without description"}
          className={styles.modalImg}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
