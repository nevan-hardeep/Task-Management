interface Props {
  searchTerm: string;
  setSearchTerm:
    (value: string) => void;
}

function SearchBar({
  searchTerm,
  setSearchTerm
}: Props) {

  return (

    <input
      className="form-control mb-3"
      placeholder="Search task"
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(
          e.target.value
        )
      }
    />

  );
}

export default SearchBar;