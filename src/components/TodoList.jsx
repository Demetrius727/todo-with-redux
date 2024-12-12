import { useSelector, useDispatch } from "react-redux";
import {
  toggleTodo,
  removeTodo,
  filterTodos,
  reorderTodos,
} from "../slices/todoSlice";

const TodoList = () => {
  const { list, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const filteredList = list.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  // Implementação de arrastar e soltar
  const handleDragStart = (e, todoId) => {
    e.dataTransfer.setData("todoId", todoId);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging");
  };

  const handleDrop = (e, targetId) => {
    const draggedTodoId = e.dataTransfer.getData("todoId");
    const draggedTodo = list.find((todo) => todo.id === draggedTodoId);

    const updatedTodos = list.filter((todo) => todo.id !== draggedTodo.id);
    const targetIndex = list.findIndex((todo) => todo.id === targetId);

    updatedTodos.splice(targetIndex, 0, draggedTodo);

    dispatch(reorderTodos(updatedTodos));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  return (
    <div>
      <div className="button-filter">
        <button onClick={() => dispatch(filterTodos("all"))}>Todas</button>
        <button onClick={() => dispatch(filterTodos("completed"))}>
          Completas
        </button>
        <button onClick={() => dispatch(filterTodos("incomplete"))}>
          Incompletas
        </button>
      </div>
      <ul>
        {filteredList.map((todo) => (
          <li
            key={todo.id}
            className="todo-item"
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, todo.id)}
          >
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={todo.completed ? "line-through" : null}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
