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

Identify the most likely disease based on the crop and symptoms.

Return ONLY the following format:

Disease Name (Type)

Symptoms keywords: keyword1, keyword2, keyword3

Treatment: [treatment]

Pesticide: [pesticide or None]

Prevention: [prevention]

STRICT RULES:
- Always provide a response.
- Never return an empty response.
- Do not add Cause.
- Do not add extra sections.
- Do not add explanations before or after the format.
- Type must be Fungal, Bacterial, Viral, or Unknown.
- If the symptoms are not sufficient for an exact diagnosis, give the most likely disease and mention uncertainty briefly.
- Symptoms keywords must be relevant to the given symptoms.
- Treatment, pesticide and prevention should be practical and concise.
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

    const content = completion.choices?.[0]?.message?.content;

    if (!content || !content.trim()) {
      return `Unknown (Unknown)

Symptoms keywords: ${symptomText}

Treatment: Diagnosis could not be determined reliably.

Pesticide: None

Prevention: Please provide more specific symptoms for accurate diagnosis.`;
    }

    return content.trim();

  } catch (error) {
    console.error("GROQ ERROR:", error.message);

    throw new Error("AI diagnosis service is currently unavailable.");
  }
}

module.exports = diagnoseWithAI;
