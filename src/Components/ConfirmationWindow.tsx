import { useContext } from "react";
import EnabledUIContext from "../ContextVariables/EnabledUIContext";

import type { ConfirmationTargetInfo } from "../ContextVariables/ConfirmationTargetInfo";

export const ConfirmationWindow = (props: {
  hidden?: boolean;
  content: ConfirmationTargetInfo;
}) => {
  const { hidden = true, content } = props;

  const { updateValue: setEnabledUI } = useContext(EnabledUIContext);
  return (
    <div
      id="confirmation-background"
      className={`${
        hidden ? "hidden" : ""
      } fixed z-50 bg-slate-900/50 top-0 left-0 w-screen h-screen flex justify-center items-center`}
    >
      <div
        id="confirmation-box"
        className="bg-white p-6 rounded-lg text-slate-900"
      >
        <p id="confirmation-message" className="mb-4 text-lg">
          {content.content}
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            content.rename
              ? content.confirmCallback(
                  content.target,
                  event.currentTarget["input-rename"].value
                )
              : content.confirmCallback(content.target);
            setEnabledUI(true);
            event.currentTarget.reset();
          }}
          className="flex flex-col justify-center gap-4"
        >
          {content.rename ? (
            <input
              required
              defaultValue={
                typeof content.target === "number"
                  ? content.column
                  : content.target
              }
              type="text"
              id="input-rename"
              maxLength={typeof content.target === "number" ? 50 : 300}
              className="block w-100 p-4 text-sm text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={
                typeof content.target === "number"
                  ? "New name..."
                  : "New content..."
              }
            />
          ) : (
            ""
          )}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className={`text-white end-2.5 bottom-2.5 ${
                content.rename
                  ? "bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
                  : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              }`}
            >
              {content.rename ? "Rename" : "Delete"}
            </button>
            <button
              onClick={() => {
                setEnabledUI(true);
              }}
              type="reset"
              className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
