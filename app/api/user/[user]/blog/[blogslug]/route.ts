import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// GET BLOG DETAILS
export async function GET(request: NextApiRequest, { params }: any) {
  const { user: userslug, blogslug } = params;
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
  // based on user-auth raise error status for draft blogs
  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ user, blog });
}

// UPDATE BLOG
export async function PUT(request: Request, { params }: any) {
  const { user: userslug, blogslug } = params;
  const data = await request.json();
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

  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  if (blog.authorId !== user.id) {
    return NextResponse.json(
      { message: "You are not authorized to edit this blog" },
      { status: 401 }
    );
  }

  const updatedBlog = await prisma.blog.update({
    where: {
      slug: blogslug as string,
    },
    data: data,
  });

  return NextResponse.json({ blog: updatedBlog });
}

// DELETE BLOG
export async function DELETE(request: Request, { params }: any) {
  const { user: userslug, blogslug } = params;
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

  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  if (blog.authorId !== user.id) {
    return NextResponse.json(
      { message: "You are not authorized to delete this blog" },
      { status: 401 }
    );
  }

  const deletedBlog = await prisma.blog.delete({
    where: {
      slug: blogslug as string,
    },
  });

  return NextResponse.json({ blog: deletedBlog });
}
