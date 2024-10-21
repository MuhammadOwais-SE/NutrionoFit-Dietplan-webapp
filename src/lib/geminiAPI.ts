export async function fetchDataAnalysis(userInput: string) {
    const sections = [
        `1. Assessment of Current Habits:\n${userInput}`,
        `2. Health Risks:\n${userInput}`,
        `3. Personalized Meal Plan:\n${userInput}`,
        `4. Recommendations for Improvement:\n${userInput}`,
        `5. Additional Considerations:\n${userInput}`
    ];

    let fullResponse = "";

    for (const section of sections) {
        const response = await fetch(process.env.API_URL || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: section, // Send smaller sections of the user diet
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await response.json();
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            fullResponse += data.candidates[0].content.parts[0].text + '\n';
        }
    }

    return fullResponse;
}
