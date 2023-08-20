"use client";
import Link from "next/link";
import { useState } from "react";
import NewProject from "./NewProject";
import ProjectCard from "./ProjectCard";

const MainHomeSection = ({ projects }) => {
  const [datas, setProjects] = useState(projects);

  const addNewProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
      {datas.map((project) => (
        <div className="w-1/3 p-3" key={project.id}>
          <Link href={`/project/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        </div>
      ))}
      <div className="w-1/3 p-3">
        <NewProject addNewProject={addNewProject} />
      </div>
    </div>
  );
};

export default MainHomeSection;
