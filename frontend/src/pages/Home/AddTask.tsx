import axios from "axios";
import { Editor, type EditorTextChangeEvent } from "primereact/editor";
import type { AddTaskProps, AddTaskResponse } from "../../types/TaskTypes";
import MakeRequest from "../../types/MakeRequest";
import { toast } from "react-toastify";


const AddTask = ({
  setShowModal,
  text,
  setText,
  setDataChanged,
}: AddTaskProps) => {
  const TEXT_MAX_LIMIT = 350;
  const handleCreateTask = async () => {
    const addTaskReq = {
      data: {
        task: text,
      },
      url: "/tasks",
      method: "post",
    };
    try {
      const response = await MakeRequest<AddTaskResponse>(addTaskReq);

      if (response?.status == 201) {
        // console.log(response?.data?.message);
        toast.success(response.data.message);
        setDataChanged((prev) => !prev);
        setShowModal(false);
        setText("");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        if (err.response?.status === 422) {
          const {task} =
            err.response?.data?.errors;
            toast.error(task);
          
        }
      } else {
        toast.error("An error occured")
        console.error("common error", err);
      }
    }
  };

  const handleTextValue = (e: EditorTextChangeEvent) => {
    if (e.textValue.length >= TEXT_MAX_LIMIT) {
      console.log("The value must be below 350 characters");
      return;
    } else {
      setText(e.htmlValue || '');
    }
  };

  return (
    <div
      className="fixed top-0 w-full h-full bg-black/35 flex justify-center items-center"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white p-3 mx-2 rounded shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between font-semibold">
          <p className=" text-xl">Add Task</p>
        </div>
        <div className=" my-2">
          <Editor
            style={{ height: "200px", maxWidth:"700px" }}
            value={text}
            onTextChange={(e) => handleTextValue(e)}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="cursor-pointer px-3 md:px-4 md:py-1 hover:bg-sky-400 hover:text-white border rounded border-sky-400"
          >
            Cancel
          </button>
          <button
            className="bg-sky-500 hover:bg-sky-600 px-3 md:px-5 md:py-1 cursor-pointer rounded-sm text-white"
            onClick={handleCreateTask}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
