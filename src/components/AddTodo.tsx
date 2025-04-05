import { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import { TODOItem } from "../utils/models/todoItem";
import { Status } from "../utils/utils";

type TodoInput = {
  title: string;
  description: string;
  completedDate: Date;
};
type AddTodoProps = {
  setShowAddTodoFlag: any;
};
export default function AddTodo({ setShowAddTodoFlag }: AddTodoProps) {
  const { todoList, setTodoList } = useContext<any>(TodoContext);
  const [newTodoItem, setNewTodoItem] = useState<TodoInput | null>();

  const addNewTask = () => {
    let newItem: TODOItem = {
      id: todoList[todoList.length - 1].id + 1,
      title: newTodoItem!.title,
      description: newTodoItem!.description,
      createdDateTime: new Date(),
      targetCompletionDate: newTodoItem!.completedDate,
      lastModifiedDate: new Date(),
      status: Status.NotStarted,
    };
    setTodoList((prev: any) => [...prev, newItem]);

    alert("Added in the list!");
    setNewTodoItem(null);
    setShowAddTodoFlag(false);
  };
  return (
    <div className="mx-auto px-4 py-2 border-4 my-4 border-green-700 rounded">
      <div className="flex flex-row my-2">
        <p className=" font-[DynaPuff]  text-base my-auto">Title</p>
        <input
          type="text"
          className="border font-chakraPetch font-semibold p-1 rounded ml-4"
          value={newTodoItem?.title}
          onChange={(e) => {
            setNewTodoItem((prev: any) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>
      <div className="flex flex-row my-2">
        <p className="font-[DynaPuff]  text-base my-auto"> Description</p>
        <textarea
          className="border font-chakraPetch font-semibold p-1 rounded ml-4"
          value={newTodoItem?.description}
          onChange={(e) => {
            setNewTodoItem((prev: any) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        ></textarea>
      </div>
      <div className="flex flex-row my-2">
        <p className=" font-[DynaPuff]  text-base my-auto">
          Targeted Completetion Date
        </p>
        <input
          type="date"
          className="border font-chakraPetch font-semibold p-1 rounded ml-4"
          onChange={(e) => {
            setNewTodoItem((prev: any) => ({
              ...prev,
              completedDate: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-green-900  rounded px-4 py-2 font-[dynapuff] text-white"
          onClick={addNewTask}
        >
          Add to the List
        </button>
      </div>
    </div>
  );
}
