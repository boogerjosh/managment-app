import { createJWT } from "../../lib/auth";
import { serialize } from 'cookie';
import { prisma } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        })

        console.log(user, "===> user")

        const jwt = await createJWT(user);

        res.setHeader(
            'Set-Cookie',
            serialize(process.env.COOKIE_NAME, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
        );

        res.status(201);
        res.json({})
    } else {
        res.status(405);
        res.json({})
    }
}
