import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const { user: userslug, blogslug } = request.query;
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
  const blog = await prisma.blog.findUnique({
    where: {
      slug: blogslug as string,
    },
  });

  if (!blog || blog.isDraft) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ user, blog });
}
