import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await connectDB();
    const user = await User.findOne({ username: (await params).username })
      .select(
        "_id name email username image bio followingCount followersCount postCount"
      )
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const formattedUser = { ...user, id: user._id };
    
    return NextResponse.json(formattedUser);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
