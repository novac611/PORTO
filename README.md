# Abdulrahman M.A — Portfolio

A personal portfolio website built with **React**, **TypeScript**, and **Vite**.  
Frontend-only, no backend — deploys directly to **GitHub Pages**.

---

## 🚀 Getting Started

```bash
npm install
npm run dev       # → http://localhost:5173
```

---

## 🏗️ Project Structure

```
PORTO/
├── src/
│   ├── pages/          # HomePage (single page)
│   ├── components/     # Reusable UI (shadcn/ui)
│   ├── context/        # SiteConfigContext
│   ├── config/
│   │   ├── siteConfig.ts   # All personal info, services, stats
│   │   └── social.json     # Social media links (add/edit/remove here)
│   ├── hooks/
│   │   └── useProjects.ts  # Reads projects from src/prs/ at build time
│   └── prs/            # Project folders (one folder = one project)
│       ├── act.json        # true/false — show or hide projects section
│       └── <ProjectName>/
│           ├── info.json   # Project title, description, tags, URLs
│           └── cover.*     # Project cover image (jpg/png/webp)
├── public/             # Static assets (logo, hero image, avatar)
└── index.html
```

---

## ✏️ How to Edit Content

### Personal Info, Services, Stats
Edit [`src/config/siteConfig.ts`](src/config/siteConfig.ts) — `defaultSiteConfig` object.

### Social Links
Edit [`src/config/social.json`](src/config/social.json).  
Each entry: `{ "label": "GitHub", "url": "https://...", "icon": "Github" }`  
Available icons: `Github`, `Linkedin`, `Twitter`, `Send`, `Instagram`, `Youtube`, `Facebook`, `Globe`, `Twitch`

### Projects
1. Create a folder inside `src/prs/<Project-Name>/`
2. Add `info.json` and a cover image — rebuild to see the project appear
3. To hide the whole section set `src/prs/act.json` → `{ "visible": false }`

**`info.json` format:**
```json
{
  "title": "My Project",
  "description": "What it does...",
  "tags": ["React", "Python"],
  "liveUrl": "https://...",
  "repoUrl": "https://..."
}
```

---

## ⚙️ Tech Stack

| Layer    | Technology                 |
|----------|----------------------------|
| Frontend | React 19, TypeScript, Vite |
| Styling  | Tailwind CSS, shadcn/ui    |
| Hosting  | GitHub Pages               |

---

## 📦 Build & Deploy

```bash
npm run build     # Output → dist/
```

Push `dist/` to the `gh-pages` branch, or use the GitHub Actions workflow.
