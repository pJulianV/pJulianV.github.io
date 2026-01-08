import { AIProvider, AIProviderConfig } from '@/types';

export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  openai: {
    provider: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    models: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    apiKeyRequired: true,
    baseURL: 'https://api.openai.com/v1',
    description: 'GPT-4 y GPT-3.5 de OpenAI',
    freeOptions: false
  },
  anthropic: {
    provider: 'anthropic',
    name: 'Anthropic',
    icon: '🧠',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    apiKeyRequired: true,
    baseURL: 'https://api.anthropic.com/v1',
    description: 'Claude 3 de Anthropic',
    freeOptions: false
  },
  google: {
    provider: 'google',
    name: 'Google',
    icon: '🔍',
    models: ['gemini-pro', 'gemini-pro-vision'],
    apiKeyRequired: true,
    baseURL: 'https://generativelanguage.googleapis.com/v1',
    description: 'Gemini de Google (tiene tier gratuito)',
    freeOptions: true
  },
  groq: {
    provider: 'groq',
    name: 'Groq',
    icon: '⚡',
    models: ['mixtral-8x7b-32768', 'llama2-70b-4096'],
    apiKeyRequired: true,
    baseURL: 'https://api.groq.com/openai/v1',
    description: 'Groq - Inferencia ultra rápida (gratuito)',
    freeOptions: true
  },
  ollama: {
    provider: 'ollama',
    name: 'Ollama',
    icon: '🏠',
    models: ['llama2', 'mistral', 'codellama', 'neural-chat'],
    apiKeyRequired: false,
    baseURL: 'http://localhost:11434',
    description: 'Modelos locales con Ollama (100% gratuito y privado)',
    freeOptions: true
  }
};

export interface AIRequest {
  messages: Array<{ role: string; content: string }>;
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

class AIService {
  async sendMessage(
    provider: AIProvider,
    apiKey: string,
    request: AIRequest
  ): Promise<AIResponse> {
    const config = AI_PROVIDERS[provider];
    
    switch (provider) {
      case 'openai':
      case 'groq':
        return await this.sendOpenAICompatible(config, apiKey, request);
      case 'anthropic':
        return await this.sendAnthropic(config, apiKey, request);
      case 'google':
        return await this.sendGoogle(config, apiKey, request);
      case 'ollama':
        return await this.sendOllama(config, request);
      default:
        throw new Error(`Proveedor no soportado: ${provider}`);
    }
  }

  private async sendOpenAICompatible(
    config: AIProviderConfig,
    apiKey: string,
    request: AIRequest
  ): Promise<AIResponse> {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error al comunicarse con la API');
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      model: data.model,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }

  private async sendAnthropic(
    config: AIProviderConfig,
    apiKey: string,
    request: AIRequest
  ): Promise<AIResponse> {
    const response = await fetch(`${config.baseURL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        max_tokens: request.maxTokens || 2000,
        temperature: request.temperature || 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error al comunicarse con Anthropic');
    }

    const data = await response.json();
    return {
      content: data.content[0].text,
      model: data.model,
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)
      }
    };
  }

  private async sendGoogle(
    config: AIProviderConfig,
    apiKey: string,
    request: AIRequest
  ): Promise<AIResponse> {
    const response = await fetch(
      `${config.baseURL}/models/${request.model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: request.messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          }))
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error al comunicarse con Google');
    }

    const data = await response.json();
    return {
      content: data.candidates[0].content.parts[0].text,
      model: request.model
    };
  }

  private async sendOllama(
    config: AIProviderConfig,
    request: AIRequest
  ): Promise<AIResponse> {
    const response = await fetch(`${config.baseURL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error('Error al comunicarse con Ollama. ¿Está corriendo?');
    }

    const data = await response.json();
    return {
      content: data.message.content,
      model: request.model
    };
  }
}

export const aiService = new AIService();
