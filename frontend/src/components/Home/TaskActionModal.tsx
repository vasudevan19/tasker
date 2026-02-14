import axios from "axios";
import type {
  DeleteTaskResponse,
  TaskActionModalProps,
} from "../../types/TaskTypes";
import MakeRequest from "../../types/MakeRequest";
import { toast } from "react-toastify";

const TaskActionModal = ({
  setShowEditModal,
  setDataChanged,
  taskId,
  setEditTaskId,
}: TaskActionModalProps) => {
  const handleEditClick = () => {
    setEditTaskId(taskId);
    setShowEditModal(true);
  };

  const handleTaskdelete = async () => {
    const deleteReqObj = {
      method: "delete",
      url: `/task/${taskId}`,
    };
    try {
      const response = await MakeRequest<DeleteTaskResponse>(deleteReqObj);
      if (response?.status == 200) {
        const { message } = response.data;
        toast.success(message);
        setDataChanged(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data);
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
