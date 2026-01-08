import Dexie, { Table } from 'dexie';
import { Conversation, Message, APIKey, AppSettings } from '@/types';

class LocalDatabase extends Dexie {
  conversations!: Table<Conversation, string>;
  apiKeys!: Table<APIKey, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super('LocalAIAssistant');
    
    this.version(1).stores({
      conversations: 'id, title, createdAt, updatedAt, provider',
      apiKeys: 'provider, key, isActive',
      settings: 'theme, defaultProvider'
    });
  }
}

export const db = new LocalDatabase();

// Database operations
export const dbOperations = {
  // Conversations
  async getAllConversations(): Promise<Conversation[]> {
    return await db.conversations.orderBy('updatedAt').reverse().toArray();
  },

  async getConversation(id: string): Promise<Conversation | undefined> {
    return await db.conversations.get(id);
  },

  async saveConversation(conversation: Conversation): Promise<string> {
    return await db.conversations.put(conversation);
  },

  async deleteConversation(id: string): Promise<void> {
    await db.conversations.delete(id);
  },

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<number> {
    return await db.conversations.update(id, updates);
  },

  // API Keys
  async getAllAPIKeys(): Promise<APIKey[]> {
    return await db.apiKeys.toArray();
  },

  async getAPIKey(provider: string): Promise<APIKey | undefined> {
    return await db.apiKeys.get(provider);
  },

  async saveAPIKey(apiKey: APIKey): Promise<string> {
    return await db.apiKeys.put(apiKey);
  },

  async deleteAPIKey(provider: string): Promise<void> {
    await db.apiKeys.delete(provider);
  },

  // Settings
  async getSettings(): Promise<AppSettings | undefined> {
    const settings = await db.settings.toArray();
    return settings[0];
  },

  async saveSettings(settings: AppSettings): Promise<string> {
    await db.settings.clear();
    return await db.settings.add(settings);
  },

  // Clear all data
  async clearAllData(): Promise<void> {
    await db.conversations.clear();
    await db.apiKeys.clear();
    await db.settings.clear();
  }
};
