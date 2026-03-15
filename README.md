# Fishpedia 🎣

Fishpedia is an interactive fishing companion app designed to make fishing more engaging and educational for children and families. By scanning and identifying fish, users can build their own digital fish collection while learning fun facts about each species.

The project is built with **Next.js** and integrates a **local machine learning model** to identify fish from images.

---

# 🌊 Product Idea

For many families, it’s always a struggle to prevent children from getting bored while they’re fishing.

**Fishpedia bridges the gap between interest and engagement by letting kids scan and collect fish, build their own collection, and learn fun facts to share with their families.**

Instead of waiting around, kids become active explorers—discovering fish species, collecting them digitally, and sharing what they learn with the people around them.

---

# 🎥 Product Demo

[![Fishpedia Demo](https://img.youtube.com/vi/q7PXBqnkq5w/0.jpg)](https://youtu.be/q7PXBqnkq5w?si=vQ2-haqEbSm5yMlO)

Watch the demo video to see the concept and prototype in action.

---

# 🛠 Tech Stack

- **Next.js** – React framework for the frontend
- **Python** – Runs the local fish identification model
- **PyTorch** – Machine learning framework
- **Transformers (Hugging Face)** – Model integration
- **Pillow** – Image processing
- **Node.js / npm / yarn / pnpm / bun** – Development tooling

---

# 🚀 Getting Started

This project was bootstrapped with **create-next-app**.

## Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## Run the development server

```bash
npm run dev
```

or

```bash
yarn dev
```

or

```bash
pnpm dev
```

or

```bash
bun dev
```

Then open the application in your browser:

```
http://localhost:3000
```

---

# 🐟 Fish Identification (Local ML Setup)

The **Fish for Real** page uses a local Python model to identify fish species from images.

Since the Python virtual environment is **not included in the repository**, each developer must set it up locally.

---

## 1. Create the Python virtual environment

From the project root directory:

```bash
python3 -m venv .venv-fish3d
```

---

## 2. Install dependencies

```bash
.venv-fish3d/bin/pip install torch torchvision transformers pillow
```

---

## 3. Start the application

This project runs on **port 3001**:

```bash
npm run dev -- -H 127.0.0.1 -p 3001
```

---

# ⚙️ Notes

- The machine learning model weights are downloaded automatically on the first run.
- They are stored locally in the Hugging Face cache:

```
~/.cache/huggingface/
```

- The API route expects the Python executable at:

```
.venv-fish3d/bin/python
```

relative to the project root.

---

# 📂 Project Structure

```
public/             # Static assets

src/                # Next.js application source code
 ├── app/           # App router pages and layouts
 ├── components/    # Reusable React components
 └── api/           # API routes

tools/
 └── fish_id/       # Python scripts for fish identification model
```

---

# 👨‍💻 Development Notes

- The app automatically reloads during development.
- Fonts are optimized using **next/font** with the **Geist** font family from Vercel.
- The machine learning model runs locally through Python and is triggered via a Next.js API route.

---

# 🌟 Future Improvements

Potential features for future development:

- Cloud-based fish recognition
- Gamified fish collection system
- Achievements and badges for kids
- Educational quizzes about marine life
- Mobile-friendly version
- Leaderboards for family fishing trips

---

Fishpedia transforms fishing into a fun learning adventure—helping families explore nature together while keeping kids curious and engaged.