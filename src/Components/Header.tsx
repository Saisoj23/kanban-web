import { useContext } from "react";
import EnabledUIContext from "../ContextVariables/EnabledUIContext";
import type { BoardActions } from "../ContextVariables/BoardActions";

const Header = (props: {
  boardList: string[];
  selectedBoard: number;
  boardActions: BoardActions;
}) => {
  const { boardList, selectedBoard, boardActions } = props;

  const { value: enabledUI } = useContext(EnabledUIContext);

  return (
    <header className="w-screen bg-slate-800 flex justify-between items-center p-2">
      <h1 className="text-slate-50 text-5xl font-bold truncate">Kanban-do</h1>
      <form className="flex items-center gap-3">
        <button
          disabled={!enabledUI}
          onClick={boardActions.makeNew}
          className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          New Board
        </button>
        <label
          htmlFor="board-selector"
          className="block xl place-self-center mb-2 text-sm font-medium text-slate-50 dark:text-white"
        >
          Select board
        </label>
        <select
          value={boardList[selectedBoard]}
          disabled={!enabledUI}
          onChange={(event) => {
            boardActions.swap(event.target.value);
          }}
          id="board-selector"
          name="board-selector"
          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {boardList.map((element) => (
            <option value={element}>{element}</option>
          ))}
        </select>
        <button
          disabled={!enabledUI}
          onClick={boardActions.editName}
          className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Rename
        </button>
        <button
          disabled={!enabledUI}
          onClick={boardActions.delete}
          className="text-white end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Delete
        </button>
      </form>
    </header>
  );
};

export default Header;
