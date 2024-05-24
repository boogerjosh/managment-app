"use client";

import { Prisma } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { createNewProject } from "../lib/api";
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

type NewProjectProps = {
  setProjects: Dispatch<SetStateAction<ProjectWithTasks[]>>;
}

const NewProject: React.FC<NewProjectProps> = ({ setProjects }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.promise(createNewProject(name),
      {
        loading: 'Saving...',
        success: (data: any) => {
          setProjects((prev) => [...prev, data.project]);
          setName("");
          setLoading(false);
          closeModal();
          if (data.status === 500) throw new Error("server error");
          return "Everything went smoothly.";
        },
        error: "Uh oh, there was an error!",
      }
    );
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()}>+ New Project</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/2 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center gap-x-4" onSubmit={handleSubmit}>
          <Input
            placeholder="project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button disabled={loading} type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;
