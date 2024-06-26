import { NextApiRequest, NextApiResponse } from "next";
import { createJWT } from "../../lib/auth";
import { serialize } from "cookie";
import { prisma } from "../../lib/db";

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            res.status(401);
            res.json({ error: "Invalid login" });
            return;
        }

        const jwt = await createJWT(user);

        res.setHeader(
            "Set-Cookie",
            serialize(process.env.COOKIE_NAME, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
        );
        res.status(201);
        res.json({})
    }
}
