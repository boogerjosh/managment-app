"use client";

import clsx from "clsx";
import { useDrag } from "react-dnd";
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import { Task, SectionProps, HeaderProps, TaskProps } from "../lib/types";
import { useTaskSectionStyle } from "hooks/useTaskSectionStyle";

let buttonDropDown = [
  {
    id: "edit",
    text: "Edit",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
    color: "text-[#656F79]",
  },
  {
    id: "delete",
    text: "Delete",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    ),
    color: "text-[#bc4841]",
  },
];

const Section: React.FC<SectionProps> = ({
  status,
  tasks,
  changeTaskStatus,
  handleDeleteTask,
  openModal,
}) => {
  const addItemSection =
    async (id: string) => {
      await changeTaskStatus(id, status);
    }

  const { text, isOver, drop } = useTaskSectionStyle(status, addItemSection);
  let tasksToMap: Task[] = []
  if (tasks)
    tasksToMap = tasks.filter((task) => task.status === status);

  return (
    <div className={clsx('w-2/6', isOver ? 'bg-slate-200' : '')} ref={drop}>
      <Header text={text} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            openModal={openModal}
          />
        ))}
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ text, count }) => {
  return (
    <div
      className={clsx(
        text === "To Do" && "bg-slate-500",
        text === "In Progress" && "bg-purple-500",
        text === "Completed" && "bg-green-500",
        "flex items-center h-12 pl-4 rounded-md uppercase text-base text-white"
      )}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task: React.FC<TaskProps> = ({ task, handleDeleteTask, openModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (menuRef.current && target && !menuRef.current.contains(target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);


  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleEditAndDelete = async (type: string) => {
    setIsDropdownOpen(false); // Close the dropdown immediately

    if (type === "Edit") {
      openModal(task);
    } else {
      await handleDeleteTask(task.id, task.status);
    }
  };

  return (
    <div
      ref={drag}
      className={clsx(
        "p-4 relative mt-8 shadow-md rounded-md cursor-grab",
        isDragging ? "opacity-25" : "opacity-100"
      )}
    >
      <div>
        <span className="text-gray-800">{task.name}</span>
      </div>
      <div>
        <span className="text-gray-400 text-sm">{task.description}</span>
      </div>

      {/*Button dropdown */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="absolute bottom-1 right-1 text-slate-400 active:text-blue-300 text-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <DropDownMenu menuRef={menuRef} buttonDropDown={buttonDropDown} isDropdownOpen={isDropdownOpen} handleEditAndDelete={handleEditAndDelete} />
    </div>
  );
};

export default Section;
