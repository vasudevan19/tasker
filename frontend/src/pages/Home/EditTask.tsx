import { Editor, type EditorTextChangeEvent } from "primereact/editor";
import { useEffect, useState } from "react";
import axios from "axios";
import type { EditTaskProps, FetchTaskResponse, UpdateTaskResponse } from "../../types/TaskTypes";
import MakeRequest from "../../types/MakeRequest";
import { toast } from "react-toastify";

const EditTask = ({
  setShowEditModal,
  setDataChanged,
  editTaskId,
}: EditTaskProps) => {
  const [updateTask, setUpdateTask] = useState<string>("");
  const TEXT_MAX_LIMIT = 350;

  const fetchSingleTask = async () => {
    const EditTaskReq = {
      url: `/task/${editTaskId}`,
      method: "get",
    };
    try {
      const response = await MakeRequest<FetchTaskResponse>(EditTaskReq);

      if (response?.status == 200) {
        const { message, task } = response?.data;
        setUpdateTask(task.task);
        console.log(message);
        // toast.success(message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data);
      } else {
        console.error("common error", err);
      }
    }
  };

  useEffect(() => {
    fetchSingleTask();
  }, [editTaskId]);

  const updateTaskFunc = async (text: string) => {
    const updateTaskReq = {
        method: "put",
        url: `/task/${editTaskId}`,
        data: {
          task: text,
        },
      }
    try {
      const response = await MakeRequest<UpdateTaskResponse>(updateTaskReq);

      if (response?.status == 200) {
        const { message } = response.data;
        toast.success(message);
        setDataChanged(true);
        setShowEditModal(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
       if (err.response?.status === 422) {
          const {task} =
            err.response?.data?.errors;
            toast.error(task);
          
        }
      } else {
        toast.error("An error occured");
        console.error("common error", err);
      }
    }
  };

  const handleTextValue = (e: EditorTextChangeEvent) => {
    if (e.textValue.length >= TEXT_MAX_LIMIT) {
      console.log("The value must be below 350 characters");
      return;
    } else {
      setUpdateTask(e.htmlValue || "");
    }
  };

  const handleUpdate = () => {
    updateTaskFunc(updateTask);
  };

  return (
    <div
      className="fixed top-0 w-full h-full bg-black/35 flex justify-center items-center"
      onClick={() => setShowEditModal(false)}
    >
      <div
        className="bg-white p-3 mx-2 rounded shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between font-semibold">
          <p className=" text-xl">Edit Task</p>
        </div>
        <div className=" my-2">
          <Editor
            style={{ height: "200px", maxWidth: "700px" }}
            value={updateTask || ""}
            onTextChange={(e) => handleTextValue(e)}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowEditModal(false)}
            className="cursor-pointer px-3 md:px-4 md:py-1 hover:bg-sky-400 hover:text-white border rounded border-sky-400"
          >
            Cancel
          </button>
          <button
            className="bg-sky-500 hover:bg-sky-600 px-3 md:px-5 md:py-1 cursor-pointer rounded-sm text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
