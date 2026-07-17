# Deployment Diagnosis — Fig Tree Residences

## Root cause

The Vercel project's **Framework Preset is not locked to Next.js**. When the
first deployment attempt failed with "No Next.js version detected" (because
Root Directory was not yet set to `site`), Vercel's auto-detection had
nothing to detect and the project settled on a generic/static build mode.
Setting Root Directory to `site` afterward fixed the build (Next.js was
found and `next build` ran successfully), but it does **not** retroactively
reset the Framework Preset stored in Project Settings. With the preset stuck
on a static/"Other" mode, Vercel's edge router serves the deployment as a
plain static site and looks for `index.html` in the output directory. A
Next.js App Router build never produces a top-level `index.html` — it
produces a `.next` server build — so the router finds nothing to serve at
`/` (or any other path) and returns Vercel's platform-level `NOT_FOUND`
before the request ever reaches Next.js.

This is a **Vercel project-configuration problem**, not a bug in the
website code, not a routing bug in the app, and not a missing-file problem
on GitHub.

## Evidence

1. **Local build is clean and produces a static home route.**
   `npm run build` inside `site/` (after removing `.next`) succeeds and
   reports:
   ```
   Route (app)                    Size   First Load JS
   ┌ ○ /                        76.2 kB       221 kB
   ...
   ○  (Static)   prerendered as static content
   ```
   `/` is prerendered correctly. There is no code-level reason for a 404.

2. **GitHub has exactly what's local.**
   `git rev-parse HEAD` and `git rev-parse origin/main` are identical
   (`d893e0c4...`) — nothing failed to push, nothing is out of sync.
   `git status` is clean, so nothing in the working tree differs from what's
   committed.

3. **`site/src/app/page.tsx` and `site/src/app/layout.tsx` exist and are
   tracked in git**, along with all 173 files under `site/` (confirmed via
   `git ls-files site`), including `package.json`, `next.config.ts`,
   `tsconfig.json`, and the full `src/app` tree.

4. **GitHub's commit status shows the Vercel deployment for this exact
   commit succeeded** (`state: "success"`, context `Vercel`,
   "Deployment has completed") — so the build Vercel ran was not the
   problem; something after the build (routing/serving) is.

5. **Live response headers from the deployed URL prove the request never
   reached Next.js:**
   ```
   GET https://fig-tree-residences-concept-five.vercel.app/
   HTTP/1.1 404 Not Found
   Content-Type: text/plain; charset=utf-8
   X-Vercel-Error: NOT_FOUND
   ```
   This is Vercel's own plain-text `NOT_FOUND` page (`X-Vercel-Error`
   header), not a Next.js-rendered 404. A real Next.js 404 would come back
   as HTML from the app's runtime with no `X-Vercel-Error` header. This
   response is generated entirely by Vercel's static edge routing, before
   any Next.js function is invoked. `/favicon.ico` returns the identical
   error, confirming the router isn't resolving *any* path — consistent
   with it hunting for a static `index.html` that doesn't exist.

6. **`site/public` contains no `index.html`** (only `images/`, `media/`,
   and the default SVG icons) — confirming there is nothing for a
   static-mode server to find, which is exactly what produces this
   failure pattern.

## Files inspected

- `site/package.json`
- `site/next.config.ts`
- `site/tsconfig.json`
- `site/src/app/page.tsx`
- `site/src/app/layout.tsx`
- `site/src/app/(legacy)/**` (route group — present, not a conflict)
- `site/public/**` (no stray `index.html`)
- `.gitignore` (root) and `site/.gitignore`
- Full `git ls-files` output for `site/` (173 tracked files, matches local
  working tree)
- GitHub commit status/check-runs via `gh api` for the deployed commit
- Live HTTP response headers/body from the deployed URL

## Exact fix

Added `site/vercel.json`:

```json
{
  "framework": "nextjs"
}
```

`vercel.json`'s `framework` key is Vercel's documented, explicit override
for Framework Preset. It is read from the Root Directory (`site`), and
takes precedence over whatever preset is currently stored in the dashboard
— so the next deployment will be built and served as Next.js regardless of
what auto-detection guessed on the first, failed attempt.

**This alone should resolve the 404.** If it does not (e.g. if Project
Settings also has an explicit Output Directory or Build Command override
left over from the failed first attempt), open Vercel → Project → Settings
→ Build & Development Settings and confirm:
- Framework Preset: **Next.js**
- Build Command / Output Directory: **default** (no override)
- Root Directory: **site** (already set)

then trigger a redeploy.

## Classification

- GitHub upload: **not the issue** — repo on GitHub matches local exactly.
- Vercel configuration: **root cause** — stale Framework Preset from the
  pre-Root-Directory-fix failed detection.
- Next.js routing: not the issue — `next build` correctly generates `/`.
- Root Directory: not the issue — already correctly set to `site`.
- Missing files: not the issue — all required files are tracked and pushed.
- next.config configuration: not the issue — `next.config.ts` is minimal
  and has no `output: 'export'`, `basePath`, or other override that would
  cause this.
- Build output: not the issue — build succeeds and Vercel's own commit
  status confirms the deployment completed.
- **Something else: yes — Vercel's edge router is serving the deployment
  in static mode and finding no `index.html`, because the project's
  Framework Preset never got reset to Next.js after the initial
  "No Next.js version detected" failure.**

## What was changed

- Added `site/vercel.json` forcing `"framework": "nextjs"`.
- No website code, design, or content was modified.
