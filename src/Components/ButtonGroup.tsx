import { useContext } from "react";
import EnabledUIContext from "../ContextVariables/EnabledUIContext";

import leftArrowIcon from "../assets/arrow-left-3-svgrepo-com.svg";
import rightArrowIcon from "../assets/arrow-right-2-svgrepo-com.svg";
import editIcon from "../assets/edit-2-svgrepo-com.svg";
import removeIcon from "../assets/bag-svgrepo-com.svg";

import {
  GroupButtonsColumnContext,
  GroupButtonsTaskContext,
} from "../ContextVariables/GroupButtonsContext";
import type { GroupButtonsType } from "../ContextVariables/GroupButtonsContext";

export const ButtonGroup = (props: {
  column?: number;
  task?: string;
  large?: boolean;
}) => {
  const { value: enabledUI } = useContext(EnabledUIContext);

  const { column = 0, task = "", large = false } = props;

  let groupButtonMethods;
  if (large) {
    groupButtonMethods = useContext(
      GroupButtonsColumnContext
    ) as GroupButtonsType;
  } else {
    groupButtonMethods = useContext(
      GroupButtonsTaskContext
    ) as GroupButtonsType;
  }

  return (
    <div className="button-map-group absolute z-11 hover:z-19 w-full h-full right-0 top-0 opacity-0 hover:opacity-100 transition-opacity duration-100">
      <button
        disabled={!enabledUI}
        onClick={() => {
          large
            ? groupButtonMethods.move(column, true)
            : groupButtonMethods.move(task, true);
        }}
        className={`move-left absolute ${
          large ? "w-6 h-6" : "w-5 h-5"
        } bg-slate-800 rounded-l-full top-[50%] left-0 -translate-x-full translate-y-[-50%] justify-center items-center cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300`}
      >
        <img src={leftArrowIcon} alt="Left Arrow" className="w-full h-full" />
      </button>
      <button
        disabled={!enabledUI}
        onClick={() => {
          large
            ? groupButtonMethods.move(column, false)
            : groupButtonMethods.move(task, false);
        }}
        className={`move-right absolute ${
          large ? "w-6 h-6" : "w-5 h-5"
        } bg-slate-800 rounded-r-full top-[50%] right-0 translate-x-full translate-y-[-50%] justify-center items-center cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300`}
      >
        <img src={rightArrowIcon} alt="Right Arrow" className="w-full h-full" />
      </button>
      <button
        disabled={!enabledUI}
        onClick={() => {
          large
            ? groupButtonMethods.editName(column)
            : groupButtonMethods.editName(task);
        }}
        className={`edit absolute ${
          large ? "w-6 h-6" : "w-5 h-5"
        } bg-slate-800 rounded-full top-0 right-0 translate-x-[50%] translate-y-[-50%] cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300 flex justify-center items-center`}
      >
        <img src={editIcon} alt="Edit Icon" className="w-7/10 h-7/10" />
      </button>
      <button
        disabled={!enabledUI}
        onClick={() => {
          large
            ? groupButtonMethods.delete(column)
            : groupButtonMethods.delete(task);
        }}
        className={`remove absolute ${
          large ? "w-6 h-6" : "w-5 h-5"
        } bg-slate-800 rounded-full top-0 left-0 translate-x-[-50%] translate-y-[-50%] cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300 flex justify-center items-center`}
      >
        <img src={removeIcon} alt="Remove Icon" className="w-7/10 h-7/10" />
      </button>
    </div>
  );
};
