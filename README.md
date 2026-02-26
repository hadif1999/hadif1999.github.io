# Hadi Portfolio Website

Personal portfolio website for `hadif1999.github.io` built with React.

## Prerequisites

- Node.js `20+`
- npm

## Run Locally

1. Install dependencies:
```bash
npm ci
```

2. Configure environment variables:
```bash
nano .env
```

3. Update `.env` (minimum):
```env
GITHUB_USERNAME=hadif1999
USE_GITHUB_DATA=true
```

4. Start development server:
```bash
npm start
```

5. Open:
- `http://localhost:3000`

If port `3000` is busy, run:
```bash
PORT=3001 npm start
```

## Build

```bash
npm run build
```

## Content Updates

- Main portfolio content: `src/portfolio.js`
- Resume file: `src/assets/docs/resume.pdf`

To replace resume in future, overwrite `src/assets/docs/resume.pdf` with your new file.

## GitHub Repos Section

- Open Source Projects uses pinned repos from your GitHub account.
- If `REACT_APP_GITHUB_TOKEN` is set, pinned repos are fetched via GitHub GraphQL.
- Without token, pinned repos are fetched via public profile fallback.
- Repos are sorted by creation date (newest first).

## Deploy Workflow

- Workflow file: `.github/workflows/deploy.yml`
- Auto-runs on push to `hadi`
- Auto-runs on push to `master`
- Deploys `build/` output to `master` branch.
