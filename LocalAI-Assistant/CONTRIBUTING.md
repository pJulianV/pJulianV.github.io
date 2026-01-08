# Contributing to Local AI Assistant

🎉 ¡Gracias por considerar contribuir a este proyecto open source anónimo!

## ⚠️ Proyecto Anónimo

Este es un proyecto **mantenido anónimamente por la comunidad**:
- No hay desarrolladores específicos a contactar
- No hay soporte oficial
- Las contribuciones son revisadas por la comunidad
- Todo es voluntario y sin obligaciones

## 🤝 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug:

1. Verifica que no exista un issue similar
2. Abre un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots si es posible
   - Información del navegador/OS

### Sugerir Funcionalidades

¿Tienes una idea? ¡Genial!

1. Abre un issue con el tag `enhancement`
2. Describe la funcionalidad detalladamente
3. Explica por qué sería útil
4. Propón una implementación si tienes ideas

### Pull Requests

1. Fork el proyecto
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```
3. Realiza tus cambios
4. Asegúrate de que el código siga el estilo del proyecto
5. Prueba tus cambios localmente
6. Commit con mensajes descriptivos:
   ```bash
   git commit -m "feat: agregar soporte para Provider X"
   ```
7. Push a tu fork:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```
8. Abre un Pull Request

**Nota:** Dado que es un proyecto anónimo, los PRs pueden tardar en ser revisados. Ten paciencia.

### Convenciones de Código

- **TypeScript**: Usa tipos explícitos
- **React**: Componentes funcionales con hooks
- **Tailwind**: Usa clases de utilidad, evita CSS custom
- **Naming**: camelCase para variables, PascalCase para componentes

### Commit Messages

Usa el formato:
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` formateo, sin cambios de código
- `refactor:` refactorización de código
- `test:` agregar o corregir tests
- `chore:` mantenimiento

## 🎯 Áreas de Contribución

### Fácil
- Mejorar documentación
- Agregar traducciones
- Reportar bugs
- Mejorar UI/UX
- Corregir typos

### Medio
- Agregar nuevos proveedores de IA
- Implementar features del roadmap
- Optimizar rendimiento
- Agregar tests
- Mejorar seguridad

### Difícil
- Arquitectura de plugins
- Sistema de agentes
- Extensión de navegador
- App móvil nativa
- Funcionalidades avanzadas (transcripción de audio, análisis de imágenes)

## 📋 Setup de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar dev server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## 🧪 Testing

Actualmente no tenemos tests automatizados. Contribuciones para agregar testing son muy bienvenidas:
- Unit tests con Vitest
- Integration tests
- E2E tests con Playwright

## 🔒 Consideraciones de Seguridad

Al contribuir, ten en cuenta:
- Este es un proyecto client-side only (sin backend)
- Los usuarios son responsables de sus API keys
- No agregues tracking ni analytics
- No agregues dependencias innecesarias
- Revisa las dependencias por vulnerabilidades

## 📄 Licencia

Al contribuir, aceptas que tu código se licencie bajo MIT License (ver [LICENSE](LICENSE)).

## 🌍 Anonimato

- Puedes contribuir anónimamente
- No es necesario usar tu nombre real
- Usa cuentas anónimas de GitHub si lo prefieres
- Respetamos la privacidad de todos los contribuidores

## ❓ Preguntas

¿Dudas? 
- Abre un issue en GitHub
- Lee la documentación (README.md, LEGAL.md, SECURITY.md)
- Revisa issues existentes

**No hay contacto directo con "mantenedores" porque este es un proyecto comunitario anónimo.**

## 🚫 Qué NO Hacer

- ❌ No agregues tracking, analytics, o telemetría
- ❌ No agregues backend/servidores
- ❌ No hagas que la app envíe datos a servicios externos (excepto las APIs de IA que el usuario elija)
- ❌ No incluyas API keys en el código
- ❌ No violes los términos de servicio de terceros
- ❌ No agregues contenido ilegal o malicioso

## ✅ Qué SÍ Hacer

- ✅ Mejora la privacidad
- ✅ Agrega más proveedores de IA
- ✅ Mejora la UI/UX
- ✅ Optimiza el código
- ✅ Agrega documentación
- ✅ Corrige bugs
- ✅ Agrega tests

---

¡Gracias por hacer Local AI Assistant mejor para la comunidad! 🚀

**Recuerda: Este es un proyecto comunitario anónimo. Nadie es dueño, todos son bienvenidos a contribuir.**
