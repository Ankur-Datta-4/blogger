import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// GET USER DETAILS
export async function GET(request: NextApiRequest, { params }: any) {
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
