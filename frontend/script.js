// frontend/script.js
const API_BASE = "/api";


document.addEventListener("DOMContentLoaded", () => {
  const cropSelect = document.getElementById("cropSelect");
  const symptomInput = document.getElementById("symptomInput");
  const diagnoseBtn = document.getElementById("diagnoseBtn");
  const clearBtn = document.getElementById("clearBtn");
  const resultSection = document.getElementById("resultSection");
  const resultArea = document.getElementById("resultArea");
  const downloadBtn = document.getElementById("downloadBtn");

  // load crops
  fetch(`${API_BASE}/crops`).then(r => r.json()).then(list => {
    cropSelect.innerHTML = "";
    for (const c of list) {
      const opt = document.createElement("option");
      opt.value = c.name;
      opt.textContent = `${c.name}`;
      cropSelect.appendChild(opt);
    }
  }).catch(err => {
    cropSelect.innerHTML = "<option>Error loading</option>";
    console.error(err);
  });

  diagnoseBtn.addEventListener("click", () => {
    const cropName = cropSelect.value;
    const symptomText = symptomInput.value.trim();
    if (!symptomText) {
      alert("Please describe symptoms (few keywords).");
      return;
    }
    resultArea.innerHTML = "Diagnosing...";
    resultSection.classList.remove("hidden");

    fetch(`${API_BASE}/diagnose`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ cropName, symptomText })
    }).then(r => r.json()).then(data => {
      renderResult(data);
    }).catch(err => {
      resultArea.innerHTML = `<div class="result-card">Error contacting server.</div>`;
      console.error(err);
    });
  });

  clearBtn.addEventListener("click", () => {
    symptomInput.value = "";
    resultSection.classList.add("hidden");
    resultArea.innerHTML = "";
  });

  downloadBtn.addEventListener("click", () => {
    const text = resultArea.innerText || resultArea.textContent;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");
    a.download = `agriheal-report-${date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // function renderResult(data) {
  //   resultArea.innerHTML = "";
  //   if (!data.matches || data.matches.length === 0) {
  //     const noMatch = document.createElement("div");
  //     noMatch.className = "result-card";
  //     noMatch.innerHTML = `<strong>No exact disease match found.</strong><div class="result-meta">Try adding more symptom keywords (colors, spots, lesion shape, insects present).</div>`;
  //     resultArea.appendChild(noMatch);
  //     return;
  //   }

  //   for (const m of data.matches) {
  //     const card = document.createElement("div");
  //     card.className = "result-card";
  //     card.innerHTML = `
  //       <h4>${m.name} <small style="color:#666">(${m.type})</small></h4>
  //       <div><strong>Symptoms keywords:</strong> ${m.symptoms.join(", ")}</div>
  //       <div style="margin-top:8px;"><strong>Treatment:</strong> ${m.treatment}</div>
  //       <div style="margin-top:6px;"><strong>Pesticide:</strong> ${m.pesticide}</div>
  //       <div style="margin-top:6px;"><strong>Prevention:</strong> ${m.prevention || "—"}</div>
  //     `;
  //     resultArea.appendChild(card);
  //   }
  // }

  function renderResult(data) {

  console.log("API RESPONSE:", data);

  resultArea.innerHTML = "";

  // AI response
  if (data.source === "AI") {

    const card = document.createElement("div");

    card.className = "result-card";

    card.innerHTML = `
      <h3>🤖 AI Diagnosis</h3>
      <pre style="white-space: pre-wrap;">${data.diagnosis}</pre>
    `;

    resultArea.appendChild(card);

    return;
  }

  // No match found
  if (!data.matches || data.matches.length === 0) {

    const noMatch = document.createElement("div");

    noMatch.className = "result-card";

    noMatch.innerHTML = `
      <strong>No exact disease match found.</strong>
      <div class="result-meta">
        Try adding more symptom keywords
        (colors, spots, lesion shape, insects present).
      </div>
    `;

    resultArea.appendChild(noMatch);

    return;
  }

  // Database matches
  for (const m of data.matches) {

    const card = document.createElement("div");

    card.className = "result-card";

    card.innerHTML = `
      <h4>${m.name}
        <small style="color:#666">
          (${m.type})
        </small>
      </h4>

      <div>
        <strong>Symptoms keywords:</strong>
        ${m.symptoms.join(", ")}
      </div>

      <div style="margin-top:8px;">
        <strong>Treatment:</strong>
        ${m.treatment}
      </div>

      <div style="margin-top:6px;">
        <strong>Pesticide:</strong>
        ${m.pesticide}
      </div>

      <div style="margin-top:6px;">
        <strong>Prevention:</strong>
        ${m.prevention || "—"}
      </div>
    `;

    resultArea.appendChild(card);
  }
}
});
