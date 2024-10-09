import dbConnect from "@/lib/dbConnect";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request){
//    await dbConnect();
   try {
    const user = await User.find({});
    return NextResponse.json(user);
   } catch (error) {
    let errorMessage = "Error in fetching user data";
    if (error instanceof Error){
        errorMessage = error.message;
    }

    console.error("Error fetching user:", error);
    return NextResponse.json({ error: errorMessage}, {status: 400});
    }
}