import {
  faCircleCheck,
  faClockRotateLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useContext } from "react";
import TodoContext from "../context/TodoContext";
import { TODOItem } from "../utils/models/todoItem";
import { Status } from "../utils/utils";

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

  const changeStatus = (updatedStatus: number) => {
    let restOftheList = todoList.filter((todo: TODOItem) => {
      return todo.id !== todoItem.id;
    });
    console.log("reast", restOftheList);
    if (updatedStatus === Status.Completed) {
      setTodoList([
        ...restOftheList,
        {
          ...todoItem,
          status: updatedStatus,
          lastModifiedDate: new Date(),
          completetionDate: new Date(),
        },
      ]);
    } else {
      setTodoList([
        ...restOftheList,
        { ...todoItem, status: updatedStatus, lastModifiedDate: new Date() },
      ]);
    }
  };
  return (
    <div className="w-[450px] bg-gradient-to-br from-green-300 to-white shadow mb-4 mx-4 py-4 px-8 ">
      <div className="">
        <div className="flex flex-row justify-end text-xs italic mb-4">
          <p className="font-[dynapuff]">Created on: &nbsp;</p>
          <p className="font-chakraPetch">
            {todoItem.lastModifiedDate
              ? moment(todoItem.lastModifiedDate).format(
                  "DD-MM-YYYY hh:mm:ss a"
                )
              : "-"}
          </p>
        </div>
        <div className="flex flex-row text-sm mb-2 ">
          <p className="font-[dynapuff] w-[200px]">Title:</p>
          <p className="font-chakraPetch capitalize">{todoItem.title}</p>
        </div>

        <div className="flex flex-row text-sm mb-2">
          <p className="font-[dynapuff] w-[200px]">Description:</p>
          <p className="font-chakraPetch capitalize">{todoItem.description}</p>
        </div>
        <div className="flex flex-row text-sm mb-2">
          <p className="font-[dynapuff] w-[200px]">Status:</p>
          <p className="font-chakraPetch">
            {getStatusIcon().icon}&nbsp;{getStatusIcon().status}
          </p>
        </div>
        <div className="flex flex-row text-sm mb-2">
          <p className="font-[dynapuff] w-[200px]">Targeted Completion Date:</p>
          <p className="font-chakraPetch">
            {moment(todoItem.targetCompletionDate).format("DD-MM-YYYY ")}
          </p>
        </div>

        {todoItem.completetionDate ? (
          <div className="flex flex-row text-sm mb-2">
            <p className="font-[dynapuff] w-[200px]">
              Actual Completion DateTime:
            </p>
            <p className="font-chakraPetch">
              {todoItem.completetionDate
                ? moment(todoItem.completetionDate).format(
                    "DD-MM-YYYY hh:mm:ss a"
                  )
                : "-"}
            </p>
          </div>
        ) : (
          <div className="flex flex-row text-sm mb-2">
            <p className="font-[dynapuff] w-[200px]">Last Modified DateTime:</p>
            <p className="font-chakraPetch">
              {todoItem.lastModifiedDate
                ? moment(todoItem.lastModifiedDate).format(
                    "DD-MM-YYYY hh:mm:ss a"
                  )
                : "-"}
            </p>
          </div>
        )}
      </div>
      <div className=" flex justify-between align-middle my-4 text-xs">
        {todoItem.status === Status.NotStarted && (
          <button
            className="border-4 border-green-900 rounded px-2 py-1 font-[dynapuff] text-green-900"
            onClick={() => {
              changeStatus(Status.InProgress);
            }}
          >
            Make it In-Progress
          </button>
        )}
        {todoItem.status === Status.InProgress && (
          <button
            className="border-4 border-green-900 rounded px-2 py-1 font-[dynapuff] text-green-900"
            onClick={() => {
              changeStatus(Status.Completed);
            }}
          >
            Mark as Completed
          </button>
        )}

        {/* <div onClick={removeTask}>
          <FontAwesomeIcon className="text-2xl mx-auto" icon={faTrashCan} />
          <p className="font-[DynaPuff] mx-auto">Delete</p>
        </div> */}
      </div>
    </div>
  );
}
