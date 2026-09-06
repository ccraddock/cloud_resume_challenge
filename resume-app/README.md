# Cameron Craddock Resume Viewer

A responsive React/Vite résumé site for Cameron Craddock. The site renders versioned résumé data from local JSON files and provides a direct link to the corresponding PDF when available.

## Development

Requires Node.js 18 or newer.

```bash
cd resume-app
npm install
npm run dev
```

The development server binds to `127.0.0.1:3000` by default.

## Production build

```bash
npm run build
```

Vite writes the production site to `resume-app/dist/`.

From the repository root, `make deploy` builds the React app and syncs `resume-app/dist/` to the private S3 origin used by CloudFront.

## Security notes

- The site does not render raw HTML or use `dangerouslySetInnerHTML`.
- External résumé links are restricted to HTTP/HTTPS URLs and open with `noopener noreferrer`.
- PDF paths are restricted to local files under `/resumes/`.
- The Vite development server is bound to localhost with strict filesystem access.
- The S3 bucket is private and CloudFront is limited to read-only HTTP methods.
- Runtime dependencies are intentionally minimal: React and React DOM only.

## Main structure

```text
resume-app/
├── public/resumes/       # résumé JSON and PDFs
├── scripts/              # optional résumé parsing utility
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── ResumeViewer.jsx
│   ├── App.jsx
│   └── index.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Résumé variants

The selector currently exposes:

- Machine Learning Engineer — 2026
- Machine Learning Engineer — 2025
- Biomedical Imaging AI Researcher
