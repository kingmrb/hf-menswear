# HF Men's Wear — Deploy to Railway

This folder is a complete, ready-to-deploy website. It serves static files
(`index.html`, `rentals.html`, and the `images/` folder) with a tiny
zero-dependency Node server (`server.js`). No database, no build step.

---

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `rentals.html` | Rentals page (Western + Formal Wear catalogs) |
| `images/` | All photos |
| `server.js` | Tiny static web server (Node built-ins only) |
| `package.json` | Tells Railway how to start the site (`npm start`) |
| `railway.json` | Railway build/deploy settings |
| `.gitignore` | Keeps `node_modules` out of git |

> Do **not** upload a `node_modules` folder — there isn't one, and none is needed.

---

## Option A — Deploy from GitHub (recommended, easiest to update later)

1. Create a free account at **https://github.com** if you don't have one.
2. Create a new repository (e.g. `hf-menswear`). Keep it empty (no README).
3. On the repo page, click **Add file → Upload files**, then drag in
   **everything in this folder** (`index.html`, `rentals.html`, the `images`
   folder, `server.js`, `package.json`, `railway.json`, `.gitignore`).
   Commit the upload.
4. Go to **https://railway.com** and sign in (you can sign in with GitHub).
5. Click **New Project → Deploy from GitHub repo → select `hf-menswear`.**
6. Railway detects Node automatically and runs `npm start`. Wait for the build
   to finish (about a minute).
7. Open **Settings → Networking → Generate Domain.** Railway gives you a public
   URL like `hf-menswear-production.up.railway.app`. That's your live site.

**To update the site later:** upload new files to the GitHub repo — Railway
redeploys automatically.

---

## Option B — Deploy with the Railway CLI (no GitHub needed)

1. Install Node.js (https://nodejs.org) if needed, then install the CLI:
   ```
   npm install -g @railway/cli
   ```
2. Open a terminal **in this folder** and run:
   ```
   railway login
   railway init          # create a new project when prompted
   railway up            # uploads and deploys this folder
   railway domain        # generates a public URL
   ```
3. The URL printed by `railway domain` is your live site.

**To update later:** run `railway up` again from this folder.

---

## Using your own domain (hfmenswear.com)

1. In Railway: **Settings → Networking → Custom Domain**, enter
   `hfmenswear.com` (or `www.hfmenswear.com`).
2. Railway shows a **CNAME** target. Add that record at whoever manages the
   domain's DNS (the domain registrar). DNS can take a little while to take
   effect.

---

## Notes

- **PORT is automatic.** Railway sets it; `server.js` reads `process.env.PORT`.
  You do not need to set any environment variables.
- **Cost.** Railway pricing is usage-based. A small static site like this uses
  very little, but it is not unlimited-free like some static hosts — check
  Railway's current plans. Fully static alternatives (Netlify, Cloudflare
  Pages, Vercel, GitHub Pages) can host this same folder for free if you'd
  rather. The site itself works the same on any of them.
- **Clean URLs work:** both `/rentals` and `/rentals.html` load the rentals
  page.
