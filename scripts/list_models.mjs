import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found in project root');
  process.exit(1);
}
const env = fs.readFileSync(envPath, 'utf8');
const match = env.match(/^VITE_GEMINI_API_KEY=(.+)$/m);
if (!match) {
  console.error('VITE_GEMINI_API_KEY not found in .env');
  process.exit(1);
}
const key = match[1].trim();

try {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const client = new GoogleGenerativeAI(key);
  (async () => {
    try {
      const list = await client.listModels();
      console.log('Available models:', JSON.stringify(list, null, 2));
    } catch (e) {
      console.error('Error listing models:', e);
      process.exit(2);
    }
  })();
} catch (e) {
  console.error('Failed to import @google/generative-ai:', e);
  process.exit(3);
}
