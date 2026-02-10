
export type Language = 'en' | 'hi' | 'te';
export type Tab = 'home' | 'chat' | 'voice' | 'schemes' | 'weather' | 'market' | 'doctor' | 'soil' | 'about' | 'knowledge' | 'crop_guides' | 'fertilizer' | 'pests' | 'crop_calendar';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64 string for displayed images
  video?: string; // base64 string for displayed video thumbnail/indicator
  isThinking?: boolean;
  timestamp: number;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface QuickAction {
  id: string;
  label: Record<Language, string>;
  icon: string;
  prompt: string;
  category: 'crop' | 'weather' | 'market' | 'scheme';
}

export const SUPPORTED_LANGUAGES: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी (Hindi)',
  te: 'తెలుగు (Telugu)'
};