import React, { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  checkCompleted,
} from "./redux/reducers/todo";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { ITodo } from "./redux/types/todoType";

const Counter = () => {
  // console.log(todoListGlobalState);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState<string | undefined>("");
  const [idPostUpdate, setIdPostUpdate] = useState<string>("");
  const todoList = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const handleCheckCompleted = (id: string) => {
    dispatch(checkCompleted({ id }));
  };

  const handleDeleteJob = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const handleAddJob = () => {
    dispatch(addTodo({ name }));
  };

  const handleGoToUpdate = (todo: ITodo) => {
    setIdPostUpdate(todo.id);
    setUpdateName(todo.name);
  };

  const handleUpdate = (todo: ITodo) => {
    dispatch(updateTodo({ ...todo, name: updateName }));
    setIdPostUpdate("");
  };

  console.log(todoList);
  return (
    <>
      {todoList.length > 0 && (
        <div>
          {todoList.map((todo) => (
            <div key={todo.id}>
              <span style={{ color: "red" }}>{todo.name}</span>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckCompleted(todo.id)}
              />
              {todo.id === idPostUpdate && (
                <>
                  <input
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </>
              )}
              {todo.id === idPostUpdate ? (
                <button onClick={() => handleUpdate(todo)}>{"OK"}</button>
              ) : (
                <button onClick={() => handleGoToUpdate(todo)}>
                  {"Update"}
                </button>
              )}

              <button
                onClick={() => {
                  handleDeleteJob(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddJob}>Create New Todo</button>
    </>
  );
};

export default Counter;
