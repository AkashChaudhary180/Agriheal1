
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
You are an agricultural disease diagnosis assistant for AgriHeal.

Your task is to identify the most likely disease based on the given crop and symptoms.

Return the answer in EXACTLY this format:

Disease Name (Type)

Symptoms keywords: keyword1, keyword2, keyword3

Treatment: [practical treatment]

Pesticide: [appropriate pesticide or "None"]

Prevention: [practical prevention methods]

STRICT RULES:
- Do not add any extra sections.
- Do not add "Cause".
- Do not add a general explanation.
- Do not add a confidence score.
- Do not add disclaimers unless the diagnosis is genuinely uncertain.
- Keep the response concise.
- Type must be one of: Fungal, Bacterial, Viral, or Unknown.
- Symptoms keywords should be short, relevant symptom phrases.
- Treatment, pesticide, and prevention should contain practical information.
- If the symptoms are insufficient to identify a disease, use "Unknown" as the disease type and clearly say the diagnosis is uncertain in the Disease Name line.
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

      max_completion_tokens: 350,
    });

    return completion.choices[0].message.content.trim();

  } catch (error) {
    console.error("GROQ ERROR:", error.message);

    throw new Error("AI diagnosis service is currently unavailable.");
  }
}

module.exports = diagnoseWithAI;

