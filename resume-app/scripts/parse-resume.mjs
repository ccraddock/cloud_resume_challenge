import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumes = [
  {
    name: 'ml-resume',
    url: 'https://docs.google.com/document/d/e/2PACX-1vTmosm43DZiueBHteGys9ezWTC_2uPRj38pqYMmRkmqHUqg5WByOkz7lBzBkbiMaeGB4wI6mk8zEaqL/pub',
    title: 'Machine Learning Engineer'
  },
  {
    name: 'neuroscience-resume',
    url: 'https://docs.google.com/document/d/e/2PACX-1vT_kwmzqVIwEuTG-wNORelALvmdSuuCeacqT8soIsRgI5EHh4sKFXAHQOgwEvaGsG_DdP0y27WD6KOa/pub',
    title: 'Computational Neuropsychiatry Researcher'
  }
];

// replace cheerio-based parser with a small safe parser that strips scripts/styles
function stripScriptsAndStyles(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, ''); // remove comments
}

function innerTextFrom(html, startIndex, tagName) {
  const open = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, 'i');
  const close = new RegExp(`</${tagName}>`, 'i');
  let depth = 0;
  let idx = startIndex;
  let text = '';
  const tagRe = /<\/?([a-z0-9]+)(?:\s[^>]*)?>/gi;
  tagRe.lastIndex = startIndex;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const segment = html.slice(idx, m.index);
    text += segment;
    const matchedTag = m[1].toLowerCase();
    const isClose = m[0].startsWith('</');
    if (matchedTag === tagName) {
      if (!isClose) depth++;
      else {
        depth--;
        if (depth < 0) break;
      }
    }
    idx = tagRe.lastIndex;
    if (depth < 0) break;
  }
  // grab any trailing text until the first closing tag if nothing matched
  if (text === '' && idx < html.length) {
    const nextClose = html.indexOf(`</${tagName}>`, startIndex);
    if (nextClose !== -1) {
      text = html.slice(startIndex, nextClose);
    }
  }
  return text.replace(/\s+/g, ' ').trim();
}

function parseContent(html) {
  html = stripScriptsAndStyles(html);

  // Find the contents container if present
  const contentsMatch = html.match(/<div[^>]*id=["']contents["'][^>]*>/i);
  const start = contentsMatch ? contentsMatch.index + contentsMatch[0].length : 0;
  const slice = html.slice(start);

  // Tokenize tags and text
  const tagRe = /<\/?([a-z0-9]+)(?:\s[^>]*)?>/gi;
  let lastIndex = 0;
  const tokens = [];
  let m;
  while ((m = tagRe.exec(slice)) !== null) {
    if (m.index > lastIndex) {
      const txt = slice.slice(lastIndex, m.index).replace(/\s+/g, ' ').trim();
      if (txt) tokens.push({ type: 'text', text: txt });
    }
    const isClose = m[0].startsWith('</');
    tokens.push({ type: 'tag', name: m[1].toLowerCase(), close: isClose, index: m.index });
    lastIndex = tagRe.lastIndex;
  }
  if (lastIndex < slice.length) {
    const tail = slice.slice(lastIndex).replace(/\s+/g, ' ').trim();
    if (tail) tokens.push({ type: 'text', text: tail });
  }

  const sections = [];
  let currentSection = null;
  let i = 0;

  function pushDefaultSection() {
    if (!currentSection) currentSection = { title: 'BODY', content: [] };
  }

  while (i < tokens.length) {
    const t = tokens[i];

    if (t.type === 'tag' && /^h[1-6]$/.test(t.name)) {
      // grab inner text following this tag
      const nextText = (i + 1 < tokens.length && tokens[i + 1].type === 'text') ? tokens[i + 1].text : innerTextFrom(slice, t.index + slice.slice(0, t.index).length, t.name);
      if (currentSection) sections.push(currentSection);
      currentSection = { title: nextText || '', content: [] };
      // advance past possible inline text
      if (i + 1 < tokens.length && tokens[i + 1].type === 'text') i++;
      i++;
      continue;
    }

    if (t.type === 'tag' && t.name === 'p') {
      // paragraph text: either immediate text token or innerTextFrom
      const para = (i + 1 < tokens.length && tokens[i + 1].type === 'text') ? tokens[i + 1].text : innerTextFrom(slice, t.index + slice.slice(0, t.index).length, 'p');
      pushDefaultSection();
      if (para) currentSection.content.push({ type: 'paragraph', text: para });
      if (i + 1 < tokens.length && tokens[i + 1].type === 'text') i++;
      i++;
      continue;
    }

    if (t.type === 'tag' && (t.name === 'ul' || t.name === 'ol')) {
      // collect li items until closing list tag
      const items = [];
      i++;
      while (i < tokens.length) {
        const tt = tokens[i];
        if (tt.type === 'tag' && tt.name === 'li' && !tt.close) {
          const liText = (i + 1 < tokens.length && tokens[i + 1].type === 'text') ? tokens[i + 1].text : innerTextFrom(slice, tt.index + slice.slice(0, tt.index).length, 'li');
          if (liText) items.push(liText);
          if (i + 1 < tokens.length && tokens[i + 1].type === 'text') i++;
        } else if (tt.type === 'tag' && tt.name === (t.name) && tt.close) {
          break;
        }
        i++;
      }
      pushDefaultSection();
      if (items.length) currentSection.content.push({ type: 'list', items });
      i++; // skip closing list tag
      continue;
    }

    // plain text outside tags: treat as paragraph
    if (t.type === 'text') {
      pushDefaultSection();
      currentSection.content.push({ type: 'paragraph', text: t.text });
    }

    i++;
  }

  if (currentSection) sections.push(currentSection);
  return sections;
}

async function downloadAndParse(resume) {
  try {
    console.log(`Downloading ${resume.name}...`);
    // use builtin http/https to avoid node-fetch / undici issues
    const html = await fetchText(resume.url);

    console.log(`Parsing ${resume.name}...`);
    const parsed = parseContent(html);
    const output = { title: resume.title, sections: parsed };

    const outputDir = path.join(__dirname, '../public/resumes');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${resume.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`✓ Saved to ${outputPath}`);
    return output;
  } catch (err) {
    console.error(`✗ Error processing ${resume.name}:`, err.message);
    throw err;
  }
}

// simple fetch implementation with redirect support
async function fetchText(url, redirects = 0) {
  if (redirects > 10) throw new Error('Too many redirects');

  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https://') ? https : http;
    const req = lib.get(url, (res) => {
      const { statusCode, headers } = res;

      // handle redirects
      if (statusCode >= 300 && statusCode < 400 && headers.location) {
        // follow redirect
        res.resume();
        return resolve(fetchText(new URL(headers.location, url).toString(), redirects + 1));
      }

      if (statusCode !== 200) {
        res.resume();
        return reject(new Error(`Request Failed. Status Code: ${statusCode}`));
      }

      let raw = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { raw += chunk; });
      res.on('end', () => resolve(raw));
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  for (const resume of resumes) {
    await downloadAndParse(resume);
  }
}

main().catch(console.error);