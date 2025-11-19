import { useContext } from "react";
import EnabledUIContext from "../ContextVariables/EnabledUIContext";

const TaskInput = (props: {
  addTask: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const { addTask } = props;

  const { value: enabledUI } = useContext(EnabledUIContext);

  return (
    <form
      id="add-task-form"
      className="max-w-md mx-auto mt-4"
      onSubmit={addTask}
    >
      <label
        htmlFor="add-task"
        className="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white"
      >
        Add task
      </label>
      <div className="relative flex flex-row">
        <input
          disabled={!enabledUI}
          type="text"
          name="add-task"
          id="add-task-input"
          className="block w-full p-4 pr-20 text-sm text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="New Task..."
          required
          maxLength={300}
        />
        <button
          disabled={!enabledUI}
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
