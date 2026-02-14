import { useState } from "react";
import AddTaskButton from "../../components/Home/AddTaskButton";
import AddTask from "./AddTask";
import TaskList from "../../components/Home/TaskList";
import EditTask from "./EditTask";
import {
  DatePickerInput,
  type DatesRangeValue,
  type DateValue,
} from "@mantine/dates";
import useDebounce from "../../hooks/useDebounce";

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<
    DatesRangeValue<DateValue> | undefined
  >();
  const debounce = useDebounce({ value: dateRange });
  // console.log(debounce);
  
  return (
    <>
      <div className="flex justify-end me-2 md:me-5 fixed top-10 gap-5 mt-14 right-0">
        <DatePickerInput
          type="range"
          clearable
          placeholder="Select Filter Range"
          valueFormat="DD/MM/YYYY"
          value={dateRange}
          onChange={setDateRange}
          className="border-1 border-sky-500 rounded-sm w-[210px] md:w-[230px]"
        />
        <AddTaskButton
          setShowModal={setShowModal}
          // setDataChanged={setDataChanged}
        />
      </div>
      <div className="">
        {showModal && (
          <AddTask
            setShowModal={setShowModal}
            text={text}
            setText={setText}
            setDataChanged={setDataChanged}
          />
        )}
      </div>
      <div className="p-1 lg:mx-6 mt-18">
        <TaskList
          setShowEditModal={setShowEditModal}
          dataChanged={dataChanged}
          setDataChanged={setDataChanged}
          setEditTaskId={setEditTaskId}
          dateRange={debounce}
        />
      </div>
      {showEditModal && (
        <EditTask
          setShowEditModal={setShowEditModal}
          setDataChanged={setDataChanged}
          editTaskId={editTaskId}
        />
      )}
    </>
  );
};

export default Home;
