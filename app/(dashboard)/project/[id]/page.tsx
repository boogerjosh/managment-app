import { db } from "../../../../lib/db";
import { getUserFromCookie } from "../../../../lib/auth";
import { cookies } from "next/headers";
import TaskCard from "../../../../components/TaskCard";

const getData = async (id) => {
  const user = await getUserFromCookie(cookies());

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({ params }) {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto px-5 w-full">
      <TaskCard
        tasks={project.tasks}
        title={project.name}
        projectId={params.id}
      />
    </div>
  );
}
