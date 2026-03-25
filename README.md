# Fishpedia 🎣

Fishpedia is an interactive fishing companion app designed to make fishing more engaging and educational for children and families. By scanning and identifying fish, users can build their own digital fish collection while learning fun facts about each species.

The project is built with **Next.js** and integrates a **local machine learning model** to identify fish from images.

---

# 🌊 Product Idea

For many families, it’s always a struggle to prevent children from getting bored while they’re fishing.

**Fishpedia bridges the gap between interest and engagement by letting kids scan and collect fish, build their own collection, and learn fun facts to share with their families.**

Instead of waiting around, kids become active explorers discovering fish species, collecting them digitally, and sharing what they learn with the people around them.

---

# 🎥 Product Demo

<p align="center">
  <a href="https://youtu.be/yXsIO4oxhOA?si=3T3GJyYhhHiwmxVB">
    <img src="https://img.youtube.com/vi/yXsIO4oxhOA/maxresdefault.jpg" width="800">
  </a>
</p>

<p align="center">
  ▶ Click the video above to watch the Fishpedia demo
</p>

---

# 🛠 Tech Stack

- **Next.js** – React framework for the frontend
- **Python** – Runs the fish identification model
- **PyTorch** – Machine learning framework
- **Hugging Face Transformers** – Model loading
- **Pillow** – Image processing
- **Node.js** – Development environment

---

# 🚀 Getting Started

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---

Run the development server:

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

---

# 🐟 Fish Identification (Local ML Setup)

The **Fish for Real** page identifies fish using a local Python machine learning model.

Since the Python virtual environment is not committed to the repository, each developer must set it up locally.

---

## 1️⃣ Create Python virtual environment

From the repository root:

```bash
python3 -m venv .venv-fish3d
```

---

## 2️⃣ Install dependencies

```bash
.venv-fish3d/bin/pip install torch torchvision transformers pillow
```

---

## 3️⃣ Run the application

This project runs on **port 3001**:

```bash
npm run dev -- -H 127.0.0.1 -p 3001
```

Then open:

```
http://localhost:3001
```

---

# ⚙️ Notes

Fishpedia uses a **pre-trained fish classification model from Hugging Face**:

https://huggingface.co/beercan/fish-classification

Key details:

- The model is automatically downloaded the first time it runs.
- Model files are cached locally in:

```
~/.cache/huggingface/
```

- The Python inference script is located in:

```
tools/fish_id
```

- The Next.js API route calls the Python environment at:

```
.venv-fish3d/bin/python
```

Make sure the virtual environment exists before running the app.

---

# 📂 Project Structure

```
public/             # Static assets

src/                # Next.js application source code

tools/
 └── fish_id/       # Python fish identification model
```

---

# 👨‍💻 Development Notes

- The app automatically reloads during development.
- Fonts are optimized using **next/font** with the Geist font family.
- Fish recognition runs locally through Python and is triggered through a Next.js API route.

---

# 🌟 Future Improvements

Possible future features:

- Cloud-based fish recognition
- Gamified fish collection system
- Achievements and badges for kids
- Educational quizzes about marine life
- Offline-friendly mobile version
- Family fishing leaderboards

---

Fishpedia transforms fishing into a fun learning adventure helping families explore nature together while keeping kids curious and engaged.