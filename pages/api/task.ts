import { db } from "../../lib/db";

export default async function handler(req, res) {

  const { taskId, newStatus } = req.body; // Extract taskId and newStatus from the request body

  await db.task.update({
    where: { id: taskId }, // Update the task with the provided taskId
    data: {
      status: newStatus, // Update the status of the task
    },
  });

  res.json({ data: { message: "ok" } });
}
