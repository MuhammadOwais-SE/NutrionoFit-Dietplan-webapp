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
1. Assessment of Current Habits
Evaluate the individual's current dietary habits:

Identify positive aspects of their diet
Highlight areas that need improvement
Consider how their habits align with their weight loss goal

2. Health Risks
Outline potential health risks associated with:

Continuing current dietary habits
Following an unbalanced diet
Physical inactivity

Emphasize the importance of balanced nutrition and regular exercise.
3. Personalized Meal Plan
Design a tailored meal plan that supports their weight loss goal:
Breakfast (approximately X calories)

[Meal description with specific portions]
[Nutritional breakdown]

Lunch (approximately Y calories)

[Meal description with specific portions]
[Nutritional breakdown]

Dinner (approximately Z calories)

[Meal description with specific portions]
[Nutritional breakdown]

Snacks (if applicable)

[1-2 healthy snack options with portion sizes]

Explain how this meal plan contributes to a balanced diet and supports their goal.
4. Recommendations for Improvement
Suggest specific lifestyle changes to enhance goal achievement:

Exercise recommendations (type, frequency, duration)
Strategies for portion control
Hydration guidelines
Meal preparation tips
Any other relevant lifestyle adjustments

5. Additional Considerations
Address any missing information that could impact their health plan:

Importance of knowing current activity level
Relevance of any existing medical conditions
How these factors might influence the nutrition and exercise plan

Conclude with an encouraging message about achieving their health goals through these personalized recommendations.
Note: Ensure all text is properly structured with clear headings, subheadings, and bullet points. Do not use Markdown-style formatting (such as asterisks for bold). Instead, use descriptive language to indicate emphasis or importance. 
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
