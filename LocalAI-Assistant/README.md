# 🤖 Local AI Assistant

<div align="center">

![Local AI Assistant](https://img.shields.io/badge/AI-Assistant-blue)
![Privacy First](https://img.shields.io/badge/Privacy-First-green)
![Open Source](https://img.shields.io/badge/Open-Source-orange)
![BYOK](https://img.shields.io/badge/BYOK-Enabled-purple)

**Tu compañero de IA completamente privado y agnóstico al proveedor**

[Características](#características) • [Instalación](#instalación) • [Uso](#uso) • [Legal](#-disclaimer-legal) • [Contribuir](#contribuir)

</div>

---

## ⚖️ DISCLAIMER LEGAL

**IMPORTANTE - LEE ESTO PRIMERO:**

Esta es una herramienta de código abierto proporcionada "TAL CUAL" sin ninguna garantía. Al usar esta aplicación:

- ✅ **Tú eres el único responsable** del uso que le des a la herramienta
- ✅ **Tú eres responsable** de cumplir con los términos de servicio de los proveedores de IA
- ✅ **Tú eres responsable** de proteger tus API keys y datos
- ✅ **Los desarrolladores NO son responsables** de mal uso, pérdida de datos, costos incurridos, o cualquier daño
- ✅ **Esta herramienta NO recopila, almacena ni transmite** tus datos a servidores de terceros
- ✅ **Es tu responsabilidad** asegurar que tu uso cumple con las leyes locales

**No proporcionamos ningún servicio backend, no tenemos servidores, y no podemos acceder a tus datos.**

---

## 🌟 ¿Qué es Local AI Assistant?

Local AI Assistant es una aplicación web de código abierto que te permite interactuar con múltiples proveedores de IA mientras mantienes el **control total** de tu privacidad y datos. No cobramos suscripciones, no almacenamos tus datos en nuestros servidores, y tú decides qué proveedor usar.

### 🎯 Características Principales

#### 🔐 Privacidad Absoluta
- **100% Local**: Todo el historial y datos se guardan en tu navegador (IndexedDB)
- **Cero servidores intermedios**: Tus mensajes van directamente a los proveedores de IA
- **Sin tracking**: No recopilamos analíticas ni telemetría
- **Auditable**: Código abierto para tu tranquilidad

#### 🔑 BYOK (Bring Your Own Key)
- **Usa tus propias API keys** de cualquier proveedor
- **Paga solo lo que usas** directamente al proveedor
- **Sin suscripciones mensuales** de nuestra parte
- **Cambia de proveedor** cuando quieras

#### 🌐 Multi-Proveedor

Soportamos los principales proveedores de IA:

| Proveedor | Modelos | Tier Gratuito | Notas |
|-----------|---------|---------------|-------|
| **OpenAI** | GPT-4, GPT-3.5 | ❌ | El más popular |
| **Anthropic** | Claude 3 (Opus, Sonnet, Haiku) | ❌ | Excelente para razonamiento |
| **Google** | Gemini Pro, Gemini Pro Vision | ✅ | Tier gratuito generoso |
| **Groq** | Mixtral, Llama2 | ✅ | Inferencia ultra rápida |
| **Ollama** | Llama2, Mistral, CodeLlama | ✅ | 100% local y privado |

#### ✨ Funcionalidades

- 💬 **Chat inteligente** con soporte para múltiples conversaciones
- 📝 **Markdown rendering** para respuestas formateadas
- 🌓 **Modo oscuro/claro** automático
- 💾 **Historial persistente** en tu navegador
- 🔄 **Cambio dinámico** entre proveedores y modelos
- 📱 **Responsive design** para móvil y desktop
- ⚡ **Streaming de respuestas** (próximamente)

---

## 🚀 Instalación

### Opción 1: Build y Deploy Tú Mismo

Puedes hacer build del proyecto y desplegarlo en cualquier hosting estático (Vercel, Netlify, GitHub Pages, tu propio servidor, etc.).

```bash
npm run build
# Los archivos estarán en la carpeta dist/
```

La aplicación funciona completamente en el navegador del usuario. No requiere backend.

### Opción 2: Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/yourusername/local-ai-assistant.git
cd local-ai-assistant

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Opción 3: Docker

```bash
# Construir la imagen
docker build -t local-ai-assistant .

# Ejecutar el contenedor
docker run -p 3000:3000 local-ai-assistant
```

---

## 📖 Uso

### 1. Configura tus API Keys

1. Ve a la sección **"Configuración"**
2. Elige el proveedor que prefieras
3. Ingresa tu API key (se guarda localmente en tu navegador)
4. ¡Listo para chatear!

### 2. Obtén tus API Keys

#### OpenAI
- Visita: https://platform.openai.com/api-keys
- Crea una cuenta y genera una API key
- Precio: Pay-as-you-go (~$0.002 por 1K tokens con GPT-3.5)

#### Anthropic (Claude)
- Visita: https://console.anthropic.com/settings/keys
- Crea una cuenta y genera una API key
- Precio: Pay-as-you-go (~$0.003 por 1K tokens)

#### Google (Gemini) - ✅ GRATIS
- Visita: https://makersuite.google.com/app/apikey
- Genera una API key gratuita
- Incluye: 60 peticiones por minuto gratis

#### Groq - ✅ GRATIS
- Visita: https://console.groq.com/keys
- Crea una cuenta y genera una API key
- Incluye: Tier gratuito con límites generosos

#### Ollama - ✅ GRATIS Y LOCAL
- Descarga: https://ollama.ai/download
- Instala Ollama en tu computadora
- Ejecuta: `ollama run llama2`
- No requiere API key ni internet

### 3. Comienza a Chatear

1. Selecciona tu proveedor y modelo preferido
2. Escribe tu mensaje
3. ¡Disfruta de conversaciones privadas con IA!

---

## 🏗️ Arquitectura

```
LocalAI-Assistant/
├── src/
│   ├── components/         # Componentes React
│   │   ├── APIKeyManager.tsx
│   │   ├── ChatInterface.tsx
│   │   └── Sidebar.tsx
│   ├── services/          # Servicios de integración
│   │   └── aiService.ts   # Lógica de comunicación con APIs
│   ├── db/                # Base de datos local
│   │   └── database.ts    # IndexedDB con Dexie
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── public/                # Recursos estáticos
├── package.json
├── vite.config.ts
└── README.md
```

### Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: IndexedDB (vía Dexie.js)
- **Icons**: Lucide React
- **Markdown**: markdown-it

---

## 🔒 Privacidad y Seguridad

### ¿Qué guardamos?

- ✅ Tus conversaciones (en tu navegador)
- ✅ Tus API keys (en tu navegador, localStorage)
- ✅ Tus preferencias (tema, modelo favorito, etc.)

### ¿Qué NO guardamos?

- ❌ Nada en nuestros servidores (no tenemos backend)
- ❌ No hacemos tracking ni analíticas
- ❌ No compartimos datos con terceros
- ❌ No tenemos acceso a tus API keys

### Comunicación

```
Tu Navegador → Proveedor de IA (OpenAI/Anthropic/etc.)
    ↑
    └── Sin intermediarios
```

Tus mensajes van **directamente** desde tu navegador al proveedor que elijas. No pasan por nuestros servidores.

---

## 🛠️ Desarrollo

### Requisitos

- Node.js 18+
- npm o yarn

### Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

### Variables de Entorno

No se requieren variables de entorno. Todo es configurado por el usuario en la interfaz.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto es para la comunidad, por la comunidad.

### Cómo Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Ideas para Contribuir

- 🎤 Agregar soporte para transcripción de audio
- 📷 Implementar captura de pantalla para análisis
- 📊 Visualización de uso de tokens/costos
- 🌍 Traducciones a más idiomas
- 🔌 Integración con más proveedores (Cohere, HuggingFace, etc.)
- 📱 Mejorar la experiencia móvil
- 🎨 Temas personalizados

---

## 📋 Roadmap

### v1.0 (Actual)
- ✅ Chat básico
- ✅ Multi-proveedor (OpenAI, Anthropic, Google, Groq, Ollama)
- ✅ Almacenamiento local
- ✅ Gestión de API keys
- ✅ Historial de conversaciones

### v1.1 (Próximamente)
- 🔄 Streaming de respuestas
- 📊 Contador de tokens y costos
- 🎤 Transcripción de audio (reuniones)
- 📷 Captura de pantalla
- 📁 Exportar conversaciones

### v2.0 (Futuro)
- 🤖 Agentes personalizados
- 🔌 Sistema de plugins
- 📱 Aplicación móvil nativa
- 🌐 Extensión de navegador
- 🎯 Plantillas de prompts

---

## ❓ FAQ

### ¿Es realmente gratis?

La aplicación es gratuita y de código abierto. Sin embargo, necesitas tus propias API keys de los proveedores, y ellos cobran por el uso. Algunos proveedores como Groq, Google Gemini y Ollama tienen tiers gratuitos.

### ¿Mis datos están seguros?

Sí. Todo se guarda en tu navegador usando IndexedDB. No tenemos servidores backend, por lo que no podemos acceder a tus datos ni aunque quisiéramos.

### ¿Puedo usar esto sin conexión?

Si usas Ollama (modelos locales), puedes usar la aplicación completamente offline. Para otros proveedores necesitas internet.

### ¿Funciona en móvil?

Sí, la interfaz es responsive y funciona en móviles y tablets.

### ¿Puedo autohostearlo?

¡Absolutamente! Clona el repo, haz build, y despliega en cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.).

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [OpenAI](https://openai.com) por GPT
- [Anthropic](https://anthropic.com) por Claude
- [Google](https://ai.google.dev/) por Gemini
- [Groq](https://groq.com) por su increíble velocidad
- [Ollama](https://ollama.ai) por hacer la IA local accesible
- A toda la comunidad open source

---

## 📞 Contribuciones

Este es un proyecto open source anónimo. Las contribuciones son bienvenidas a través de:

- Pull Requests en GitHub
- Issues para reportar bugs o sugerir funcionalidades
- Fork del proyecto para crear tu propia versión

**Nota:** Este es un proyecto mantenido por la comunidad de forma anónima. No hay contacto directo con desarrolladores específicos.

---

<div align="center">

**Proyecto Open Source Anónimo**

Made with ❤️ by the community, for the community

**Sin recolección de datos • Sin tracking • Sin backend • 100% en tu navegador**

</div>
