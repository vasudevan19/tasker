import { useEffect, useRef, useState } from "react";
import threeDotsIcon from "../../assets/images/three-dots.png";
import TaskActionModal from "./TaskActionModal";
import axios from "axios";
import type { Task, TaskCompleteResponse, TaskGroup, TaskListProps, TaskListResponse } from "../../types/TaskTypes";
import MakeRequest from "../../types/MakeRequest";
import { toast } from "react-toastify";


const TaskList = ({
  setShowEditModal,
  dataChanged,
  setDataChanged,
  setEditTaskId,
  dateRange,
}: TaskListProps) => {
  const [taskList, setTaskList] = useState<TaskGroup[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setActiveTaskId(null);
      }
    }

    if (activeTaskId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTaskId]);

  const fetchTasks = async () => {
    const fetchTasksObj = {
      method: "get",
      url: "/tasks",
      params: { date_range: dateRange }
    };
    try {
      const response = await MakeRequest<TaskListResponse>(fetchTasksObj);

      if (response?.status == 200) {
        const {  tasks } = response?.data;
        setTaskList(tasks);
        // toast.success(message);
        if (tasks.length > 0) {
          const completedMap: Record<number, boolean> = {};

          tasks.forEach((group: TaskGroup) => {
            group.tasks.forEach((task: Task) => {
              completedMap[task.id] = task.is_completed;
            });
          });

          setIsCompleted(completedMap);
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        toast.error(err.response?.data);
      } else {
        
        console.error("common error", err);
      }
    }
  };

  useEffect(() => {
    
    fetchTasks();
  }, [dataChanged, dateRange]);

  const handleActionMenu = (id: number) => {
    setActiveTaskId(activeTaskId === id ? null : id);
    setDataChanged(false);
  };

  const handleTaskCompleted = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setIsCompleted((prev) => ({ ...prev, [id]: e.target.checked ?? false }));
    const taskCompletedReq = {
      method: "patch",
      url: `/task/status/${id}`,
      data: {
        is_completed: e.target.checked,
      },
    };
    try {
      const response = await MakeRequest<TaskCompleteResponse>(taskCompletedReq);

      if (response?.status == 200) {
        const { message } = response?.data;
        toast.success(message);
        setDataChanged((prev) => !prev);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status == 422) {
          const { is_completed } = err.response?.data?.errors;
          toast.error(is_completed);
        }
        toast.error(err.response?.data);
      } else {
        console.error("common error", err);
      }
    }
  };



 

 return (
  <>
    {taskList.length > 0 ? (
      taskList.map((group) => (
        <div key={group.date}>
          <p className="text-gray-400">
            {new Date(group.date).toLocaleDateString()}
          </p>

          {group.tasks.map((task) => (
            <div
              className="bg-white flex gap-2 p-2 items-center lg:h-[70px] lg:px-4 mb-3 shadow-md"
              key={task.id}
            >
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => handleTaskCompleted(e, task.id)}
                  checked={!!isCompleted[task.id]}
                />
              </div>

              <div className="flex w-full justify-between">
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: task.task }}
                />

                <div>
                  <img
                    src={threeDotsIcon}
                    alt="icon"
                    className="min-w-[24px] max-w-[24px]"
                    onClick={() => handleActionMenu(task.id)}
                  />

                  <div className="relative" ref={modalRef}>
                    {activeTaskId === task.id && (
                      <TaskActionModal
                        setShowEditModal={setShowEditModal}
                        setDataChanged={setDataChanged}
                        taskId={task.id}
                        setEditTaskId={setEditTaskId}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 mt-5">No data found</p>
    )}
  </>
);

};

export default TaskList;
