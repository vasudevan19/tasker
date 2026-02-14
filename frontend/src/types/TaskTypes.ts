import type { DatesRangeValue, DateValue } from "@mantine/dates";

export type AddTaskProps = {
  setShowModal: (value: boolean) => void;
  text: string;
  setText: (value: string) => void;
  setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TaskActionResponse = {
    status: 'success' | 'error';
    message: string;
}

export type AddTaskResponse = TaskActionResponse;
export type EditTaskResponse = TaskActionResponse;

export type EditTaskProps = {
  setShowEditModal: (value: boolean) => void;
  setDataChanged: (value: boolean) => void;
  editTaskId: number | null;
};

export type FetchTaskResponse = TaskActionResponse & { task: { id: number, task: string } };

export type UpdateTaskResponse = TaskActionResponse;

export type DeleteTaskResponse = TaskActionResponse;

export type AddTaskButtonProps = {
  setShowModal: (value: boolean) => void;
}

export type TaskListProps = {
  setShowEditModal: (value: boolean) => void;
  dataChanged: boolean;
  setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTaskId: (value: number) => void;
  dateRange: DatesRangeValue<DateValue> | undefined
};

export type Task = {
  id: number;
  task: string;
  is_completed: boolean;
  created_by: number;
  created_at: string;
};

export type TaskGroup = {
  date: string;
  tasks: Task[];
};

export type TaskActionModalProps = {
  setShowEditModal: (value: boolean) => void;
  setDataChanged: (value: boolean) => void;
  taskId: number;
  setEditTaskId: (val: number) => void;
};

export type UserProfileProps = {
  setOpenProfile: (value: boolean) => void;
  user: string;
};

export type TaskListResponse = TaskActionResponse & { tasks: TaskGroup[] };

export type TaskCompleteResponse = TaskActionResponse;