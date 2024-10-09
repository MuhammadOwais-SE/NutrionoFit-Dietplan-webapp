import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const user = new User(body);
        await user.save();

        return NextResponse.json(user, { status: 201 });

    } catch (error) {
        console.error("Error saving user:", error);

        let errorMessage = "An error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
}
