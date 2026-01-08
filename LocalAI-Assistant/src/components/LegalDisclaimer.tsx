import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function LegalDisclaimer() {
  const [accepted, setAccepted] = useState(false);
  const [hasSeenDisclaimer, setHasSeenDisclaimer] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('legal-disclaimer-accepted');
    if (seen === 'true') {
      setHasSeenDisclaimer(true);
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('legal-disclaimer-accepted', 'true');
    setAccepted(true);
    setHasSeenDisclaimer(true);
  };

  if (hasSeenDisclaimer) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-bold">Legal Disclaimer</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="font-semibold mb-2">⚠️ IMPORTANTE - LEE ESTO PRIMERO</p>
              <p className="text-gray-700 dark:text-gray-300">
                Esta es una herramienta de código abierto anónima proporcionada "TAL CUAL" sin ninguna garantía.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Al usar esta aplicación, aceptas que:</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Tú eres el único responsable</strong> del uso que le des a esta herramienta</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Tú eres responsable</strong> de cumplir con los términos de servicio de los proveedores de IA (OpenAI, Anthropic, Google, etc.)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Tú eres responsable</strong> de proteger tus API keys y datos personales</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Los desarrolladores NO son responsables</strong> de mal uso, pérdida de datos, costos incurridos, o cualquier daño</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Esta herramienta NO recopila, almacena ni transmite</strong> tus datos a servidores de terceros</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="font-semibold mb-2">🔒 Privacidad Total</p>
              <p className="text-gray-700 dark:text-gray-300">
                Esta aplicación NO tiene backend. Todo funciona en tu navegador. 
                Tus conversaciones y API keys se guardan localmente usando IndexedDB. 
                Nunca enviamos datos a nuestros servidores porque <strong>no tenemos servidores</strong>.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="font-semibold mb-2">❌ Usos Prohibidos</p>
              <p className="text-gray-700 dark:text-gray-300 text-xs">
                No uses esta herramienta para actividades ilegales, violar términos de servicio de terceros, 
                generar contenido dañino, acoso, o cualquier propósito que viole las leyes aplicables.
              </p>
            </div>

            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <p>• Este es un proyecto open source <strong>anónimo</strong></p>
              <p>• No hay soporte oficial disponible</p>
              <p>• Se proporciona sin garantías de ningún tipo</p>
              <p>• Lee el archivo LEGAL.md completo en el repositorio para más detalles</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Acepto los Términos y Comprendo los Riesgos
            </button>
          </div>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Al hacer clic en "Acepto", confirmas que has leído y entendido este disclaimer legal.
          </p>
        </div>
      </div>
    </div>
  );
}
