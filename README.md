# FreeGrab Docs

Living documentation site for the **FreeGrab** XR interaction technique — design axioms, architecture, application examples (with video), the design-space exploration, and a session-by-session changelog.

Built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/), deployed to GitHub Pages. Content is plain Markdown/MDX so it can be authored and versioned alongside agentic coding sessions on the main FreeGrab Unity project (which lives in the sibling `FreeGrab/` repo and is kept separate from this public site).

---

## Status

🚧 Scaffolding in progress. Initial content is staged in [`_content/`](_content/) and will be moved into `src/content/docs/` once the Astro Starlight project is generated.

---

## One-time setup (Windows)

Run in PowerShell, then **close and reopen the terminal** so the tools land on PATH:

```powershell
winget install OpenJS.NodeJS.LTS      # Node.js — builds the site
winget install GitHub.cli             # gh — GitHub auth + repo creation
```

Authenticate GitHub (interactive, run yourself):

```powershell
gh auth login                         # choose: GitHub.com → HTTPS → login with browser
```

## Scaffold the site (done by the agent once Node is present)

```powershell
# from the freegrab-docs/ folder
npm create astro@latest -- --template starlight --no-install --typescript strict .
npm install
npm install astro-mermaid mermaid     # client-side Mermaid diagram rendering
npm run dev                           # local preview at http://localhost:4321
```

## Build & deploy

Pushing to `main` triggers the GitHub Action (`.github/workflows/deploy.yml`), which builds the site and publishes it to GitHub Pages. Live URL after the first deploy:

```
https://<your-github-username>.github.io/freegrab-docs/
```

Local production build check:

```powershell
npm run build && npm run preview
```

---

## Repository layout (target)

```
freegrab-docs/
├── astro.config.mjs            # site URL, base path, Starlight + Mermaid integrations
├── src/content/docs/
│   ├── index.mdx               # Home — design axioms (the landing page)
│   ├── architecture/           # technique model, contracts, diagrams
│   ├── application-examples.mdx # video gallery of demonstrators
│   ├── design-space.md         # D1–D8 axes, C1–C4 contexts
│   └── changelog.md            # session-by-session log
├── public/videos/              # committed demonstrator clips (small, compressed)
└── .github/workflows/deploy.yml
```

## Conventions

- **One page per concern.** Axioms on the home page; architecture, examples, design-space, and changelog each get their own section.
- **Changelog is curated, not raw git.** Each working session appends a dated entry (What / Why / Next). It is the human-readable memory of the project's evolution; the git history is the precise record beneath it.
- **Videos** live in `public/videos/`, compressed to a few MB each. If the collection grows large, migrate to git-LFS.
- **Mermaid** diagrams are written as ` ```mermaid ` fenced blocks and render client-side.
