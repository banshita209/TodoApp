import { useContext, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header from "../components/header";
import TodoCard from "../components/todoCard";
import TodoTracker from "../components/todoTracker";
import TodoContext from "../context/TodoContext";
import { TODOItem } from "../utils/models/todoItem";
import AddTodo from "../components/AddTodo";

export default function TodoPage() {
  const { todoList, setTodoList } = useContext<any>(TodoContext);
  const [showAddTodoFlag, setShowAddTodoFlag] = useState<boolean>(false);

  const showAddTodo = () => {
    setShowAddTodoFlag(!showAddTodoFlag);
  };
  return (
    <Fragment>
      <Header title="My Todo App" />
      <TodoTracker todoList={todoList} />
      <div className="w-2/3 mx-auto my-2">
        <button
          onClick={showAddTodo}
          className="flex justify-self-end mr-4 border-green-800 border-4 rounded px-4 py-2 font-[dynapuff]  text-green-900"
        >
          Add new task
        </button>
        {showAddTodoFlag && <AddTodo setShowAddTodoFlag={setShowAddTodoFlag} />}
      </div>
      <div className=" w-2/3 mx-auto flex flex-row my-4">
        {todoList.map((todo: TODOItem) => {
          return <TodoCard todoItem={todo} />;
        })}
      </div>
    </Fragment>
  );
}
