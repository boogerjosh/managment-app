import { getUserFromCookie } from "../../../../lib/auth";
import { cookies } from "next/headers";
import TaskCard from "../../../../components/TaskCard";
import { prisma } from "../../../../lib/db";
import { Project } from "../../../../lib/types";

async function getData(id: string): Promise<Project> {
  const user = await getUserFromCookie(cookies());

  if (!user) {
    throw new Error('User not found in cookies');
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      ownerId: user.id,
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: 'asc', // or 'desc' for descending order
        },
      },
    },
  });

  if (!project) {
    throw new Error('Project not found or unauthorized');
  }

  return project as Project;
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project: Project = await getData(params.id);

  return (
    <div className="h-full mx-5 w-full overflow-hidden">
      <TaskCard
        tasks={project.tasks}
        title={project.name}
        projectId={params.id}
      />
    </div>
  );
}
