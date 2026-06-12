// backend/controllers/diseaseController.js
const fs = require("fs");
const path = require("path");
const { FungalDisease, BacterialDisease, ViralDisease } = require("../models/Disease");
const Crop = require("../models/Crop");
const diagnoseWithAI = require("../services/aiDiagnosis");

// Load and parse disease data (seed)
function loadCropsFromFile() {
  const dataPath = path.join(__dirname, "..", "diseaseData.json");
  const raw = fs.readFileSync(dataPath, "utf8");
  const json = JSON.parse(raw);
  const crops = [];

  for (const c of json.crops) {
    const diseaseObjs = c.diseases.map(d => {
      const type = d.type?.toLowerCase();
      if (type === "fungal") return new FungalDisease(d.name, d.symptoms, d.treatment, d.pesticide, d.prevention);
      if (type === "bacterial") return new BacterialDisease(d.name, d.symptoms, d.treatment, d.pesticide, d.prevention);
      if (type === "viral") return new ViralDisease(d.name, d.symptoms, d.treatment, d.pesticide, d.prevention);
      // fallback generic
      return new FungalDisease(d.name, d.symptoms, d.treatment, d.pesticide, d.prevention);
    });

    crops.push(new Crop(c.name, diseaseObjs));
  }
  return crops;
}

// In-memory store
const crops = loadCropsFromFile();

// list crops
function listCrops(req, res) {
  res.json(crops.map(c => c.info()));
}

// Diagnose endpoint
async function diagnose(req, res) {
  const { cropName, symptomText } = req.body;
  if (!cropName || !symptomText) {
    return res.status(400).json({ error: "cropName and symptomText are required" });
  }

  const crop = crops.find(c => c.name.toLowerCase() === cropName.toLowerCase());
  if (!crop) return res.status(404).json({ error: "Crop not found" });

  const matches = crop.diagnose(symptomText);
if (matches.length === 0) {

  try {

    const aiDiagnosis =
      await diagnoseWithAI(
        crop.name,
        symptomText
      );

    return res.json({
      crop: crop.name,
      symptomText,
      source: "AI",
      diagnosis: aiDiagnosis
    });

  } catch (error) {

    console.error(error);

    return res.json({
      crop: crop.name,
      symptomText,
      matches: [],
      message: "No disease matched and AI diagnosis failed."
    });
  }
}

  return res.json({
    crop: crop.name,
    symptomText,
    matches: matches.map(m => m.showInfo())
  });
}

module.exports = {
  listCrops,
  diagnose
};
