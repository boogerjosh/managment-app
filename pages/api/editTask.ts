import { validateJWT } from "../../lib/auth";
import { prisma } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  const { name, projectId, description, taskId } = req.body;

  try {
    // Check if the project exists
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: user?.id,
      },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }

    // Create the new task
    const newTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name: name,
        ownerId: user.id,
        projectId: project.id,
        description: description,
      },
    });

    res.json({ data: { message: "ok", task: newTask } });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the task' });
  }
} 
