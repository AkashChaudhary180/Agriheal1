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

You are an agricultural expert. Provide a concise but complete diagnosis.

Use exactly these 4 sections:

1. Disease Name
2. Cause
3. Treatment
4. Prevention

Give practical information.
Keep each section to 1-2 short sentences or 2-3 bullet points.
Do not add extra sections.
If the symptoms are insufficient, clearly mention that the diagnosis is uncertain.
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
