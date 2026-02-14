import type { AddTaskButtonProps } from "../../types/TaskTypes";

const AddTaskButton = ({ setShowModal}: AddTaskButtonProps) => {
  const handleAddTask = () => {
    setShowModal(true);
  }
  return (
    <>
      <button
        type="button"
        className="bg-sky-500 text-white rounded-sm px-4 py-1 cursor-pointer hover:bg-sky-600"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </>
  );
};

export default AddTaskButton;
