import { useEffect, useRef, useState } from "react";
import threeDotsIcon from "../../assets/images/three-dots.png";
import TaskActionModal from "./TaskActionModal";
import axiosInstance from "../../assets/api/axiosInstance";
import axios from "axios";
type TaskListProps = {
  setShowEditModal: (value: boolean) => void;
  dataChanged: boolean;
  setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTaskId: (value: number) => void;
};

type Task = {
  id: number;
  task: string;
  is_completed: boolean;
  created_by: number;
  created_at: string;
};

type TaskGroup = {
  date: string;
  tasks: Task[];
};
const TaskList = ({
  setShowEditModal,
  dataChanged,
  setDataChanged,
  setEditTaskId,
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
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/tasks",
      });

      if (response?.status == 200) {
        const { message, tasks } = response?.data;
        console.log(message);
        console.log(tasks);
        
        if (tasks.length > 0) {
          setTaskList(tasks);
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
      } else {
        console.error("common error", err);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dataChanged]);

  const handleActionMenu = (id: number) => {
    setActiveTaskId(activeTaskId === id ? null : id);
    setDataChanged(false);
  };

  const handleTaskCompleted = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setIsCompleted((prev) => ({ ...prev, [id]: e.target.checked ?? false }));

    try {
      const response = await axiosInstance({
        method: "patch",
        url: `/task/status/${id}`,
        data: {
          is_completed: e.target.checked,
        },
      });

      if (response?.status == 200) {
        const { message } = response?.data;
        console.log(message);
        setDataChanged((prev) => !prev);
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
    <>
      {taskList.map((group) => (
        <div key={group.date}>
          <p className="text-gray-400">
            {new Date(group.date).toLocaleDateString()}
          </p>
          {group.tasks.map((task) => (
            <div
              className="bg-white flex gap-2  p-2 items-center lg:h-[70px] lg:px-4 mb-3 shadow-md "
              key={task.id}
            >
              <div>
                <input
                  type="checkbox"
                  name=""
                  onChange={(e) => handleTaskCompleted(e, task.id)}
                  checked={isCompleted[task.id]}
                />
              </div>
              <div className="flex w-[100%] justify-between">
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: task.task }}
                ></div>
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
      ))}
    </>
  );
};

export default TaskList;
