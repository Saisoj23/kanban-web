import { COLORS } from "../ContextVariables/constants";
import { ButtonGroup } from "./ButtonGroup";

const Task = (props: { content: string; column: number }) => {
  const { content, column } = props;

  let sizeClass = "";

  if (content.length < 15) {
    sizeClass = " text-4xl font-semibold";
  } else if (content.length < 25) {
    sizeClass = " text-2xl font-semibold";
  } else if (content.length < 50) {
    sizeClass = " text-xl font-medium";
  } else if (content.length < 150) {
    sizeClass = " text-base";
  } else if (content.length < 250) {
    sizeClass = " text-sm";
  } else {
    sizeClass = " text-xs";
  }

  return (
    <div
      className={`task relative bg-${COLORS[column]}-400 rounded-sm min-h-25 w-9/20 z-11 hover:z-19 text-center content-center p-1 ${sizeClass}`}
      data-column={column}
    >
      <p className={`task-text text-ellipsis break-words overflow-hidden`}>
        {content}
      </p>
      <ButtonGroup task={content} />
    </div>
  );
};

export default Task;
