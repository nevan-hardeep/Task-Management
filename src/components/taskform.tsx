import {
  Category
} from "../types/tasks";

import {
  categories
} from "../constants/categories";

interface Props {
  title: string;
  category: Category;
  setTitle:
    (value: string) => void;
  setCategory:
    (value: Category) => void;
  handleSubmit: () => void;
  isEditing: boolean;
}

function TaskForm({
  title,
  category,
  setTitle,
  setCategory,
  handleSubmit,
  isEditing
}: Props) {

  return (

    <div className="mb-4">

      <input
        className="form-control mb-2"
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      <select
        className="form-select mb-2"
        value={category}
        onChange={(e) =>
          setCategory(
            e.target
              .value as Category
          )
        }
      >

        {
          categories.map(
            category => (

              <option
                key={category}
              >
                {category}
              </option>

            )
          )
        }

      </select>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        {
          isEditing
            ? "Update Task"
            : "Add Task"
        }
      </button>

    </div>

  );
}

export default TaskForm;