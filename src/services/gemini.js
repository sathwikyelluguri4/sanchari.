// Google Gemini API service — using official @google/generative-ai SDK
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
];

async function callGemini(prompt, retries = 2) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is missing. Add VITE_GEMINI_API_KEY to your .env file.');
  }

  let lastError = null;

  for (const modelName of MODELS) {
    const model = genAI.getGenerativeModel({ model: modelName });

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`[Gemini] Trying ${modelName}, attempt ${attempt}...`);
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (!text) throw new Error('Empty response from Gemini');
        console.log(`[Gemini] ✅ Success with ${modelName}`);
        return text;
      } catch (e) {
        lastError = e;
        console.warn(`[Gemini] ${modelName} attempt ${attempt} failed:`, e.message);

        if (e.message?.includes('API_KEY') || e.message?.includes('401') || e.message?.includes('403')) {
          throw new Error(`Gemini API key error: ${e.message}`);
        }

        if (e.message?.includes('404') || e.message?.includes('not found') || e.message?.includes('no longer available')) {
          console.warn(`[Gemini] ${modelName} not available, trying next model...`);
          break;
        }

        if (e.message?.includes('429') || e.message?.includes('503') || e.message?.includes('overloaded')) {
          const wait = attempt * 2000;
          console.warn(`[Gemini] Overloaded. Retrying in ${wait}ms...`);
          await new Promise((r) => setTimeout(r, wait));
          continue;
        }

        if (attempt === retries) break;
        await new Promise((r) => setTimeout(r, attempt * 1000));
      }
    }
  }

  throw lastError || new Error('All Gemini models failed. Please try again.');
}


function stripMarkdown(text) {
  let t = text.trim();
  if (t.startsWith('```json')) t = t.substring(7);
  else if (t.startsWith('```')) t = t.substring(3);
  if (t.endsWith('```')) t = t.slice(0, -3);
  return t.trim();
}

export async function generateItinerary(form, youtubeVideo = null) {
  const videoContext = youtubeVideo
    ? `
REAL YOUTUBE TRAVEL VIDEO REFERENCE (this is the source you must use for realistic planning):
- Title: ${youtubeVideo.title}
- Channel: ${youtubeVideo.channel}
- Video URL: ${youtubeVideo.url}
- Description: ${youtubeVideo.description || 'N/A'}
- Duration: ${youtubeVideo.duration}
- Views: ${youtubeVideo.views}

Use the information in this YouTube video URL and the traveler's experience as evidence when planning the route, costs, places to visit, and local tips. Mention this video as the reference in the output when appropriate.
`
    : 'No YouTube video reference is available. Plan based on the destination and user budget only.';

  const prompt = `
You are an expert travel planner. Create a day-by-day itinerary for a trip to ${form.destination}.
Starting city: ${form.from || 'Not specified'}
Budget: ${form.budget} INR
Days: ${form.days}
Travel Style: ${form.style || 'Any'}
Interests: ${form.interests && form.interests.length ? form.interests.join(', ') : 'Any'}
${videoContext}
Respond ONLY with a raw JSON object (no markdown wrapping, no \`\`\`json prefix) using exactly this schema:
{
  "destination": "Name of destination",
  "videoReference": "YouTube video title used as reference (or null)",
  "days": [
    {
      "day": 1,
      "title": "Short title for the day",
      "activities": [
        {
          "icon": "emoji",
          "time": "10:00 AM",
          "desc": "Short description",
          "cost": 500
        }
      ],
      "totalCost": 500
    }
  ]
}

Ensure the total cost of all days combined is realistic and does not exceed the budget of ${form.budget} INR.
`;

  const responseText = stripMarkdown(await callGemini(prompt));
  try {
    return JSON.parse(responseText);
  } catch (e) {
    throw new Error('Failed to parse AI response as JSON. Received: ' + responseText);
  }
}

export async function analyzeVideoForPrices(video, destination) {
  const prompt = `
You are a travel budget analyst. Based on this YouTube travel vlog about ${destination}:

Title: ${video.title}
Channel: ${video.channel}
Duration: ${video.duration}

Estimate realistic travel costs for ${destination} from an Indian traveler's perspective.

Respond ONLY with a raw JSON object (no markdown, no \`\`\`json) using exactly this schema:
{
  "transport": 800,
  "food": 500,
  "stay": 1200,
  "activities": 300,
  "total": 2800,
  "confidence": 75,
  "tip": "One practical tip from this video"
}

All values in INR. transport = one-way travel cost, food = per day, stay = per night, activities = total. total = overall trip estimate. confidence = 0-100.
`;

  const responseText = stripMarkdown(await callGemini(prompt));
  try {
    return JSON.parse(responseText);
  } catch (e) {
    throw new Error('Failed to parse AI price analysis as JSON. Received: ' + responseText);
  }
}
