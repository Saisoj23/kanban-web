import { createContext } from "react";

export let GroupButtonsColumnContext = createContext({
  editName: (column: number) => {
    column;
  },
  delete: (column: number) => {
    column;
  },
  move: (column: number, backward: boolean = false) => {
    column;
    backward;
  },
});

export let GroupButtonsTaskContext = createContext({
  editName: (task: string) => {
    task;
  },
  delete: (task: string) => {
    task;
  },
  move: (task: string, backward: boolean = false) => {
    task;
    backward;
  },
});

export interface GroupButtonsType {
  editName: (task: string | number) => void;
  delete: (task: string | number) => void;
  move: (task: string | number, backward?: boolean) => void;
}
