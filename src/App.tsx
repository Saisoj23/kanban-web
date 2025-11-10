import { useContext, useEffect, useState } from "react";
import Header from "./Components/Header";
import TaskInput from "./Components/TaskInput";
import AddColumnButton from "./Components/AddColumnButton";
import Column from "./Components/Column";
import Task from "./Components/Task";
import ConfirmationWindow from "./Components/ConfirmationWindow";

import ColorLoader from "./Components/ColorLoader";

import type { BoardType } from "./ContextVariables/BoardType";
import type { BoardActions } from "./ContextVariables/BoardActions";

import {
  GroupButtonsColumnContext,
  GroupButtonsTaskContext,
} from "./ContextVariables/GroupButtonsContext";
import type { GroupButtonsType } from "./ContextVariables/GroupButtonsContext";

import EnabledUIContext from "./ContextVariables/EnabledUIContext";
import type { ConfirmationTargetInfo } from "./ContextVariables/ConfirmationTargetInfo";

function App() {
  const [boardList, setBoardList] = useState(
    localStorage.getItem("board-list")
      ? JSON.parse(localStorage.getItem("board-list") as string)
      : ["Board 1"]
  );
  const [selectedBoard, setSelectedBoard] = useState(
    localStorage.getItem("selected-board")
      ? parseInt(localStorage.getItem("selected-board") as string)
      : 0
  );
  const [boardObject, setBoardObject] = useState(
    localStorage.getItem(boardList[selectedBoard])
      ? (JSON.parse(
          localStorage.getItem(boardList[selectedBoard]) as string
        ) as BoardType)
      : ({
          cols: {
            0: "Column 1",
            1: "Column 2",
            2: "Column 3",
            3: "Column 4",
            4: "Column 5",
            5: "Column 6",
          },
          tasks: {},
        } as BoardType)
  );

  const [columnCount, setColumnCount] = useState(
    Object.keys(boardObject.cols).length
  );

  useEffect(() => {
    localStorage.setItem("board-list", JSON.stringify(boardList));
  }, [boardList]);
  useEffect(() => {
    localStorage.setItem("selected-board", `${selectedBoard}`);
  }, [selectedBoard]);
  useEffect(() => {
    localStorage.setItem(
      boardList[selectedBoard as number],
      JSON.stringify(boardObject)
    );
  }, [boardObject]);

  const [confirmationContent, setConfirmationContent] = useState(
    {} as ConfirmationTargetInfo
  );
  const [enabledUI, setEnabledUI] = useState(true);

  const NewBoard = () => {
    let boardName = `Board ${boardList.length + 1}`;
    if (boardList.includes(boardName)) {
      let index = 1;
      while (Object.values(boardObject.cols).includes(`Board ${index}`)) {
        index++;
      }
      boardName = `Board ${index}`;
    }

    setBoardList((prevItems: string) => [...prevItems, boardName]);
    console.log(boardList.length);
    setSelectedBoard(boardList.length);
    setBoardObject({
      cols: {
        0: "Column 1",
        1: "Column 2",
        2: "Column 3",
        3: "Column 4",
        4: "Column 5",
        5: "Column 6",
      },
      tasks: {},
    } as BoardType);
  };

  const EditBoardNameCallback = () => {
    setConfirmationContent({
      content: "Change board name",
      target: selectedBoard as number,
      rename: true,
      column: boardList[selectedBoard],
      confirmCallback: EditBoardName,
    } as ConfirmationTargetInfo);
    setEnabledUI(false);
  };

  const EditBoardName = (target: number, newName: string) => {
    if (boardList[target] === newName) return;

    localStorage.removeItem(boardList[selectedBoard]);

    if (boardList.includes(newName)) {
      let index = 1;
      while (Object.values(boardObject.cols).includes(newName + `${index}`)) {
        index++;
      }
      newName = newName + `${index}`;
    }

    let newBoardList = [...boardList];
    newBoardList[selectedBoard] = newName;

    setBoardList(newBoardList);
    setBoardObject({ ...boardObject });
  };

  const DeleteBoardCallback = () => {
    setConfirmationContent({
      content: `Are you sure you want to delete the board ${boardList[selectedBoard]}?`,
      target: selectedBoard as number,
      rename: false,
      confirmCallback: DeleteBoard,
    } as ConfirmationTargetInfo);
    setEnabledUI(false);
  };

  const DeleteBoard = (target: number) => {
    localStorage.removeItem(boardList[selectedBoard]);
    if (boardList.length === 1) {
      setBoardObject({
        cols: {
          0: "Column 1",
          1: "Column 2",
          2: "Column 3",
          3: "Column 4",
          4: "Column 5",
          5: "Column 6",
        },
        tasks: {},
      } as BoardType);
      EditBoardName(target, "Board 1");
      setColumnCount(6);
      return;
    }

    const newBoardList = [...boardList];
    newBoardList.splice(target, 1);

    SwapBoard(
      selectedBoard === 0 ? boardList[1] : boardList[selectedBoard - 1]
    );
    setBoardList(newBoardList);
  };

  const SwapBoard = (board: string) => {
    const newBoardObject = JSON.parse(
      localStorage.getItem(board) as string
    ) as BoardType;
    setBoardObject(newBoardObject);
    setColumnCount(Object.keys(newBoardObject.cols).length);

    setSelectedBoard(
      boardList.indexOf(board) != -1 ? boardList.indexOf(board) : 0
    );
  };

  const groupBoardActions = {
    makeNew: NewBoard,
    editName: EditBoardNameCallback,
    delete: DeleteBoardCallback,
    swap: SwapBoard,
  } as BoardActions;

  const updateEnableUIValue = (newValue: boolean) => {
    setEnabledUI(newValue);
  };

  let EditTaskContentCallback = (task: string | number) => {
    setConfirmationContent({
      content: "Modify task",
      target: task as string,
      rename: true,
      confirmCallback: EditTaskContent,
    } as ConfirmationTargetInfo);
    setEnabledUI(false);
  };

  let EditTaskContent = (task: string | number, newContent: string) => {
    if (task === newContent) return;

    if (Object.keys(boardObject.tasks).includes(newContent)) {
      let index = 1;
      while (Object.keys(boardObject.tasks).includes(newContent + `${index}`)) {
        index++;
        console.log(newContent + `${index}`);
      }
      newContent = newContent + `${index}`;
    }

    let newBoard: BoardType = { cols: {}, tasks: {} };
    newBoard.cols = boardObject.cols;
    for (const key in boardObject.tasks) {
      newBoard.tasks[key] = boardObject.tasks[key];
      if (key === task) {
        newBoard.tasks[newContent] = boardObject.tasks[key];
      }
    }
    delete newBoard.tasks[task];

    setBoardObject(newBoard);
  };

  let DeleteTask = (content: string | number) => {
    let newBoard: BoardType = { cols: {}, tasks: {} };
    newBoard.cols = boardObject.cols;
    newBoard.tasks = boardObject.tasks;

    delete newBoard.tasks[content];

    setBoardObject(newBoard);
  };

  let MoveTask = (content: string | number, backward: boolean = false) => {
    if (columnCount === 1) return;

    let newBoard: BoardType = { cols: {}, tasks: {} };
    newBoard.cols = boardObject.cols;
    newBoard.tasks = boardObject.tasks;

    let target = boardObject.tasks[content];
    if (backward) {
      target--;
      if (target < 0) target = columnCount - 1;
    } else {
      target++;
      if (target > columnCount - 1) target = 0;
    }

    delete newBoard.tasks[content];
    newBoard.tasks[content] = target;

    setBoardObject(newBoard);
  };

  let EditColumnNameCallback = (column: number | string) => {
    setConfirmationContent({
      content: "Change column name",
      target: column as number,
      rename: true,
      column: boardObject.cols[column as number],
      confirmCallback: EditColumnName,
    } as ConfirmationTargetInfo);
    setEnabledUI(false);
  };

  let EditColumnName = (column: number | string, newName: string) => {
    if (boardObject.cols[column as number] === newName) return;

    if (Object.values(boardObject.cols).includes(newName)) {
      let index = 1;
      while (Object.values(boardObject.cols).includes(newName + `${index}`)) {
        index++;
        console.log(newName + `${index}`);
      }
      newName = newName + `${index}`;
    }

    let newBoard: BoardType = { cols: {}, tasks: {} };
    newBoard.cols = boardObject.cols;
    newBoard.tasks = boardObject.tasks;
    newBoard.cols[column as number] = newName;

    setBoardObject(newBoard);
  };

  let DeleteColumnCallback = (column: number | string) => {
    for (const key in boardObject.tasks) {
      if (boardObject.tasks[key] === column) {
        setConfirmationContent({
          content: `Are you sure you want to delete the column ${
            boardObject.cols[column as number]
          }?`,
          target: column as number,
          rename: false,
          confirmCallback: DeleteColumn,
        } as ConfirmationTargetInfo);
        setEnabledUI(false);
        return;
      }
    }
    DeleteColumn(column);
  };

  let DeleteColumn = (column: number | string) => {
    if (columnCount === 1) {
      setBoardObject({ cols: { 0: "Column 1" }, tasks: {} });
      return;
    }

    let newBoard: BoardType = { cols: {}, tasks: {} };
    newBoard.cols = boardObject.cols;
    newBoard.tasks = boardObject.tasks;

    for (const key in boardObject.cols) {
      const index = parseInt(key);
      if (index >= (column as number) && index < columnCount - 1) {
        newBoard.cols[index] = newBoard.cols[index + 1];
      }
    }

    delete newBoard.cols[Object.keys(boardObject.cols).length - 1];

    for (const key in boardObject.tasks) {
      if (newBoard.tasks[key] === (column as number)) {
        delete newBoard.tasks[key];
      } else if (newBoard.tasks[key] >= (column as number)) {
        newBoard.tasks[key] -= 1;
      }
    }

    setBoardObject(newBoard);
    setColumnCount(Object.keys(boardObject.cols).length);
  };

  let MoveColumn = (column: number | string, backward: boolean = false) => {
    if (columnCount === 1) return;

    let newBoard: BoardType = { cols: {}, tasks: {} };
    newBoard.cols = boardObject.cols;
    newBoard.tasks = boardObject.tasks;

    let target = column as number;
    if (backward) {
      target--;
      if (target < 0) target = columnCount - 1;
    } else {
      target++;
      if (target > columnCount - 1) target = 0;
    }

    for (const key in newBoard.tasks) {
      if (newBoard.tasks[key] == column) {
        newBoard.tasks[key] = target;
      } else if (newBoard.tasks[key] == target) {
        newBoard.tasks[key] = column as number;
      }
    }

    [boardObject.cols[column as number], boardObject.cols[target]] = [
      boardObject.cols[target],
      boardObject.cols[column as number],
    ];

    setBoardObject(newBoard);
  };

  const groupButtonsColumnContextValue = useContext(
    GroupButtonsColumnContext
  ) as GroupButtonsType;
  groupButtonsColumnContextValue.editName = EditColumnNameCallback;
  groupButtonsColumnContextValue.delete = DeleteColumnCallback;
  groupButtonsColumnContextValue.move = MoveColumn;

  const groupButtonsTaskContextValue = useContext(
    GroupButtonsTaskContext
  ) as GroupButtonsType;
  groupButtonsTaskContextValue.editName = EditTaskContentCallback;
  groupButtonsTaskContextValue.delete = DeleteTask;
  groupButtonsTaskContextValue.move = MoveTask;

  let AddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newContent = event.currentTarget["add-task"].value;

    if (Object.keys(boardObject.tasks).includes(newContent)) {
      let index = 1;
      while (Object.keys(boardObject.tasks).includes(newContent + `${index}`)) {
        index++;
        console.log(newContent + `${index}`);
      }
      newContent = newContent + `${index}`;
    }

    setBoardObject((prevBoard) => ({
      ...prevBoard,
      tasks: {
        ...prevBoard.tasks,
        [newContent]: 0,
      },
    }));
    event.currentTarget.reset();
  };

  let AddColumn = () => {
    let colName = `Column ${columnCount + 1}`;
    if (Object.values(boardObject.cols).includes(colName)) {
      let index = 1;
      while (Object.values(boardObject.cols).includes(`Column ${index}`)) {
        index++;
      }
      colName = `Column ${index}`;
    }

    setBoardObject((prevBoard) => ({
      ...prevBoard,
      cols: {
        ...prevBoard.cols,
        [columnCount]: colName,
      },
    }));

    setColumnCount(Object.keys(boardObject.cols).length + 1);
  };

  return (
    <>
      <EnabledUIContext.Provider
        value={{ value: enabledUI, updateValue: updateEnableUIValue }}
      >
        <ConfirmationWindow hidden={enabledUI} content={confirmationContent} />

        <Header
          boardList={boardList}
          selectedBoard={selectedBoard}
          boardActions={groupBoardActions}
        />
        <TaskInput addTask={AddTask} />

        <main
          id="main-board"
          className="flex justify-center items-start flex-wrap gap-4 m-4"
        >
          {Object.keys(boardObject.cols)
            .map(Number)
            .map((column) => (
              <Column column={column} name={boardObject.cols[column]}>
                {Object.keys(boardObject.tasks).map((taskContent) => {
                  if (boardObject.tasks[taskContent] === column) {
                    return <Task content={taskContent} column={column} />;
                  }
                  return null;
                })}
              </Column>
            ))}
          <AddColumnButton hidden={columnCount >= 6} addColumn={AddColumn} />
        </main>
      </EnabledUIContext.Provider>

      <ColorLoader />
    </>
  );
}

export default App;
