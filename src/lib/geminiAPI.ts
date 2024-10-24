export async function fetchDataAnalysis(userInput: string) {
    // Define all sections in a single prompt
    const combinedPrompt = `
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
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
        console.error('Error fetching data analysis:', error);
        throw error;
    }
}
