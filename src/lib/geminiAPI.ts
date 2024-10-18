export async function fetchDataAnalysis(userInput: string) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINIAI_API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: userInput, // User diet information
                            },
                        ],
                    },
                ],
            }),
        }
    );

    // Log the response status for debugging
    console.log("Response Status:", response.status);
    console.log("Response Status Text:", response.statusText);

    const data = await response.json();
    console.log("Parsed data from Gemini API:", data);
    console.log("deep data from Gemini API:", data.candidates[0].content.parts[0].text);

 
    if (data?.candidates && data.candidates.length > 0) {
        // Extract and return the text directly
        const dietText = data.candidates[0].content.parts[0].text;
        console.log("Extracted Text:", dietText);
        return dietText; // Return the extracted text directly
    }
    return null; // Return null if contents do not exist
}
