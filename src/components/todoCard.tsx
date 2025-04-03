import {
  faCircleCheck,
  faClockRotateLeft,
  faSpinner,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TODOItem } from "../utils/models/todoItem";
import { Status } from "../utils/utils";
import moment from "moment";
import { useContext } from "react";
import TodoContext from "../context/TodoContext";

type TodoCardProps = {
  todoItem: TODOItem;
};
export default function TodoCard({ todoItem }: TodoCardProps) {
  const { todoList, setTodoList } = useContext<any>(TodoContext);
  const removeTask = () => {
    let filteresTodoList = todoList.filter(
      (todo: any) => todo.id !== todoItem.id
    );
    setTodoList([...filteresTodoList]);
    localStorage.setItem("todoList", JSON.stringify(filteresTodoList));
  };
  const getStatusIcon = () => {
    switch (todoItem.status) {
      case Status.NotStarted:
        return {
          icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
          status: "Not Started",
        };

      case Status.InProgress:
        return {
          icon: <FontAwesomeIcon icon={faSpinner} />,
          status: "In Progress",
        };
      case Status.Completed:
        return {
          icon: <FontAwesomeIcon icon={faCircleCheck} />,
          status: "Completed",
        };
    }
  };

  const markCompleted = () => {
    setTodoList([
      ...todoList.filter((todo: TODOItem) => todo.id !== todoItem.id),
      { ...todoItem, status: Status.Completed },
    ]);
  };
  return (
    <div className="w-[450px] bg-gradient-to-br from-green-300 to-white shadow mb-4 mx-4 py-4 px-8 ">
      <div className="">
        <div className="flex flex-row ">
          <p className="font-[dynapuff] w-[200px]">Title:</p>
          <p className="font-chakraPetch">{todoItem.title}</p>
        </div>
        <div className="flex flex-row ">
          <p className="font-[dynapuff] w-[200px]">Description:</p>
          <p className="font-chakraPetch">{todoItem.description}</p>
        </div>
        <div className="flex flex-row ">
          <p className="font-[dynapuff] w-[200px]">Status:</p>
          <p className="font-chakraPetch">
            {getStatusIcon().icon}&nbsp;{getStatusIcon().status}
          </p>
        </div>
        <div className="flex flex-row ">
          <p className="font-[dynapuff] w-[200px]">Targeted Completion Date:</p>
          <p className="font-chakraPetch">
            {moment(todoItem.targetCompletionDate).format("DD-MM-YYYY ")}
          </p>
        </div>
      </div>
      <div className=" flex justify-end">
        <div onClick={markCompleted}>
          <p>Mark as Completed</p>
        </div>
        <div onClick={removeTask}>
          <FontAwesomeIcon className="text-xl mx-auto" icon={faTrashCan} />
          <p className="font-[DynaPuff] mx-auto">Delete</p>
        </div>
      </div>
    </div>
  );
}
