"use client";

import { useState } from "react";
import Modal from "react-modal";
import { createNewProject } from "../lib/api";
import Button from "./Button";
import Input from "./Input";
import { getAllProject } from "../lib/api";

Modal.setAppElement("#modal");

const NewProject = ({ addNewProject }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createNewProject(name);
    let newProject = { ...res.project, tasks: [] };
    addNewProject(newProject);
    closeModal();
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
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;
