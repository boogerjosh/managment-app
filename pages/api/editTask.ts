import { validateJWT } from "../../lib/auth";
import { db } from "../../lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  const { name, projectId, description, taskId } = req.body;

  try {
    // Check if the project exists
    const project = await db.project.findFirst({
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
    const newTask = await db.task.update({
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