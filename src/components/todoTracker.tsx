import { TODOItem } from "../utils/models/todoItem";
import { Status } from "../utils/utils";

type TodoTrackerProps = {
  todoList: TODOItem[];
};
export default function TodoTracker({ todoList }: TodoTrackerProps) {
  const renderContent = () => {
    if (todoList.length > 0) {
      return (
        <div className="flex justify-around items-center">
          <div className="text-xl font-[DynaPuff]">
            You are making a great progress!!
          </div>

          <div className="rounded-full border-4 p-8">
            <span className="text-white text-2xl">
              {
                todoList.filter(
                  (todoItem) => todoItem.status === Status.Completed
                ).length
              }
              /{todoList.length}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <h1 className="italic text-white font-[DynaPuff] text-center font-semibold">
          Looks like u dont have task{" "}
        </h1>
      );
    }
  };
  return (
    <div className="w-2/3 border-2 border-amber-950 rounded bg-gradient-to-r from-green-800 to-green-300 py-8 px-4 mx-auto my-4">
      {renderContent()}
    </div>
  );
}
