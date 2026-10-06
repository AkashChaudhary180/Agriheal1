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
          role: "system",
          content: `
You are an agricultural disease diagnosis expert.

Analyze crop symptoms carefully and provide a useful diagnosis.

Always provide:
1. Disease Name
2. Cause
3. Treatment
4. Prevention

If the symptoms are insufficient to identify the disease with confidence,
clearly mention that the diagnosis is uncertain.
          `,
        },
        {
          role: "user",
          content: `
Crop: ${cropName}

Symptoms:
${symptomText}
          `,
        },
      ],

      max_completion_tokens: 500,
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