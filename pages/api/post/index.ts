import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fileds in body: title
// Required fileds in body: content
export default async function handle(req, res) {
    const { title, content } = req.body;

    const session = await getSession({ req });
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: session?.user?.email } },
        }
    });
    res.json(result);
}