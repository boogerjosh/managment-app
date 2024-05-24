import { validateJWT } from "../../lib/auth";
import { prisma } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  const newProject = await prisma.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  res.json({ data: { message: "ok", project: newProject } });
} 
