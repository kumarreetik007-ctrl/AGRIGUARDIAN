import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI SDK with required telemetry header
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory Community Feed data (seed with authentic Indian farmer community posts)
let communityPosts = [
  {
    id: 'post-1',
    authorName: 'Sardar Balwinder Singh',
    authorDistrict: 'Ludhiana, Punjab',
    authorAvatar: '👨🌾',
    crop: 'Wheat (HD-3086)',
    category: 'Pest Alerts 🚨',
    timeAgo: '2 hours ago',
    title: 'Yellow Rust alert in Sector 4 border fields',
    content: 'Noticed early stripe-like yellow powdery spots on lower leaves this morning. Alerting nearby farmers. We delayed tubewell watering because of tomorrow rain forecast and sprayed bio-fungicide (Trichoderma viride). Please inspect your crop!',
    likes: 42,
    userLiked: false,
    comments: [
      { id: 'c1', author: 'Ramesh Kumar', text: 'Thank you Balwinder ji! Just checked my 2.5 acre wheat parcel, leaf blight detected early here too.', timeAgo: '1 hour ago' },
      { id: 'c2', author: 'Dr. S. Sharma (KVK)', text: 'Good catch. If rust exceeds 5% foliage, spray Propiconazole 25 EC @ 1ml/L in sunny breaks.', timeAgo: '45 mins ago' }
    ],
    sharesCount: 18,
    verifiedFarmer: true,
  },
  {
    id: 'post-2',
    authorName: 'Anita Devi',
    authorDistrict: 'Alwar, Rajasthan',
    authorAvatar: '👩🌾',
    crop: 'Mustard (RH-749)',
    category: 'Irrigation 💧',
    timeAgo: '5 hours ago',
    title: 'Saved 2,800L water using AgriGuardian irrigation delay',
    content: 'Yesterday the app advised delaying irrigation before unseasonal light showers. Saved our tubewell diesel cost of ₹620 and avoided soil waterlogging. Sustainability score rose to 84!',
    likes: 67,
    userLiked: true,
    comments: [
      { id: 'c3', author: 'Gurpreet Singh', text: 'Great achievement Anita ji! Solar pump or diesel?', timeAgo: '3 hours ago' },
      { id: 'c4', author: 'Anita Devi', text: 'Diesel pump right now, applying for PM-KUSUM solar subsidy next week!', timeAgo: '2 hours ago' }
    ],
    sharesCount: 29,
    verifiedFarmer: true,
  },
  {
    id: 'post-3',
    authorName: 'Rajesh Patel',
    authorDistrict: 'Rajkot, Gujarat',
    authorAvatar: '👨🌾',
    crop: 'Cotton & Groundnut',
    category: 'Organic / Bio 🌿',
    timeAgo: '1 day ago',
    title: 'Neem seed kernel extract (NSKE 5%) results on whitefly',
    content: 'Shared my bio-spray mixture log in the AgriSafe module. Completely eliminated early whitefly nymphs without synthetic pyrethroids. Safe for honeybees and certified organic.',
    likes: 89,
    userLiked: false,
    comments: [
      { id: 'c5', author: 'Vikas Deshmukh', text: 'Could you share the exact soaking ratio for 1 acre spray tank?', timeAgo: '18 hours ago' },
      { id: 'c6', author: 'Rajesh Patel', text: '5 kg neem seed kernels crushed + soaked in 100L water overnight, add 100g detergent as sticker.', timeAgo: '16 hours ago' }
    ],
    sharesCount: 45,
    verifiedFarmer: true,
  },
];

// In-memory saved farm records / irrigation history
let farmRecords = [
  {
    id: 'rec-01',
    date: '2026-10-02',
    action: 'Irrigation Delayed (Rain Event Forecast)',
    waterSavedLiters: 1400,
    costSavedInr: 340,
    ecoPoints: '+4 Eco Score',
    farmer: 'Ramesh Kumar',
  },
  {
    id: 'rec-02',
    date: '2026-09-27',
    action: 'Organic Trichoderma Spray for Tip Blight',
    waterSavedLiters: 0,
    costSavedInr: 520,
    ecoPoints: '+5 Eco Score',
    farmer: 'Ramesh Kumar',
  },
];

// Fallback Agronomic Knowledge Base if Gemini API is temporarily offline or without key
const fallbackResponses: Record<string, { en: string; hi: string }> = {
  weather: {
    en: 'Rain is expected tomorrow with 78% probability around 2:00 PM. Wind speed is 14 km/h with 72% humidity. We strongly advise delaying irrigation today to prevent root rot and conserve over 1,400 liters of tubewell water.',
    hi: 'कल दोपहर लगभग 2:00 बजे 78% बारिश की संभावना है। हवा की गति 14 किमी/घंटा और नमी 72% है। हम आज सिंचाई टालने की सलाह देते हैं ताकि जड़ों में जलभराव न हो और 1,400 लीटर पानी की बचत हो सके।'
  },
  irrigation: {
    en: 'Your current soil moisture is 62%, which is adequate for the tillering stage of wheat. Delay scheduled irrigation for 36 hours. If no rain arrives by tomorrow evening, apply light furrow irrigation of 2-3 cm depth.',
    hi: 'आपके खेत की मिट्टी की नमी 62% है, जो गेहूं की कल्ले फूटने (टिल्लरिंग) की अवस्था के लिए पर्याप्त है। सिंचाई 36 घंटे के लिए टालें। यदि कल शाम तक बारिश नहीं होती, तो हल्की सिंचाई (2-3 सेमी) करें।'
  },
  rust: {
    en: 'For Wheat Yellow/Stripe Rust: Early detection requires isolating affected sectors. Restrict high nitrogen fertilizers. Spray bio-fungicide Pseudomonas fluorescens (10g/L) or if severe, Propiconazole 25% EC @ 1ml per liter water with protective mask.',
    hi: 'गेहूं के पीले रतुआ (येलो रस्ट) के लिए: प्रभावित हिस्से में अतिरिक्त यूरिया न डालें। बायो-फंगीसाइड स्यूडोमोनास फ्लोरेसेंस (10 ग्राम/लीटर) का छिड़काव करें, या गंभीर होने पर प्रोपिकोनाजोल 25% EC 1 मिली/लीटर की दर से मास्क पहनकर छिड़कें।'
  },
  safety: {
    en: 'AgriSafe Chemical Warning: Always wear nitrile gloves, protective eyewear, and N95 mask while mixing sprays. Observe 14-day Pre-Harvest Interval (PHI). Never spray against the wind. In case of accidental skin contact, wash with soap and copious clean water.',
    hi: 'एग्रीसेफ कीटनाशक सुरक्षा: छिड़काव तैयार करते समय हमेशा दस्ताने, चश्मा और मास्क पहनें। कटाई से कम से कम 14 दिन पहले छिड़काव बंद करें। हवा की विपरीत दिशा में कभी छिड़काव न करें। त्वचा पर गिरने पर तुरंत साबुन और पानी से धोएं।'
  },
};

// Route: AI Chat (Krishi Mitra Assistant)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, language = 'en', farmerName = 'Ramesh Kumar', crop = 'Wheat' } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Try Gemini API if available
    if (ai) {
      try {
        const systemPrompt = `You are AgriGuardian Assistant (कृषि मित्र), an elite bilingual Indian agricultural expert & agronomist.
The farmer is ${farmerName}, cultivating ${crop} in India.
Current farm conditions: Moisture 62%, loamy soil, rainfall 78% expected tomorrow.
Language requested: ${language === 'hi' ? 'Hindi (हिंदी)' : 'English (with natural Indian agricultural terminology)'}.
Guidelines:
1. Provide accurate, practical, actionable advice following ICAR (Indian Council of Agricultural Research) and KVK standards.
2. Prioritize water conservation, organic/biological alternatives before synthetic pesticides, and safety PPE warnings.
3. Be respectful, encouraging, and farmer-friendly.
4. Keep responses concise (under 120 words) so they are easy to read on a mobile phone screen in the field.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });

        const reply = response.text || '';
        return res.json({ reply, source: 'gemini-3.8-flash' });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to local agronomist knowledge:', geminiError?.message);
      }
    }

    // Smart fallback based on keyword match
    const lower = prompt.toLowerCase();
    let reply = '';
    const isHi = language === 'hi' || lower.includes('नमस्ते') || lower.includes('सिंचाई') || lower.includes('मौसम') || lower.includes('गेहूं');

    if (lower.includes('weather') || lower.includes('rain') || lower.includes('मौसम') || lower.includes('बारिश')) {
      reply = isHi ? fallbackResponses.weather.hi : fallbackResponses.weather.en;
    } else if (lower.includes('water') || lower.includes('irriga') || lower.includes('सिंचाई') || lower.includes('पानी')) {
      reply = isHi ? fallbackResponses.irrigation.hi : fallbackResponses.irrigation.en;
    } else if (lower.includes('rust') || lower.includes('blight') || lower.includes('रोग') || lower.includes('रतुआ') || lower.includes('कीट')) {
      reply = isHi ? fallbackResponses.rust.hi : fallbackResponses.rust.en;
    } else if (lower.includes('spray') || lower.includes('safety') || lower.includes('pesticide') || lower.includes('दवा') || lower.includes('सुरक्षा')) {
      reply = isHi ? fallbackResponses.safety.hi : fallbackResponses.safety.en;
    } else {
      reply = isHi
        ? `नमस्ते ${farmerName} जी! आपकी ${crop} फसल के लिए वर्तमान 62% नमी आदर्श है। कल 78% बारिश के पूर्वानुमान के कारण आज पानी न लगाएं। किसी भी कीट, खरपतवार या खाद संबंधी सलाह के लिए पूछ सकते हैं।`
        : `Hello ${farmerName}! For your ${crop} field, moisture of 62% is in the optimal range. With 78% rain probability tomorrow, delay tubewell pumping to save water and money. Feel free to ask about pest management, fertilizer doses, or soil health!`;
    }

    return res.json({ reply, source: 'agronomy-engine' });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

// Route: AI Crop Doctor Diagnosis (Multimodal Image Analysis)
app.post('/api/diagnose-crop', async (req: Request, res: Response) => {
  try {
    const { imageBase64, sampleKey, crop = 'Wheat' } = req.body;

    // If an image is provided and Gemini is configured, use Gemini 3.8 Flash multimodal
    if (ai && imageBase64) {
      try {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
        const prompt = `Analyze this crop leaf/plant image for agricultural disease or pest infestation. The crop is ${crop}.
Return STRICTLY a JSON object with this exact schema:
{
  "diseaseName": string (e.g. "Leaf Blight (Early Stage)" or "Yellow / Stripe Rust" or "Healthy Foliage"),
  "diseaseHindi": string (Hindi name in Devanagari),
  "confidence": number (e.g. 92),
  "severity": "Low" | "Moderate" | "High",
  "identifiedSymptoms": string,
  "identifiedSymptomsHindi": string,
  "recommendedAction": string (numbered step by step),
  "recommendedActionHindi": string,
  "organicRemedy": string,
  "chemicalRemedy": string (exact dosage e.g. 2g/L water),
  "safetyWarning": string
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: cleanBase64,
                },
              },
              { text: prompt },
            ],
          },
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text?.trim() || '{}';
        const parsed = JSON.parse(text);
        return res.json({ diagnosis: parsed, source: 'gemini-3.8-flash' });
      } catch (err: any) {
        console.warn('Gemini vision diagnosis failed, using agronomy catalog:', err?.message);
      }
    }

    // Preset & Fallback Diagnoses for quick instant verification during hackathon presentation
    const catalog: Record<string, any> = {
      leaf_blight: {
        diseaseName: 'Leaf Blight (Early Stage)',
        diseaseHindi: 'पत्ती झुलसा रोग (प्रारंभिक अवस्था)',
        confidence: 92,
        severity: 'Moderate',
        identifiedSymptoms: 'Brown elliptical spots with yellow halos across tip margins, accompanied by mild leaf discoloration and dried tips.',
        identifiedSymptomsHindi: 'पत्तियों के किनारों पर पीले घेरे वाले भूरे धब्बे और नोकों पर सूखापन।',
        recommendedAction: '1. Restrict excess furrow irrigation to lower canopy humidity.\n2. Apply bio-fungicide or certified copper oxychloride spray (2g/L water) strictly using protective mask.',
        recommendedActionHindi: '1. क्यारियों में अत्यधिक पानी न भरें ताकि नमी कम रहे।\n2. मास्क पहनकर कॉपर ऑक्सीक्लोराइड (2 ग्राम/लीटर) या बायो-फंगीसाइड का छिड़काव करें।',
        organicRemedy: 'Trichoderma viride @ 5g/L + Neem oil 1500 ppm @ 3ml/L water.',
        chemicalRemedy: 'Copper Oxychloride 50 WP @ 2.5g/L or Mancozeb 75 WP @ 2g/L.',
        safetyWarning: 'Wear protective mask and gloves. Observe 14-day Pre-Harvest Interval (PHI).',
      },
      yellow_rust: {
        diseaseName: 'Stripe / Yellow Rust (Puccinia striiformis)',
        diseaseHindi: 'पीला रतुआ / हल्दी रोग',
        confidence: 95,
        severity: 'High',
        identifiedSymptoms: 'Yellow to orange-yellow powdery pustules arranged in distinct linear stripes along leaf veins.',
        identifiedSymptomsHindi: 'पत्तियों की नसों के समानांतर पीले रंग की धारियों में चूर्ण जैसी फुंसियां।',
        recommendedAction: '1. Immediately cease top-dressing of nitrogen/urea fertilizer.\n2. Spray Propiconazole 25% EC (Tilt) @ 1ml/L within 24-48 hours on cloud-free afternoon.',
        recommendedActionHindi: '1. तुरंत यूरिया का छिड़काव रोक दें।\n2. प्रोपिकोनाजोल 25% EC (1 मिली/लीटर) का दोपहर में धूप निकलने पर छिड़काव करें।',
        organicRemedy: 'Pseudomonas fluorescens 10g/L + fermented cow butter milk spray.',
        chemicalRemedy: 'Propiconazole 25 EC @ 1ml/L or Tebuconazole 25.9 EC @ 1ml/L.',
        safetyWarning: 'Critical infectious pathogen: wash spray equipment thoroughly away from drinking water wells.',
      },
      powdery_mildew: {
        diseaseName: 'Powdery Mildew (Blumeria graminis)',
        diseaseHindi: 'चूर्णिल आसिता (सफेद फफूंद)',
        confidence: 89,
        severity: 'Moderate',
        identifiedSymptoms: 'White to grayish powdery fungal growth patches on upper leaf surfaces and lower stem sheaths.',
        identifiedSymptomsHindi: 'पत्तियों की ऊपरी सतह और तने पर सफेद पाउडर जैसी फफूंद के धब्बे।',
        recommendedAction: '1. Improve field aeration by clearing border weeds.\n2. Spray wettable sulfur 80% WP @ 2.5-3g/L or bio-sulfur.',
        recommendedActionHindi: '1. खेत की मेड़ों से खरपतवार हटाएं ताकि हवा का संचार बना रहे।\n2. घुलनशील सल्फर 80% WP (2.5-3 ग्राम/लीटर) का छिड़काव करें।',
        organicRemedy: 'Potassium bicarbonate (3g/L) + Neem extract.',
        chemicalRemedy: 'Sulfur 80 WP @ 2.5g/L or Hexaconazole 5 EC @ 1ml/L.',
        safetyWarning: 'Do not spray sulfur during peak mid-day heat exceeding 35°C to avoid leaf scorch.',
      },
      healthy: {
        diseaseName: 'Healthy Crop Foliage',
        diseaseHindi: 'स्वस्थ हरी फसल',
        confidence: 98,
        severity: 'Low',
        identifiedSymptoms: 'Vibrant chlorophyll pigmentation, no active fungal lesions, uniform tillering and strong root turgor.',
        identifiedSymptomsHindi: 'गहरा हरा रंग, पत्तियों पर कोई दाग-धब्बे नहीं, तंदुरुस्त विकास।',
        recommendedAction: 'Maintain balanced irrigation schedule. Follow recommended micro-nutrient spray (Zinc & Iron chelate) at tillering stage.',
        recommendedActionHindi: 'सिंचाई का संतुलन बनाए रखें। कल्ले फूटने के समय अनुशंसित जिंक व सूक्ष्म पोषक तत्वों का छिड़काव करें।',
        organicRemedy: 'Vermicompost tea foliar spray to boost natural plant immunity.',
        chemicalRemedy: 'No chemical fungicides needed! Save your input cost.',
        safetyWarning: 'Continue periodic monitoring twice a week.',
      },
    };

    const diagnosis = catalog[sampleKey || 'leaf_blight'] || catalog.leaf_blight;
    return res.json({ diagnosis, source: 'agronomy-catalog' });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Diagnosis failed' });
  }
});

// Route: Real-Time Telemetry Data Stream
app.get('/api/telemetry/live', (_req: Request, res: Response) => {
  // Add micro-sensor jitter for live dynamism
  const jitter = (Math.random() * 2 - 1).toFixed(1);
  const currentMoisture = Math.min(85, Math.max(40, Math.round(62 + parseFloat(jitter))));

  res.json({
    timestamp: new Date().toISOString(),
    sector: 'Sector 4 (Ramesh Farm)',
    crop: 'Wheat (PBW-550)',
    growthStage: 'Tillering (38 Days)',
    acreage: 2.5,
    soilType: 'Loamy Alluvial',
    metrics: {
      soilMoisturePercent: currentMoisture,
      soilMoistureStatus: currentMoisture > 65 ? 'High' : currentMoisture < 45 ? 'Low' : 'Adequate',
      temperatureC: 28.2,
      humidityPercent: 78,
      rainProbabilityPercent: 78,
      rainExpectedArrival: 'Tomorrow, ~2:00 PM',
      evapotranspirationMmDay: 3.1,
      windSpeedKmh: 14,
      windDirection: 'NE',
      npk: {
        nitrogen: { value: 240, target: 280, unit: 'kg/ha', status: 'Moderate' },
        phosphorus: { value: 48, target: 50, unit: 'kg/ha', status: 'Optimal' },
        potassium: { value: 195, target: 200, unit: 'kg/ha', status: 'Optimal' },
        organicCarbonPercent: 0.68,
      },
      sustainabilityScore: 78,
      sustainabilityBreakdown: {
        waterEfficiency: 82,
        soilManagement: 88,
        resourceUsage: 76,
        chemicalSafety: 65,
      },
      savings: {
        waterSavedLitersTotal: 14200,
        energySavedKwh: 380,
        moneySavedInr: 3420,
        pesticideReductionKg: 4.2,
      },
    },
    recommendation: {
      action: 'DELAY_IRRIGATION',
      headline: 'Delay irrigation today. Rainfall expected tomorrow.',
      headlineHindi: 'आज सिंचाई टालें। कल बारिश का पूर्वानुमान है।',
      priority: 'HIGH',
      waterSavedEstimateLiters: 1400,
      savingsInr: 340,
    },
  });
});

// Route: Social Sharing Community Feed (Krishi Chaupal)
app.get('/api/feed', (_req: Request, res: Response) => {
  res.json({ posts: communityPosts });
});

app.post('/api/feed', (req: Request, res: Response) => {
  const { title, content, crop, category, authorName, authorDistrict } = req.body;
  if (!content || !title) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: `post-${Date.now()}`,
    authorName: authorName || 'Ramesh Kumar',
    authorDistrict: authorDistrict || 'Ludhiana, Punjab',
    authorAvatar: '👨🌾',
    crop: crop || 'Wheat (PBW-550)',
    category: category || 'General Tips 🌾',
    timeAgo: 'Just now',
    title,
    content,
    likes: 1,
    userLiked: true,
    comments: [],
    sharesCount: 0,
    verifiedFarmer: true,
  };

  communityPosts.unshift(newPost);
  res.status(201).json({ post: newPost });
});

app.post('/api/feed/:id/like', (req: Request, res: Response) => {
  const { id } = req.params;
  const post = communityPosts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.userLiked = !post.userLiked;
  post.likes += post.userLiked ? 1 : -1;
  res.json({ id: post.id, likes: post.likes, userLiked: post.userLiked });
});

app.post('/api/feed/:id/comment', (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, author = 'Ramesh Kumar' } = req.body;
  const post = communityPosts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const newComment = {
    id: `c-${Date.now()}`,
    author,
    text,
    timeAgo: 'Just now',
  };
  post.comments.push(newComment);
  res.status(201).json({ comment: newComment, commentsCount: post.comments.length });
});

// Route: Save irrigation decision
app.post('/api/records/confirm-delay', (req: Request, res: Response) => {
  const { farmer = 'Ramesh Kumar', liters = 1400, savings = 340 } = req.body;
  const newRec = {
    id: `rec-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    action: `Irrigation Delayed: Saved ${liters}L Water`,
    waterSavedLiters: liters,
    costSavedInr: savings,
    ecoPoints: '+5 Eco Score',
    farmer,
  };
  farmRecords.unshift(newRec);
  res.json({ success: true, record: newRec, totalRecords: farmRecords.length });
});

app.get('/api/records', (_req: Request, res: Response) => {
  res.json({ records: farmRecords });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', geminiConfigured: !!ai, timestamp: new Date().toISOString() });
});

// Start Express server and mount Vite
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AgriGuardian Server is live on port ${PORT}`);
  });
}

startServer();
