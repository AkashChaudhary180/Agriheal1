// backend/models/Crop.js
class Crop {
  constructor(name, diseases = []) {
    this.name = name;
    this.diseases = diseases; // array of Disease instances
  }

  // Diagnose - returns array of matching diseases (could be multiple)
  diagnose(symptomText) {
    if (!symptomText) return [];
    const matches = [];
    for (const d of this.diseases) {
      if (d.matches(symptomText)) matches.push(d);
    }
    return matches;
  }

  // pretty info
  info() {
    return {
      name: this.name,
      diseaseCount: this.diseases.length
    };
  }
}

module.exports = Crop;
