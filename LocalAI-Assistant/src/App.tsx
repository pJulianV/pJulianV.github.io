import { useState } from 'react';
import { Conversation } from '@/types';
import ChatInterface from '@/components/ChatInterface';
import Sidebar from '@/components/Sidebar';
import APIKeyManager from '@/components/APIKeyManager';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import { Settings, MessageSquare, Moon, Sun, Database, Github } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'chat' | 'settings'>('chat');
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Initialize dark mode
  if (darkMode) {
    document.documentElement.classList.add('dark');
  }

  const handleNewConversation = () => {
    setCurrentConversation(null);
    setCurrentView('chat');
  };

  const handleSelectConversation = (conversation: Conversation | null) => {
    setCurrentConversation(conversation);
    setCurrentView('chat');
  };

  const handleUpdateConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <LegalDisclaimer />
      
      {/* Sidebar */}
      <Sidebar
        onSelectConversation={handleSelectConversation}
        currentConversation={currentConversation}
        onNewConversation={handleNewConversation}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold">Local AI Assistant</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Open Source • Privacy First • BYOK
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/anonymous/local-ai-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="GitHub Repository - Anonymous Open Source Project"
              >
                <Github className="w-5 h-5" />
              </a>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={darkMode ? 'Modo Claro' : 'Modo Oscuro'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setCurrentView('chat')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'chat'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>

              <button
                onClick={() => setCurrentView('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'settings'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Settings className="w-4 h-4" />
                Configuración
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {currentView === 'chat' ? (
            <ChatInterface
              conversation={currentConversation}
              onUpdateConversation={handleUpdateConversation}
            />
          ) : (
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                <APIKeyManager />
                
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Almacenamiento Local</h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Toda tu información se guarda exclusivamente en tu navegador usando IndexedDB:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ Historial de conversaciones</li>
                    <li>✓ API Keys (encriptadas localmente)</li>
                    <li>✓ Configuraciones personales</li>
                    <li>✓ Nada se envía a servidores externos</li>
                  </ul>
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      ⚠️ <strong>Importante:</strong> Si borras los datos del navegador, 
                      perderás todo el historial. Considera hacer backups exportando tus conversaciones.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">🎯 Características</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-semibold mb-2">🔐 Privacidad Total</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Tus datos nunca salen de tu computadora. Todo es local.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🔑 BYOK (Bring Your Own Key)</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Usa tus propias API keys. Paga solo lo que usas.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🌐 Multi-Proveedor</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        OpenAI, Anthropic, Google, Groq, Ollama - tú eliges.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">💰 Opciones Gratuitas</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Groq, Google Gemini y Ollama tienen tiers gratuitos.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">📱 PWA Ready</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Instálalo como aplicación en tu computadora.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🌍 Open Source</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Código abierto, auditable, y modificable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-3 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            ⚠️ Anonymous Open Source Project • No data collection • No backend • 
            <a href="https://github.com/anonymous/local-ai-assistant" className="ml-1 text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              View Source Code
            </a>
          </p>
          <p className="text-xs mt-1">
            Provided "AS IS" without warranty. You are responsible for your use of this tool.
          </p>
        </footer>
      </div>
    </div>
  );
}

// Bot icon component
function Bot({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

export default App;
