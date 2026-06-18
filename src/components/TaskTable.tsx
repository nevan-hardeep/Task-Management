import { Task } from "../types/tasks";

interface Props {
  tasks: Task[];
  onDelete:
    (id: number) => void;
  onComplete:
    (id: number) => void;
  onEdit:
    (task: Task) => void;
}

function TaskTable({
  tasks,
  onDelete,
  onComplete,
  onEdit
}: Props) {

  return (

    <table
      className=
      "table table-bordered table-striped"
    >

      <thead>

        <tr>
          <th>
            Title
          </th>

          <th>
            Category
          </th>

          <th>
            Status
          </th>

          <th>
            Actions
          </th>
        </tr>

      </thead>

      <tbody>

        {
          tasks.map(task => (

            <tr
              key={task.id}
            >

              <td
                style={{
                  textDecoration:
                    task.completed
                      ? "line-through"
                      : "none"
                }}
              >
                {task.title}
              </td>

              <td>
                {task.category}
              </td>

              <td>

                {
                  task.completed
                    ? (
                      <span className="badge bg-success">
                        Completed
                      </span>
                    )
                    : (
                      <span className="badge bg-warning">
                        Pending
                      </span>
                    )
                }

              </td>

              <td>

                <button
                  className=
                  "btn btn-success me-2"
                  onClick={() =>
                    onComplete(
                      task.id
                    )
                  }
                >
                  Complete
                </button>

                <button
                  className=
                  "btn btn-warning me-2"
                  onClick={() =>
                    onEdit(task)
                  }
                >
                  Edit
                </button>

                <button
                  className=
                  "btn btn-danger"
                  onClick={() =>
                    onDelete(
                      task.id
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))
        }

      </tbody>

    </table>

  );
}

export default TaskTable;