import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { fetchDataAnalysis } from "@/lib/geminiAPI";

export async function POST(req: Request) {
    await dbConnect();
    
    try {
        // Connect to DB and fetch data concurrently
        const [body] = await Promise.all([
            req.json(),
            dbConnect()
        ]);

        const user = new User(body);

        // Prepare user diet information
        const userDiet = `
            Nutrition Assessment and Personalized Plan
            Analyze the following information for ${user.name}:

            Age: ${user.age}
            Height: ${user.height}Ft
            Weight: ${user.weight}Kg
            Gender: ${user.gender}
            
            Goal: ${user.goal}
            Current Diet:
            
            Breakfast: ${user.diet.breakfast.join(', ')}
            Lunch: ${user.diet.lunch.join(', ')}
            Dinner: ${user.diet.dinner.join(', ')}
            
            As an expert Nutritionist with over 20 years of experience, provide a comprehensive analysis and personalized plan.
        `;

        // Save user and fetch diet suggestion concurrently
        const [savedUser, dietSuggestion] = await Promise.all([
            user.save(),
            fetchDataAnalysis(userDiet)
        ]);

        return NextResponse.json({
            success: true,
            message: "User data has been saved and response is generated",
            user: savedUser,
            dietSuggestion,
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "An error occurred" 
        }, { status: 400 });
    }
}