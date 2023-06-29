import { prisma } from "@/lib/prisma";
// import { blogBodyType } from "@/lib/types";
import { randomUUID } from "crypto";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// GET ALL BLOGS
export async function GET(request: NextApiRequest, { params }: any) {
  const { user: userslug } = params;
  const user = await prisma.user.findUnique({
    where: {
      slug: userslug as string,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      photoURL: true,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const blogs = await prisma.blog.findMany({
    where: {
      authorId: user.id,
    },
  });

  return NextResponse.json({ user, blogs });
}

// CREATE BLOG
export async function POST(request: Request, { params }: any) {
  const { user: userslug } = params;
  const data = await request.json();
  console.log(data);
  const user = await prisma.user.findUnique({
    where: {
      slug: userslug as string,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      photoURL: true,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const blog = await prisma.blog.create({
    data: {
      title: "NewBlog",
      description: "Created using nextjs",
      slug: randomUUID(),
      jsonContent: JSON.parse(
        '{ "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Hello World!" }] }] }'
      ),
      htmlContent: "<p>Hello World!</p>",
      isDraft: true,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return NextResponse.json({ user, blog });
}
