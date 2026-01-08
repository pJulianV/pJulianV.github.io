import { useState, useEffect, useRef } from 'react';
import { Message, AIProvider, Conversation } from '@/types';
import { AI_PROVIDERS, aiService } from '@/services/aiService';
import { dbOperations } from '@/db/database';
import { Send, Loader2, Bot, User } from 'lucide-react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

interface ChatInterfaceProps {
  conversation: Conversation | null;
  onUpdateConversation: (conversation: Conversation) => void;
}

export default function ChatInterface({ conversation, onUpdateConversation }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [apiKeys, setApiKeys] = useState<Record<AIProvider, string>>({
    openai: '',
    anthropic: '',
    google: '',
    groq: '',
    ollama: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAPIKeys();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  useEffect(() => {
    if (selectedProvider) {
      const models = AI_PROVIDERS[selectedProvider].models;
      setSelectedModel(models[0]);
    }
  }, [selectedProvider]);

  const loadAPIKeys = async () => {
    const keys = await dbOperations.getAllAPIKeys();
    const keyMap: Record<AIProvider, string> = {
      openai: '',
      anthropic: '',
      google: '',
      groq: '',
      ollama: 'local'
    };

    keys.forEach(key => {
      keyMap[key.provider] = key.key;
    });

    setApiKeys(keyMap);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const apiKey = apiKeys[selectedProvider];
    if (!apiKey && selectedProvider !== 'ollama') {
      alert(`Por favor configura tu API Key de ${AI_PROVIDERS[selectedProvider].name} en la configuración.`);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      provider: selectedProvider,
      model: selectedModel
    };

    const updatedMessages = [...(conversation?.messages || []), userMessage];
    
    let updatedConversation: Conversation;
    if (conversation) {
      updatedConversation = {
        ...conversation,
        messages: updatedMessages,
        updatedAt: new Date()
      };
    } else {
      updatedConversation = {
        id: Date.now().toString(),
        title: input.slice(0, 50) + (input.length > 50 ? '...' : ''),
        messages: updatedMessages,
        createdAt: new Date(),
        updatedAt: new Date(),
        provider: selectedProvider,
        model: selectedModel
      };
    }

    onUpdateConversation(updatedConversation);
    await dbOperations.saveConversation(updatedConversation);
    
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.sendMessage(selectedProvider, apiKey, {
        messages: updatedMessages.map(m => ({
          role: m.role,
          content: m.content
        })),
        model: selectedModel,
        temperature: 0.7,
        maxTokens: 2000
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        provider: selectedProvider,
        model: response.model
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedMessages, assistantMessage],
        updatedAt: new Date()
      };

      onUpdateConversation(finalConversation);
      await dbOperations.saveConversation(finalConversation);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasAnyAPIKey = Object.values(apiKeys).some(key => key !== '');

  return (
    <div className="flex flex-col h-full">
      {/* Header con selección de modelo */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Proveedor de IA</label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value as AIProvider)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              disabled={isLoading}
            >
              {(Object.keys(AI_PROVIDERS) as AIProvider[]).map(provider => {
                const config = AI_PROVIDERS[provider];
                const hasKey = apiKeys[provider] || provider === 'ollama';
                return (
                  <option key={provider} value={provider} disabled={!hasKey}>
                    {config.icon} {config.name} {!hasKey && '(Sin API Key)'}
                  </option>
                );
              })}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              disabled={isLoading}
            >
              {AI_PROVIDERS[selectedProvider].models.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!hasAnyAPIKey && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bienvenido a Local AI Assistant</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Para comenzar, configura al menos una API Key en la sección de Configuración
            </p>
          </div>
        )}

        {conversation?.messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              }`}
            >
              {message.role === 'assistant' ? (
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: md.render(message.content) }}
                />
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
              
              <div className="text-xs opacity-70 mt-2">
                {message.model && `${AI_PROVIDERS[message.provider!].icon} ${message.model}`}
              </div>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-gray-600 dark:text-gray-400">Pensando...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje... (Shift + Enter para nueva línea)"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 resize-none"
            rows={1}
            disabled={isLoading || !hasAnyAPIKey}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading || !hasAnyAPIKey}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
