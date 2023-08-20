import { db } from "../../lib/db";

export default async function handler(req, res) {

  const { taskId } = req.body; // Extract taskId and newStatus from the request body

  await db.task.delete({
    where: { id: taskId }, // Update the task with the provided taskId
  });

  res.json({ data: { message: "ok" } });
}