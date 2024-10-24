import { responseCache } from './cache';

export async function fetchDataAnalysis(userInput: string) {
    // Create a unique key for this specific input
    const cacheKey = Buffer.from(userInput).toString('base64');
    
    // Try to get cached response
    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse) {
        console.log('Returning cached response');
        return cachedResponse as string;
    }

    // If not in cache, make the API call
    const combinedPrompt = `
        As an expert Nutritionist with over 20 years of experience, provide a comprehensive analysis and personalized plan. Your response will be directly used in a front-end application, so structure it clearly with appropriate formatting for easy reading.
        Nutrition Assessment and Personalized Plan Analysis
        Please provide a comprehensive analysis in the following sections:

        1. Assessment of Current Habits:
        2. Health Risks:
        3. Personalized Meal Plan:
        4. Recommendations for Improvement:
        5. Additional Considerations:

        Based on the following information:
        ${userInput}
    `;

    try {
        const response = await fetch(process.env.API_URL || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: combinedPrompt,
                    }],
                }],
            }),
        });

        const data = await response.json();
        const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Store the result in cache before returning
        responseCache.set(cacheKey, result);
        
        return result;
    } catch (error) {
        console.error('Error fetching data analysis:', error);
        throw error;
    }
}