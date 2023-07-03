import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// GET USER DETAILS
export async function GET(request: Request, { params }: any) {
  const { user: userslug } = params;
  const user = await prisma.user.findUnique({
    where: {
      slug: userslug as string,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

// UPDATE USER DETAILS
export async function PUT(request: Request, { params }: any) {
  const { user: userslug } = params;
  const user = await prisma.user.findUnique({
    where: {
      slug: userslug as string,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { name, email, slug, bio, urls } = await request.json();
  const updatedUser = await prisma.user.update({
    where: {
      slug: userslug as string,
    },
    data: {
      slug,
      name,
      email,
      bio,
      socialLinks: JSON.stringify(urls),
    },
  });

  return NextResponse.json({ user: updatedUser });
}
