import axios from "axios";
import axiosInstance from "../../assets/api/axiosInstance";

type TaskActionModalProps = {
  setShowEditModal: (value: boolean) => void;
  setDataChanged: (value: boolean) => void;
  taskId: number;
  setEditTaskId: (val: number) => void;
};
const TaskActionModal = ({
  setShowEditModal,
  setDataChanged,
  taskId,
  setEditTaskId,
}: TaskActionModalProps) => {
  const handleEditClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setEditTaskId(taskId);
    setShowEditModal(true);
  };

  const handleTaskdelete = async () => {
    try {
      const response = await axiosInstance({
        method: "delete",
        url: `/task/${taskId}`,
      });

      if (response?.status == 200) {
        console.log(response?.data?.message);
        setDataChanged(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error("common error", err);
      }
    }
  };
  return (
    <div className="absolute bg-linear-to-r from-cyan-400 to-blue-400 text-white rounded-xs top-[-5px] right-4 w-[100px] max-w-[150px]">
      <ul className="list-none my-2 mx-1">
        <li
          className="hover:text-black hover:border-b-2"
          onMouseDown={handleEditClick}
        >
          Edit
        </li>
        <li
          className="hover:text-black hover:border-b-2"
          onMouseDown={handleTaskdelete}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default TaskActionModal;
