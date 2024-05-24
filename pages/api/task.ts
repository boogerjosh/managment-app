import { prisma } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { taskId, newStatus } = req.body; // Extract taskId and newStatus from the request body

  await prisma.task.update({
    where: { id: taskId }, // Update the task with the provided taskId
    data: {
      status: newStatus, // Update the status of the task
    },
  });

  res.json({ data: { message: "ok" } });
}
