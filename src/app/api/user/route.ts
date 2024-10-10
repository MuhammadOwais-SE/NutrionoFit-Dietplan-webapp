import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { fetchDataAnalysis } from "@/lib/geminiAPI";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const user = new User(body);
        await user.save();

        // Prepare user diet information
        const userDiet = `
        Name: ${user.name},
        Age: ${user.age},
        Height: ${user.height},
        Weight: ${user.weight},
        Gender: ${user.gender},
        Goal: ${user.goal},
        Breakfast: ${user.diet.breakfast.join(', ')},
        Lunch: ${user.diet.lunch.join(', ')},
        Dinner: ${user.diet.dinner.join(', ')},
        `;

        // Call Gemini API
       
        // Extract content from API response
          // Call Gemini API and receive diet suggestion
          const dietSuggestion = await fetchDataAnalysis(userDiet);
          console.log("Diet Suggestion from API:", dietSuggestion);
  

        return NextResponse.json({
            success: true,
            message: "User data has been saved and response is generated",
            user,
            dietSuggestion, // Now this should contain the actual suggestion
        }, { status: 201 });

    } catch (error) {
        console.error("Error saving user:", error);

        let errorMessage = "An error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
}
