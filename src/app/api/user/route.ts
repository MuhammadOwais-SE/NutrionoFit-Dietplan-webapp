import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { fetchDataAnalysis } from "@/lib/geminiAPI";

// Function to handle batched API requests
export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const user = new User(body);
        await user.save();

        // Prepare user diet information
        const userDiet =`
        Nutrition Assessment and Personalized Plan
        Analyze the following information for ${user.name}  :

        Age: ${user.age}
        Height: ${user.height}Ft
        Weight: ${user.weight}Kg
        Gender: ${user.gender}  
        Goal: ${user.goal}
        Current Diet:

        Breakfast: ${user.diet.breakfast.join(', ')}
        Lunch: ${user.diet.lunch.join(', ')}
        Dinner: ${user.diet.dinner.join(', ')}
        As an expert Nutritionist with over 20 years of experience, provide a comprehensive analysis and personalized plan. Your response will be directly used in a front-end application, so structure it clearly with appropriate formatting for easy reading.
        `
        ;

        // Call the Gemini API with the broken-down user diet plan
        const dietSuggestion = await fetchDataAnalysis(userDiet);
        console.log("Diet Suggestion from API:", dietSuggestion);

        return NextResponse.json({
            success: true,
            message: "User data has been saved and response is generated",
            user,
            dietSuggestion, // Now this should contain the actual suggestion
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error saving user:", error);
        return NextResponse.json({ success: false, message: error.message || "An error occurred" }, { status: 400 });
    }
}
