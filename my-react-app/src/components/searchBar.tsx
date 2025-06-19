import React, { FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./searchBar.module.css";

type SearchBarProps = {
  onSubmit: (topic: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const topicInput = form.elements.namedItem("topic") as HTMLInputElement;

    const topic = topicInput.value.trim();

    if (!topic) {
      toast.error("Please enter search term!");
      return;
    }

    onSubmit(topic);
    form.reset();
  };

  return (
    <>
      <Toaster />
      <header>
        <form className={styles.formBar} onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="topic"
            className={styles.inputStyled}
          />
          <button className={styles.buttonStyled} type="submit">
            Search
          </button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
