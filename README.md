# 🌱 AgriHeal – AI-Powered Crop Disease Diagnosis System

AgriHeal is a web-based crop disease diagnosis system that helps users identify possible crop diseases based on the **selected crop and observed symptoms**.

The system uses a **rule-based OOP diagnosis engine** with a structured disease dataset. When no matching disease is found in the dataset, **Groq API** is used as an AI fallback to provide a possible diagnosis along with treatment, pesticide, and prevention recommendations.

## 🚀 Live Demo

🔗 **[AgriHeal – Live Application](https://agriheal1.onrender.com)**

## 📂 GitHub Repository

🔗 **[GitHub Repository](https://github.com/AkashChaudhary180/Agriheal1)**

---

## ✨ Features

* 🌾 Select from multiple crops
* 🔍 Diagnose diseases using symptom descriptions
* 🧠 OOP-based disease diagnosis engine
* 📚 Structured agricultural disease dataset
* 🦠 Supports Fungal, Bacterial, and Viral diseases
* 🤖 Groq LLM fallback for previously unmatched symptoms
* 💊 Provides treatment and pesticide information
* 🛡️ Provides disease prevention recommendations
* 📄 Clean and user-friendly web interface
* ⚡ Fast rule-based diagnosis
* ☁️ Deployed on Render

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │ Crop + Symptoms     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Frontend        │
                    │ HTML / CSS / JS     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Server    │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Diagnosis Controller│
                    └──────────┬──────────┘
                               │
                               ▼
                 ┌────────────────────────────┐
                 │   OOP Diagnosis Engine     │
                 │                            │
                 │ Crop → Disease → Matching  │
                 └────────────┬───────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                 Match               No Match
                    │                   │
                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐
            │ JSON Dataset │    │  Groq API    │
            │ Diagnosis    │    │ AI Fallback  │
            └──────┬───────┘    └──────┬───────┘
                   │                   │
                   └─────────┬─────────┘
                             ▼
                    ┌─────────────────┐
                    │ Diagnosis Result│
                    └─────────────────┘
```

---

## 🧠 How It Works

AgriHeal follows a **two-level diagnosis approach**.

### 1. Rule-Based Diagnosis

First, the system checks the user's symptoms against the structured disease dataset.

The user provides:

* Crop name
* Observed symptoms

The backend finds the corresponding `Crop` object and calls its `diagnose()` method.

Each disease contains predefined symptom keywords. The system performs case-insensitive keyword matching to find possible diseases.

Example:

```text
Crop: Wheat

Symptoms:
orange powdery bumps on leaves
```

The system can match:

```text
Rust (Fungal)
```

and return its:

* Symptoms
* Treatment
* Pesticide
* Prevention

### 2. Groq AI Fallback

If no disease matches the provided symptoms in the dataset, AgriHeal sends the query to the **Groq API**.

The AI generates a possible diagnosis in the same structured format as the database response.

This allows the system to handle symptoms that are not explicitly present in the predefined dataset.

---

## 🧩 Object-Oriented Design

The backend uses object-oriented programming to model crops and diseases.

### Disease

`Disease` is the base class containing common disease properties and methods.

```text
Disease
├── FungalDisease
├── BacterialDisease
└── ViralDisease
```

### Crop

The `Crop` class contains:

* Crop name
* Diseases associated with the crop
* Diagnosis functionality

The `diagnose()` method checks the user's symptoms against all diseases associated with that crop.

### Why OOP?

OOP makes the diagnosis engine:

* Modular
* Reusable
* Easier to maintain
* Easier to extend with new disease types
* Better organized around real-world entities

---

## 📁 Project Structure

```text
AgriHeal/
│
├── backend/
│   ├── models/
│   │   ├── Disease.js
│   │   ├── FungalDisease.js
│   │   ├── BacterialDisease.js
│   │   ├── ViralDisease.js
│   │   └── Crop.js
│   │
│   ├── controllers/
│   │   └── diseaseController.js
│   │
│   ├── routes/
│   │   └── diseaseRoutes.js
│   │
│   ├── services/
│   │   └── aiDiagnosis.js
│   │
│   ├── data/
│   │   └── diseaseData.json
│   │
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── package.json
├── package-lock.json
└── README.md
```

> The exact folder structure may vary slightly depending on the current repository version.

---

## 🛠️ Tech Stack

| Technology | Purpose                   |
| ---------- | ------------------------- |
| HTML       | Frontend structure        |
| CSS        | Styling and responsive UI |
| JavaScript | Frontend functionality    |
| Node.js    | Backend runtime           |
| Express.js | REST API and server       |
| OOP        | Diagnosis engine          |
| JSON       | Disease dataset           |
| Groq API   | AI fallback diagnosis     |
| Render     | Deployment                |

---

## 🔌 API

### Get Available Crops

```http
GET /api/crops
```

Returns the list of crops supported by the application.

### Diagnose Disease

```http
POST /api/diagnose
```

Request body:

```json
{
  "cropName": "Wheat",
  "symptomText": "orange powdery bumps on leaves"
}
```

For a database match, the API returns structured disease information.

For an unmatched query, the response uses:

```json
{
  "crop": "Wheat",
  "symptomText": "blackness in seeds",
  "source": "AI",
  "diagnosis": "..."
}
```

---

## 🤖 AI Fallback

Groq is intentionally used **only when the rule-based diagnosis does not find a match**.

This design provides two advantages:

1. Known diseases are handled deterministically using the structured dataset.
2. AI can handle symptoms that are not explicitly covered by the dataset.

The Groq API key is stored as an environment variable:

```env
GROQ_API_KEY=your_api_key
```

The API key is **not hardcoded** in the source code.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AkashChaudhary180/Agriheal1.git
cd Agriheal1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

### 4. Start the Server

```bash
node backend/server.js
```

The application can then be accessed locally through the server's configured port.

---

## 🔄 Diagnosis Flow

```text
User enters crop + symptoms
            ↓
       Express API
            ↓
    Validate user input
            ↓
       Find Crop object
            ↓
     Crop.diagnose()
            ↓
   Check disease keywords
            ↓
      ┌─────┴─────┐
      │           │
    Match      No Match
      │           │
      ↓           ↓
 JSON Dataset   Groq API
      │           │
      └─────┬─────┘
            ↓
      Diagnosis Result
            ↓
         Frontend
```

---

## 📊 Example Output

For a known symptom:

```text
Rust (Fungal)

Symptoms keywords:
orange powdery bumps, rust-colored spots, orange pustules

Treatment:
Apply protective fungicides like Mancozeb.
Remove heavily infected plant parts.

Pesticide:
Mancozeb 75 WP / Tilt 250 EC

Prevention:
Use resistant varieties, crop rotation,
and timely fungicide sprays.
```

For an unknown symptom, the system uses the Groq AI fallback and returns the diagnosis in the same structured format.

---

## 🔐 Error Handling

The application handles cases such as:

* Missing crop name
* Missing symptom description
* Invalid crop selection
* No database match
* Groq API failure
* Empty AI response

If the AI service is unavailable, the application returns an appropriate error instead of silently failing.

---

## 🌐 Deployment

The application is deployed on **Render**.

The backend communicates with the frontend through REST APIs, while the Groq API key is configured securely using Render environment variables.

---

## 🚧 Future Improvements

Possible improvements include:

* 🌱 Adding more crops and diseases
* 🧠 Semantic symptom matching using embeddings
* 📷 Image-based disease detection
* 🗄️ Moving the dataset from JSON to a database
* 👤 User authentication
* 📊 Diagnosis history
* 📱 Mobile-friendly/PWA version
* 🌍 Support for regional languages
* 📈 Analytics and monitoring

---

## 👨‍💻 Author

**Akash Chaudhary**

B.Tech – Information Technology
Indian Institute of Information Technology, Una

### Connect

* GitHub: [AkashChaudhary180](https://github.com/AkashChaudhary180)
* Project: [AgriHeal](https://github.com/AkashChaudhary180/Agriheal1)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
