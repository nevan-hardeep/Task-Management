interface Props {
  filter: string;
  setFilter:
    (value: string) => void;
}

function FilterBar({
  filter,
  setFilter
}: Props) {

  return (

    <select
      className="form-select mb-3"
      value={filter}
      onChange={(e) =>
        setFilter(
          e.target.value
        )
      }
    >

      <option>
        All
      </option>

      <option>
        Completed
      </option>

      <option>
        Pending
      </option>

    </select>

  );
}

export default FilterBar;