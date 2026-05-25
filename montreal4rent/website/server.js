// Lightweight logging server to append email logs to appemail.log in website root
// Run with: npm run server

const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
// Inline CORS — avoids the utils-merge/util._extend DEP0060 deprecation warning
function corsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }
  next();
}

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(corsMiddleware);

const LOG_FILE = path.join(__dirname, 'appemail.log');
const HISTORY_DIR = path.join(__dirname, 'history', 'emails');

// Ensure history directory exists
try {
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
} catch (err) {
  console.warn('Failed to ensure history dir:', err);
}

// Tee console output to a file in website root
const CONSOLE_LOG_FILE = path.join(__dirname, 'montreal4rent.log');
const consoleLogStream = fs.createWriteStream(CONSOLE_LOG_FILE, { flags: 'a', encoding: 'utf8' });
const originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

function writeConsoleLine(level, args) {
  try {
    const line = `[${new Date().toISOString()}] ${level}: ${util.format(...args)}`;
    consoleLogStream.write(line + '\n');
  } catch (_) {
    // Best-effort; if writing fails, ignore to not disrupt app
  }
}

console.log = (...args) => { writeConsoleLine('INFO', args); originalConsole.log(...args); };
console.info = (...args) => { writeConsoleLine('INFO', args); originalConsole.info(...args); };
console.warn = (...args) => { writeConsoleLine('WARN', args); originalConsole.warn(...args); };
console.error = (...args) => { writeConsoleLine('ERROR', args); originalConsole.error(...args); };

function appendLog(entry) {
  const record = {
    ts: new Date().toISOString(),
    ...entry,
  };
  const line = JSON.stringify(record) + '\n';
  return fs.promises.appendFile(LOG_FILE, line);
}

app.post('/api/log-email', async (req, res) => {
  try {
    await appendLog(req.body || {});
    res.status(200).send('ok');
  } catch (err) {
    console.error('Failed to append to appemail.log:', err);
    res.status(500).send('error');
  }
});

function sanitizePart(str) {
  return String(str || '')
    .replace(/[^a-zA-Z0-9-_\. ]+/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 80);
}

function timestampForFilename(isoTs) {
  const d = isoTs ? new Date(isoTs) : new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-` +
    `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

// Persist each email log as an individual JSON file under history/emails
app.post('/api/email-history', async (req, res) => {
  try {
    const entry = req.body || {};
    const ts = timestampForFilename(entry.timestamp);
    const subject = sanitizePart(entry.subject);
    const toEmail = sanitizePart(entry.toEmail);
    const fileName = `${ts}-${subject || 'no-subject'}-to-${toEmail || 'unknown'}.json`;
    const filePath = path.join(HISTORY_DIR, fileName);

    const record = {
      ts: new Date().toISOString(),
      ...entry,
    };

    await fs.promises.writeFile(filePath, JSON.stringify(record, null, 2), 'utf8');
    res.status(200).send('ok');
  } catch (err) {
    console.error('Failed to write email history file:', err);
    res.status(500).send('error');
  }
});

// List history files (most recent first). Optional query: limit
app.get('/api/email-history', async (req, res) => {
  try {
    const limit = Math.max(1, Math.min(1000, Number(req.query.limit) || 200));
    const files = await fs.promises.readdir(HISTORY_DIR);

    const entries = await Promise.all(files
      .filter(f => f.toLowerCase().endsWith('.json'))
      .map(async (f) => {
        const fullPath = path.join(HISTORY_DIR, f);
        const st = await fs.promises.stat(fullPath);
        let meta = {};
        try {
          const txt = await fs.promises.readFile(fullPath, 'utf8');
          const json = JSON.parse(txt);
          meta = {
            subject: json.subject || json.Subject || undefined,
            toEmail: json.toEmail || json.To || undefined,
            fromEmail: json.fromEmail || json.From || undefined,
            formType: json.formType || undefined,
            status: json.status || undefined,
            timestamp: json.timestamp || json.ts || undefined,
          };
        } catch (_) {
          // ignore parse errors
        }
        return {
          file: f,
          size: st.size,
          mtime: st.mtime.toISOString(),
          ...meta,
        };
      }));

    entries.sort((a, b) => (a.mtime < b.mtime ? 1 : -1));
    res.status(200).json(entries.slice(0, limit));
  } catch (err) {
    console.error('Failed to list email history:', err);
    res.status(500).send('error');
  }
});

// Download a specific history file by name
app.get('/api/email-history/file/:name', async (req, res) => {
  try {
    const name = req.params.name || '';
    if (!name.toLowerCase().endsWith('.json')) {
      return res.status(400).send('invalid');
    }
    const safeName = path.basename(name);
    const filePath = path.join(HISTORY_DIR, safeName);
    // Ensure file is inside HISTORY_DIR
    if (!filePath.startsWith(HISTORY_DIR)) {
      return res.status(400).send('invalid');
    }
    await fs.promises.access(filePath, fs.constants.R_OK);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error('Failed to serve email history file:', err);
    res.status(404).send('not found');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Email logging server listening on port ${port}`);
  console.log(`Log file: ${LOG_FILE}`);
  console.log(`Console log file: ${CONSOLE_LOG_FILE}`);
});
