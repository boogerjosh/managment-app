"use client";
import { Project } from "../lib/types";
import Link from "next/link";
import { useState } from "react";
import NewProject from "./NewProject";
import ProjectCard from "./ProjectCard";
import { Prisma } from "@prisma/client";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const MainHomeSection: React.FC<{ projects: ProjectWithTasks[] }> = ({ projects }) => {
  const [datas, setProjects] = useState(projects);

  return (
    <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
      {datas.map((project) => (
        <div className="w-1/3 p-3" key={project.id}>
          <Link href={`/project/${project.id}`} prefetch={true}>
            <ProjectCard project={project} />
          </Link>
        </div>
      ))}
      <div className="w-1/3 p-3">
        <NewProject setProjects={setProjects} />
      </div>
    </div>
  );
};

export default MainHomeSection;
