import { COLORS } from "../ContextVariables/constants";
import { ButtonGroup } from "./ButtonGroup";

const Column = (props: {
  column: number;
  name: string;
  children: React.ReactNode;
}) => {
  const { column, name, children } = props;
  return (
    <div
      className={`column flex flex-col text-slate-900 bg-${COLORS[column]}-300 w-3/10 min-w-80 min-h-40 rounded-lg`}
      data-column={column}
    >
      <div
        className={`column-header relative bg-${COLORS[column]}-400 w-full rounded-lg`}
      >
        <h2 className="column-title text-center font-bold text-xl p-2 break-words overflow-hidden">
          {name}
        </h2>
        <ButtonGroup large={true} column={column} />
      </div>
      <div className="tasks-group flex items-start gap-3 w-full flex-wrap justify-around h-full p-2">
        {children}
      </div>
    </div>
  );
};

export default Column;
