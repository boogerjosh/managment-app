"use client";

import Button from "./Button";
import Card from "./Card";
import Section from "./SectionDropDrag";
import { useCallback, useState } from "react";
import Modal from "react-modal";
import Input from "./Input";
import { createTask, editTask } from "../lib/api";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

// const getData = async () => {
//   const user = await getUserFromCookie(cookies());

//   const tasks = await db.task.findMany({
//     where: {
//       ownerId: user?.id,
//       NOT: {
//         status: TASK_STATUS.COMPLETED,
//         deleted: false,
//       },
//     },
//     take: 5,
//     orderBy: {
//       due: "asc",
//     },
//   });

//   return tasks;
// };

Modal.setAppElement("#modal");

const TaskCard = ({ tasks: initialTasks, title, projectId }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [task, setTask] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const statuses = ["NOT_STARTED", "STARTED", "COMPLETED"];

  const openModal = (task) => {
    if (task) {
      setTask(task);
      setName(task.name);
      setDescription(task.description);
    } else {
      setTask(null);
      setName("");
      setDescription("");
    }
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const changeTaskStatus = useCallback(async (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }, []);

  const handleDeleteTask = useCallback(async (id, status) => {
    setTasks((prev) =>
      prev.filter((task) => !(task.id === id && task.status === status))
    );
  }, []);

  const handleInsertAndEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    let res;
    const newTask = {
      id: uuidv4(), // Generate a random ID for the new task
      name: name,
      description: description,
      status: "NOT_STARTED",
    };

    if (task) {
      res = editTask(name, projectId, description, task.id);
    } else {
      // Create a new task with the provided name and description, and a default status of NOT_STARTED
      res = createTask(
        newTask.name,
        projectId,
        newTask.description,
        newTask.id
      );
    }

    toast.promise(res, {
      loading: "Loading ...",
      success: (data) => {
        if (task) {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id ? { ...t, name, description } : t
            )
          );
        } else {
          setTasks((prev) => [...prev, newTask]);
        }
        setName("");
        setDescription("");
        setTask(null);
        setLoading(false);
        closeModal();
        if (data.status === 500) throw new Error("server error");
        return "Everything went smoothly.";
      },
      error: "Uh oh, there was an error!",
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button
            onClick={() => openModal()}
            intent="text"
            className="text-violet-600"
          >
            + Create New
          </Button>
        </div>
      </div>
      <div className="flex gap-8 py-2 mt-5 w-full">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            changeTaskStatus={changeTaskStatus}
            handleDeleteTask={handleDeleteTask}
            openModal={openModal}
          />
        ))}
      </div>
      {/* <div>
        {data && data.length && (
          <div>
            {data.map((task) => (
              <div className="py-2" key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/2 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">{task ? "Edit Task" : "New Task"}</h1>
        <form onSubmit={handleInsertAndEdit}>
          <Input
            placeholder="task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full mt-2"
            rows="5"
            placeholder="task description"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <Button
            disabled={loading}
            type="submit"
            style={{ marginTop: "10px" }}
          >
            {task ? "Edit" : "Create"}
          </Button>
        </form>
      </Modal>
    </Card>
  );
};

export default TaskCard;
