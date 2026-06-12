const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(
  process.env.HF_TOKEN
);

async function diagnoseWithAI(cropName, symptomText) {

  const response = await client.chatCompletion({
    model: "Qwen/Qwen2.5-7B-Instruct",
    messages: [
      {
        role: "user",
        content: `
Crop: ${cropName}

Symptoms:
${symptomText}

You are an agricultural expert.

Provide:
1. Disease Name
2. Cause
3. Treatment
4. Prevention

If uncertain, say so.
`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = diagnoseWithAI;