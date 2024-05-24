"use client";

import Button from "./Button";
import Card from "./Card";
import Section from "./SectionDropDrag";
import { useCallback, useState } from "react";
import Modal from "react-modal";
import Input from "./Input";
import { createTask, deleteTask, editTask, editTaskStatus } from "../lib/api";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskStatus } from "../lib/types";

Modal.setAppElement("#modal");

type TaskCardProps = {
  tasks: Task[];
  title: string;
  projectId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ tasks, title, projectId }) => {
  const [taskDatas, setTaskDatas] = useState<Task[]>(tasks)
  const [task, setTask] = useState<Task | null>();
  const [valueInputs, setValueInputs] = useState({ name: "", description: "" })
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const statuses: TaskStatus[] = ["NOT_STARTED", "STARTED", "COMPLETED"];

  const openModal = (task?: Task) => {
    setTask(task);

    // Set default values based on whether a task is provided or not
    setValueInputs({
      name: task?.name ?? "",
      description: task?.description ?? ""
    });

    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const changeTaskStatus = useCallback(async (id: string, status: string) => {
    setTaskDatas((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
    await editTaskStatus(id, status);
  }, [taskDatas]);

  const handleDeleteTask = useCallback(async (id: string, status: string) => {
    setTaskDatas((prev) =>
      prev.filter((task) => !(task.id === id && task.status === status))
    );
    await deleteTask(id);
  }, [taskDatas]);

  const handleInsertAndEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newTask = {
      id: uuidv4(), // Generate a random ID for the new task
      name: valueInputs.name,
      description: valueInputs.description,
      status: "NOT_STARTED"
    };

    if (task) {
      toast.promise(editTask(newTask.name, projectId, newTask.description, task.id),
        {
          loading: 'Saving...',
          success: (data: any) => {
            setTaskDatas((prev) =>
              prev.map((t) =>
                t.id === task.id ? { ...t, name: newTask.name, description: newTask.description } : t
              )
            );
            setTask(null);
            setLoading(false);
            setValueInputs({
              name: "",
              description: ""
            });
            closeModal();
            if (data.status === 500) throw new Error("server error");
            return "Everything went smoothly.";
          },
          error: "Uh oh, there was an error!",
        }
      );
    } else {
      // Create a new task with the provided name and description, and a default status of NOT_STARTED
      toast.promise(
        createTask(
          newTask.name,
          projectId,
          newTask.description,
          newTask.id
        ),
        {
          loading: 'Saving...',
          success: (data: any) => {
            const newValue = [...taskDatas, data.task]
            setTaskDatas(newValue);
            setLoading(false);
            setValueInputs({
              name: "",
              description: ""
            });
            closeModal();
            if (data.status === 500) throw new Error("server error");
            return "Everything went smoothly.";
          },
          error: "Uh oh, there was an error!",
        }
      );
    }
  };

  return (
    <Card className="overflow-y-scroll">
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
        {statuses.map((status: TaskStatus) => (
          <Section
            key={status}
            status={status}
            tasks={taskDatas}
            changeTaskStatus={changeTaskStatus}
            handleDeleteTask={handleDeleteTask}
            openModal={openModal}
          />
        ))}
      </div>

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
            value={valueInputs.name}
            onChange={(e) => setValueInputs({ ...valueInputs, name: e.target.value })}
          />
          <textarea
            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full mt-2"
            rows={5}
            placeholder="task description"
            name="description"
            id="description"
            value={valueInputs.description}
            onChange={(e) => setValueInputs({ ...valueInputs, description: e.target.value })}
          ></textarea>
          <div className="flex items-center text-right w-full justify-end mt-2.5">
            <Button
              onClick={() => closeModal()}
              type="button"
              size="medium"
              disabled={loading}
              intent="danger"
              className="mr-2.5"
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit" size="medium">
              {task ? "Edit" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
};

export default TaskCard;
