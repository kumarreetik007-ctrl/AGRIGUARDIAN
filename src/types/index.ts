export type Language = 'en' | 'hi';

export interface FarmerProfile {
  id: string;
  name: string;
  nameHindi: string;
  phone: string;
  email: string;
  avatar: string;
  state: string;
  district: string;
  crop: string;
  cropHindi: string;
  acreage: number;
  soilType: string;
  sustainabilityScore: number;
  isVerified: boolean;
}

export interface TelemetryData {
  timestamp: string;
  sector: string;
  crop: string;
  growthStage: string;
  acreage: number;
  soilType: string;
  metrics: {
    soilMoisturePercent: number;
    soilMoistureStatus: 'Low' | 'Adequate' | 'High';
    temperatureC: number;
    humidityPercent: number;
    rainProbabilityPercent: number;
    rainExpectedArrival: string;
    evapotranspirationMmDay: number;
    windSpeedKmh: number;
    windDirection: string;
    npk: {
      nitrogen: { value: number; target: number; unit: string; status: string };
      phosphorus: { value: number; target: number; unit: string; status: string };
      potassium: { value: number; target: number; unit: string; status: string };
      organicCarbonPercent: number;
    };
    sustainabilityScore: number;
    sustainabilityBreakdown: {
      waterEfficiency: number;
      soilManagement: number;
      resourceUsage: number;
      chemicalSafety: number;
    };
    savings: {
      waterSavedLitersTotal: number;
      energySavedKwh: number;
      moneySavedInr: number;
      pesticideReductionKg: number;
    };
  };
  recommendation: {
    action: string;
    headline: string;
    headlineHindi: string;
    priority: string;
    waterSavedEstimateLiters: number;
    savingsInr: number;
  };
}

export interface DiagnosisResult {
  diseaseName: string;
  diseaseHindi: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High';
  identifiedSymptoms: string;
  identifiedSymptomsHindi: string;
  recommendedAction: string;
  recommendedActionHindi: string;
  organicRemedy: string;
  chemicalRemedy: string;
  safetyWarning: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timeAgo: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorDistrict: string;
  authorAvatar: string;
  crop: string;
  category: string;
  timeAgo: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  userLiked: boolean;
  comments: Comment[];
  sharesCount: number;
  verifiedFarmer: boolean;
}

export interface FarmRecord {
  id: string;
  date: string;
  action: string;
  waterSavedLiters: number;
  costSavedInr: number;
  ecoPoints: string;
  farmer: string;
}
