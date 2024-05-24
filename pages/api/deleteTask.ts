import { prisma } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { taskId } = req.body; // Extract taskId and newStatus from the request body

  await prisma.task.delete({
    where: { id: taskId }, // Update the task with the provided taskId
  });

  res.json({ data: { message: "ok" } });
}
