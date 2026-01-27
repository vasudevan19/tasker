import { useState } from "react";
import AddTaskButton from "../../components/Home/AddTaskButton";
import AddTask from "./AddTask";
import TaskList from "../../components/Home/TaskList";
import EditTask from "./EditTask";

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  return (
    <>
      <div className="flex justify-end me-5 sticky z-30 top-20">
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
      <div className="p-1 mt-4 lg:mx-6">
        <TaskList
          setShowEditModal={setShowEditModal}
          dataChanged={dataChanged}
          setDataChanged={setDataChanged}
          setEditTaskId={setEditTaskId}
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
