import fetch from 'node-fetch';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resumes = [
  {
    name: 'ml-resume',
    url: 'https://docs.google.com/document/d/e/2PACX-1vTmosm43DZiueBHteGys9ezWTC_2uPRj38pqYMmRkmqHUqg5WByOkz7lBzBkbiMaeGB4wI6mk8zEaqL/pub',
    title: 'Cameron Craddock - Machine Learning Engineer Resume'
  },
  {
    name: 'neuroscience-resume',
    url: 'https://docs.google.com/document/d/e/2PACX-1vT_kwmzqVIwEuTG-wNORelALvmdSuuCeacqT8soIsRgI5EHh4sKFXAHQOgwEvaGsG_DdP0y27WD6KOa/pub',
    title: 'Cameron Craddock - Computational Neuropsychiatry Researcher Resume'
  }
];

async function downloadResumes() {
  const outputDir = join(__dirname, '../public/resumes');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const resume of resumes) {
    try {
      console.log(`Downloading ${resume.name}...`);
      const response = await fetch(resume.url);
      const html = await response.text();

      const resumeData = {
        name: resume.title,
        content: html
      };

      const outputPath = join(outputDir, `${resume.name}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(resumeData, null, 2));
      console.log(`✓ Saved to ${outputPath}`);
    } catch (error) {
      console.error(`✗ Error downloading ${resume.name}:`, error.message);
    }
  }
}

downloadResumes();
