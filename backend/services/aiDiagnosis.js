const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function diagnoseWithAI(cropName, symptomText) {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "user",
          content: `
Crop: ${cropName}

Symptoms:
${symptomText}

You are an agricultural expert.

Provide a detailed and helpful diagnosis.

Include:
1. Disease Name
2. Cause
3. Symptoms / Explanation
4. Treatment
5. Prevention

If the symptoms are not sufficient to identify a specific disease, clearly say that the diagnosis is uncertain and explain what additional information would help.

Give the answer in a clear, well-structured format that is easy for a farmer to understand.
          `,
        },
      ],

      max_completion_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("========== GROQ ERROR ==========");
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Full Error:", error);
    console.error("================================");

    throw new Error("AI diagnosis service is currently unavailable.");
  }
}

module.exports = diagnoseWithAI;