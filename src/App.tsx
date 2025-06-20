import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SearchBar from "./components/searchBar";
import { fetchImages } from "./key-api";
import ErrorMessage from "./components/message";
import ImageGallery from "./components/imageGallery";
import Loader from "./components/loader";
import LoadMoreBtn from "./components/loadMoreBtn";
import ImageModal from "./components/imageModal";
import styles from "./App.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

interface ApiResponse {
  results: Image[];
  total_pages: number;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const openModal = (image: Image) => {
    console.log("Opening modal with image:", image);
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      try {
        setLoading(true);
        const data: ApiResponse = await fetchImages(query, page);
        console.log(data);
        setImages((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages);
        setError(false);
      } catch (error) {
        console.log("Something went wrong", error);
        setError(true);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }
    if (newQuery === query) {
      toast("You're already viewing this search.");
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className={styles.mainStyle}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message="Try again" />}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
