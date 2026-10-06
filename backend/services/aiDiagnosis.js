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

Analyze the crop symptoms and provide a concise and practical diagnosis.

IMPORTANT RULES:
- Do NOT use Markdown.
- Do NOT use tables.
- Do NOT use bullet points.
- Do NOT ask follow-up questions.
- Keep the answer simple and easy to understand.
- Do not give unnecessary explanations.
- Return the answer EXACTLY in this format:

Disease Name: <disease name or "Uncertain">

Cause: <short explanation of the cause>

Treatment: <short practical treatment>

Prevention: <short practical prevention>

Confidence: <High / Medium / Low>

If the symptoms are too vague to identify a disease, use "Uncertain" as the Disease Name and explain briefly in the Cause section.
          `,
        },
        {
          role: "user",
          content: `
Crop: ${cropName}

Symptoms: ${symptomText}
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