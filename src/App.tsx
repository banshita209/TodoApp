import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import TodoContext from "./context/TodoContext";
//import TodoPage from "./pages/todoPage";
const TodoPage = React.lazy(() => import("./pages/todoPage"));
import { TODOItem } from "./utils/models/todoItem";

function App() {
  const [todoList, setTodoList] = useState<TODOItem[]>([
    // {
    //   id: 1,
    //   status: Status.NotStarted,
    //   title: "Learn React",
    //   description: "aaa",
    //   targetCompletionDate: new Date(),
    //   createdDateTime: new Date(),
    // },
  ]);
  useEffect(() => {
    let todoList = localStorage.getItem("todoList");
    console.log(todoList);
    if (todoList && todoList?.length > 0) {
      setTodoList(JSON.parse(todoList));
    }
  }, []);
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);
  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoPage />
      </Suspense>
    </TodoContext.Provider>
  );
}

export default App;
