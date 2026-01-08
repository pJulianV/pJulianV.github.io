import { useState, useEffect } from 'react';
import { AIProvider, APIKey } from '@/types';
import { AI_PROVIDERS } from '@/services/aiService';
import { dbOperations } from '@/db/database';
import { Key, Eye, EyeOff, Check, X } from 'lucide-react';

export default function APIKeyManager() {
  const [apiKeys, setApiKeys] = useState<Record<AIProvider, string>>({
    openai: '',
    anthropic: '',
    google: '',
    groq: '',
    ollama: ''
  });
  const [showKeys, setShowKeys] = useState<Record<AIProvider, boolean>>({
    openai: false,
    anthropic: false,
    google: false,
    groq: false,
    ollama: false
  });
  const [savedKeys, setSavedKeys] = useState<Set<AIProvider>>(new Set());

  useEffect(() => {
    loadAPIKeys();
  }, []);

  const loadAPIKeys = async () => {
    const keys = await dbOperations.getAllAPIKeys();
    const keyMap: Record<AIProvider, string> = {
      openai: '',
      anthropic: '',
      google: '',
      groq: '',
      ollama: ''
    };
    const saved = new Set<AIProvider>();

    keys.forEach(key => {
      keyMap[key.provider] = key.key;
      if (key.key) saved.add(key.provider);
    });

    setApiKeys(keyMap);
    setSavedKeys(saved);
  };

  const saveAPIKey = async (provider: AIProvider) => {
    const key = apiKeys[provider];
    if (!key && provider !== 'ollama') return;

    const apiKey: APIKey = {
      provider,
      key,
      isActive: true
    };

    await dbOperations.saveAPIKey(apiKey);
    setSavedKeys(prev => new Set([...prev, provider]));
  };

  const deleteAPIKey = async (provider: AIProvider) => {
    await dbOperations.deleteAPIKey(provider);
    setApiKeys(prev => ({ ...prev, [provider]: '' }));
    setSavedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(provider);
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5" />
        <h2 className="text-xl font-bold">Configuración de API Keys</h2>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🔒 <strong>Privacidad Total:</strong> Tus API keys se guardan solo en tu navegador (IndexedDB). 
          Nunca se envían a ningún servidor externo, solo directamente a los proveedores de IA que elijas.
        </p>
      </div>

      <div className="space-y-4">
        {(Object.keys(AI_PROVIDERS) as AIProvider[]).map(provider => {
          const config = AI_PROVIDERS[provider];
          const isSaved = savedKeys.has(provider);

          return (
            <div
              key={provider}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{config.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{config.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {config.description}
                      </p>
                      {config.freeOptions && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                          ✓ Opción gratuita disponible
                        </span>
                      )}
                    </div>
                    {isSaved && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Guardada</span>
                      </div>
                    )}
                  </div>

                  {config.apiKeyRequired ? (
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 relative">
                        <input
                          type={showKeys[provider] ? 'text' : 'password'}
                          value={apiKeys[provider]}
                          onChange={(e) =>
                            setApiKeys(prev => ({ ...prev, [provider]: e.target.value }))
                          }
                          placeholder={`Ingresa tu ${config.name} API Key`}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        />
                        <button
                          onClick={() =>
                            setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }))
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          {showKeys[provider] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <button
                        onClick={() => saveAPIKey(provider)}
                        disabled={!apiKeys[provider]}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Guardar
                      </button>
                      {isSaved && (
                        <button
                          onClick={() => deleteAPIKey(provider)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      ℹ️ No requiere API key. Instala Ollama localmente.
                    </p>
                  )}

                  <div className="mt-2">
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                        Modelos disponibles
                      </summary>
                      <ul className="mt-2 ml-4 space-y-1 text-gray-600 dark:text-gray-400">
                        {config.models.map(model => (
                          <li key={model}>• {model}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2">📚 ¿Dónde conseguir API Keys?</h3>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>• <strong>OpenAI:</strong> <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a></li>
          <li>• <strong>Anthropic:</strong> <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com/settings/keys</a></li>
          <li>• <strong>Google:</strong> <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">makersuite.google.com/app/apikey</a> (Gratis)</li>
          <li>• <strong>Groq:</strong> <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.groq.com/keys</a> (Gratis)</li>
          <li>• <strong>Ollama:</strong> <a href="https://ollama.ai/download" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ollama.ai/download</a> (100% Local y Gratis)</li>
        </ul>
      </div>
    </div>
  );
}
