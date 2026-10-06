// const { InferenceClient } = require("@huggingface/inference");

// const client = new InferenceClient(
//   process.env.HF_TOKEN
// );

// async function diagnoseWithAI(cropName, symptomText) {

//   const response = await client.chatCompletion({
//     model: "Qwen/Qwen2.5-7B-Instruct",
//     messages: [
//       {
//         role: "user",
//         content: `
// Crop: ${cropName}

// Symptoms:
// ${symptomText}

// You are an agricultural expert.

// Provide:
// 1. Disease Name
// 2. Cause
// 3. Treatment
// 4. Prevention

// If uncertain, say so.
// `
//       }
//     ]
//   });

//   return response.choices[0].message.content;
// }

// module.exports = diagnoseWithAI;




const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(
  process.env.HF_TOKEN
);

async function diagnoseWithAI(cropName, symptomText) {
  try {
    const response = await client.chatCompletion({
      model: "google/gemma-2-2b-it",
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
      ],
      max_tokens: 300
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("========== HUGGING FACE ERROR ==========");
    console.error("Status:", error.httpResponse?.status);
    console.error("Body:", JSON.stringify(error.httpResponse?.body, null, 2));
    console.error("Full Error:", error);
    console.error("========================================");

    throw error;
  }
}

module.exports = diagnoseWithAI;

