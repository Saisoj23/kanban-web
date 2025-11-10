import addIcon from "../assets/add-circle-svgrepo-com.svg";

const AddColumnButton = (props: {
  hidden?: boolean;
  addColumn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { hidden = false, addColumn } = props;

  return (
    <div
      id="add-column-button-container"
      className="w-3/10 min-w-80 flex justify-center"
    >
      <button
        id="add-column-button"
        className={`${
          hidden ? "hidden" : ""
        } bg-slate-800 translate-y-12 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-full p-2 cursor-pointer`}
        onClick={addColumn}
      >
        <img src={addIcon} className="w-12 h-12" />
      </button>
    </div>
  );
};

export default AddColumnButton;
