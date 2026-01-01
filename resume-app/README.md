# Cameron Craddock Resume Viewer

A modern React.js web application that fetches and displays a resume from a published Google Doc with a fresh, responsive design.

## Features

- ✅ Fetches resume content from Google Docs
- ✅ Modern, responsive dark theme layout
- ✅ Sidebar with quick info, tech skills, and education
- ✅ Sanitized HTML rendering (security)
- ✅ Loading and error states
- ✅ Unit tests with full coverage
- ✅ Mobile-friendly design

## Installation

```bash
cd /home/ccraddock/experiments/cloud_resume_challenge/resume-app
npm install
```

## Running the App

```bash
npm start
```

The app will open at `http://localhost:3000` in your default browser.

## Running Tests

```bash
npm test
```

All unit tests will run in watch mode. Press `q` to quit.

## Building for Production

```bash
npm build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
resume-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Header.test.js
│   │   ├── Sidebar.js
│   │   ├── Sidebar.css
│   │   ├── Sidebar.test.js
│   │   ├── ResumeViewer.js
│   │   ├── ResumeViewer.css
│   │   └── ResumeViewer.test.js
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── index.css
│   └── setupTests.js
├── package.json
└── README.md
```

## Technologies

- React 18.2.0
- DOMPurify (HTML sanitization)
- CSS3 (Grid, Flexbox, Gradients)
- React Testing Library
- Jest

## Features Breakdown

### ResumeViewer Component
- Fetches resume from published Google Doc URL
- Sanitizes HTML for security
- Shows loading state while fetching
- Displays error messages if fetch fails
- Responsive typography and spacing

### Header Component
- Displays name and professional subtitle
- Quick navigation links (Email, LinkedIn, GitHub)
- Sticky position with glassmorphism styling

### Sidebar Component
- Quick contact info
- Tech skills with hover effects
- Education timeline
- Sticky positioning on desktop

## Known Limitations

If your Google Doc is behind CORS restrictions, you may need to use a proxy service. The app will show an error message in that case.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)