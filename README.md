# Sairam Raavi — Portfolio

A static, GitHub Pages-ready portfolio for Sairam Raavi, a Senior Full-Stack Engineer expanding into cloud, DevOps and platform engineering.

## Technology

Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, static Markdown drafts, ESLint, Prettier and GitHub Actions.

## Local development

```bash
git clone https://github.com/sairamraavi/sairamraavi.github.io.git
cd sairamraavi.github.io
npm install
npm run dev
```

Production verification:

```bash
npm run lint
npm run type-check
npm run build
```

The static export is generated in `out/`.

## Editing content

- Profile: `src/data/profile.ts`
- Experience: `src/data/experience.ts` (dates are intentionally editable placeholders)
- Skills: `src/data/skills.ts`
- Projects: `src/data/projects.ts`
- Blog metadata: `src/data/blog.ts`; draft Markdown sources: `src/content/blog/`
- Profile image: replace `public/images/sairam-profile.jpeg`
- Résumé: replace `public/resume/sairam-raavi-resume.pdf`

Draft blog entries remain “Coming soon” previews. Do not add a draft URL to the sitemap until it is published.

## GitHub Pages

1. Open the repository and choose **Settings → Pages**.
2. Set **Build and deployment** source to **GitHub Actions**.
3. Push to `master` and confirm the deployment workflow in the Actions tab.
4. Open `https://sairamraavi.github.io`.

For a failed deployment, open the failed Actions run and inspect the failing lint, type-check or build step. The workflow uploads `./out` only after all checks pass.

## Custom-domain preparation

No custom domain is configured. When one is added, update the metadata base URL, canonical URL, sitemap URLs, robots sitemap URL and Open Graph URLs, then add the CNAME through GitHub Pages.

## Notes

The project uses `output: "export"`, unoptimized images and trailing slashes, so it requires no server runtime. It includes semantic headings, a skip link, responsive layouts and reduced-motion support. No analytics are enabled; a static-compatible integration can be added later if desired.
