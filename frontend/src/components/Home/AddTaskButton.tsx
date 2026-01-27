type AddTaskButtonProps = {
  setShowModal: (value: boolean) => void;
  // setDataChanged: (value: boolean) => void;
}
const AddTaskButton = ({ setShowModal}: AddTaskButtonProps) => {
  const handleAddTask = () => {
    // setDataChanged(false);
    setShowModal(true);
  }
  return (
    <>
      <button
        type="button"
        className="bg-sky-500 text-white rounded-sm px-4 py-1 mt-4 cursor-pointer hover:bg-sky-600"
        onMouseDown={handleAddTask}
      >
        Add Task
      </button>
    </>
  );
};

export default AddTaskButton;
