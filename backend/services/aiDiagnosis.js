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

Symptoms: ${symptomText}

You are an agricultural expert.

Give a concise diagnosis with:
1. Disease Name
2. Cause
3. Treatment
4. Prevention

Keep each section short and practical.
If uncertain, clearly mention that the diagnosis is uncertain.
          `,
        },
      ],

      max_completion_tokens: 350,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("GROQ ERROR:", error.message);

    throw new Error("AI diagnosis service is currently unavailable.");
  }
}

module.exports = diagnoseWithAI;
