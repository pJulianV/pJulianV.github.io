// Types for AI Providers
export type AIProvider = 'openai' | 'anthropic' | 'google' | 'ollama' | 'groq';

export interface APIKey {
  provider: AIProvider;
  key: string;
  isActive: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  provider?: AIProvider;
  model?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  provider: AIProvider;
  model: string;
}

export interface AIProviderConfig {
  provider: AIProvider;
  name: string;
  icon: string;
  models: string[];
  apiKeyRequired: boolean;
  baseURL?: string;
  description: string;
  freeOptions?: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  defaultProvider: AIProvider;
  defaultModel: string;
  temperature: number;
  maxTokens: number;
  streamingEnabled: boolean;
}
