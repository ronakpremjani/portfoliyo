# Portfolio CMS

A **high‑performance, visually stunning** portfolio website built with a modern **React + Vite** stack, **TailwindCSS**, and a **Node/Express** backend powered by **MongoDB** and **Mongoose**. It showcases a premium UI/UX design with glass‑morphism, dynamic 3D animations, and smooth scroll physics powered by **Framer Motion**.

---

## ✨ Demo

Live demo: **[https://your-portfolio-demo.com](https://your-portfolio-demo.com)** *(replace with actual URL)*

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, @react‑three/fiber, @react‑three/drei
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Build & Tooling**: Vite, ES modules, async/await, ESLint, Prettier
- **Design**: Glassmorphism, neon accents, custom back‑button component, premium typography (Google Fonts – Inter, Outfit)
- **Deployment**: Vercel / Netlify (frontend) + Railway / Render (backend) – configurable via environment variables.

---

## 🌟 Features

- **Dynamic Project Grid** – Shows real projects fetched from a mock data source; each card displays an OpenGraph image pulled directly from the GitHub repo.
- **Featured Work Carousel** – Infinite scroll carousel with 3‑D card flip and hover effects.
- **Journey Page** – Immersive 3‑D scrolling narrative powered by `Framer Motion` spring physics and a star‑field background.
- **Consistent Back‑Button** – Pill‑shaped back navigation appears on every page with identical styling and positioning.
- **Contact Curtain Effect** – Smooth “peeling” curtain animation that reveals a premium contact footer.
- **Responsive & Accessible** – Fully responsive layout, keyboard‑navigable components, focus‑visible outlines, and proper ARIA attributes.
- **SEO Optimized** – Semantic HTML, unique `<title>` tags, meta descriptions, proper heading hierarchy, and fast load performance.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (>= 20) and **npm** (>= 10)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/ronakpremjani/portfoliyo.git
cd portfoliyo

# Install dependencies for both client and server
npm install               # installs for the root (client) workspace
cd server && npm install   # optional – install server deps if you plan to run the API locally
```

### Running the Development Server

```bash
# Client (frontend)
npm run dev   # Vite dev server – http://localhost:5173

# Server (backend) – in a separate terminal
cd server && npm run dev   # Express API – http://localhost:5000
```

The client automatically proxies API calls to the backend (see `vite.config.ts`).

### Building for Production

```bash
npm run build   # creates an optimized static bundle in /dist
```

Deploy the `dist` folder to any static‑host (Vercel, Netlify, Cloudflare Pages, etc.).

---

## 📁 Project Structure

```
portfoliyo/
├─ client/                # React + Vite application
│   ├─ src/
│   │   ├─ pages/          # Page components (Home, Work, Journey, Expertise)
│   │   ├─ features/       # Feature‑based modules (contact, work, expertise)
│   │   ├─ components/     # Shared UI components (BackButton, MagneticButton)
│   │   └─ hooks/          # Custom React hooks (useTextReveal, etc.)
│   └─ vite.config.ts
├─ server/                # Express API (optional for CMS data)
│   ├─ src/
│   │   ├─ models/        # Mongoose schemas (Project, User, etc.)
│   │   ├─ controllers/   # Thin async/await controllers
│   │   ├─ services/       # Business logic
│   │   └─ routes/         # Feature‑based routes
│   └─ index.js
├─ .gitignore
├─ package.json           # Workspace root (client scripts)
└─ README.md              # <‑‑ THIS FILE
```

---

## 🤝 Contributing

Contributions are welcome! Please follow the repository’s **feature‑based architecture** and **coding rules**:

1. Fork the repo and create a new branch.
2. Keep controllers thin, move business logic to services.
3. Use **async/await** only – no callbacks.
4. Validate all inputs (e.g., using `zod` or Joi).
5. Write reusable, ES‑module code.
6. Run the test suite (`npm test`) before opening a PR.

---

## 📜 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 🙏 Acknowledgements

- **Framer Motion** – for buttery‑smooth scroll physics.
- **Three.js** – for the starfield background.
- **Tailwind CSS** – for rapid, utility‑first styling.
- **Vite** – for instant hot‑module reloading.

---

*Built with love by **Ronak Premjani** – feel free to explore, remix, and adapt!*
