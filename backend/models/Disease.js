// backend/models/Disease.js
class Disease {
  constructor(name, symptoms = [], treatment = "", pesticide = "", prevention = "") {
    this.name = name;
    this.symptoms = symptoms; // array of symptom keywords/phrases
    this.treatment = treatment;
    this.pesticide = pesticide;
    this.prevention = prevention;
    this.type = "Generic";
  }

  // return true if any symptom keyword matches the input text
  matches(inputText) {
    if (!inputText) return false;
    const text = inputText.toLowerCase();
    return this.symptoms.some(sym =>
      text.includes(sym.toLowerCase())
    );
  }

  showInfo() {
    return {
      name: this.name,
      type: this.type,
      symptoms: this.symptoms,
      treatment: this.treatment,
      pesticide: this.pesticide,
      prevention: this.prevention
    };
  }
}

class FungalDisease extends Disease {
  constructor(name, symptoms, treatment, pesticide, prevention = "") {
    super(name, symptoms, treatment, pesticide, prevention);
    this.type = "Fungal";
  }
}

class BacterialDisease extends Disease {
  constructor(name, symptoms, treatment, pesticide, prevention = "") {
    super(name, symptoms, treatment, pesticide, prevention);
    this.type = "Bacterial";
  }
}

class ViralDisease extends Disease {
  constructor(name, symptoms, treatment, pesticide = "None (viral)", prevention = "") {
    super(name, symptoms, treatment, pesticide, prevention);
    this.type = "Viral";
  }
}

module.exports = {
  Disease,
  FungalDisease,
  BacterialDisease,
  ViralDisease
};
