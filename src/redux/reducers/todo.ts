import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodo } from "../types/todoType";
import { v4 as uuidv4 } from "uuid";

type IInitialState = ITodo[];

// const fakeData: ITodo[] = [
//   {
//     id: "1",
//     name: "Quet nha",
//     completed: true,
//   },
// ];

const initialState: IInitialState = [
  {
    id: uuidv4(),
    name: "掃除",
    completed: true,
  },
  {
    id: uuidv4(),
    name: "服を洗う",
    completed: true,
  },
];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      state.push({ id: uuidv4(), name: name, completed: false });
      console.log(state);
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const { id, name } = action.payload;
      let index = state.findIndex((todo) => todo.id === id);
      state[index] = { ...state[index], name };
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      let index = state.findIndex((todo) => todo.id === id);
      state.splice(index, 1);
    },
    checkCompleted: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      let index = state.findIndex((todo) => todo.id === id);
      state[index] = { ...state[index], completed: !state[index].completed };
    },
  },
});
export const { addTodo, updateTodo, deleteTodo, checkCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;
