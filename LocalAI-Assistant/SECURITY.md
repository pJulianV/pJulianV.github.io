# Security Policy

## Anonymous Open Source Project

This is an anonymous, community-maintained open-source project. There is no official security team or dedicated maintainers.

## No Backend - No Server-Side Vulnerabilities

This application:
- ✅ Runs entirely in the browser (client-side only)
- ✅ Has no backend servers
- ✅ Stores no data on external servers
- ✅ Makes no tracking or analytics requests
- ✅ Only communicates directly with AI provider APIs (user's choice)

## Your Responsibility

### Protecting Your API Keys

**YOU are responsible for:**
- 🔑 Keeping your API keys secure
- 🔑 Not sharing your API keys
- 🔑 Rotating keys if compromised
- 🔑 Understanding that keys are stored in browser's LocalStorage
- 🔑 Clearing data if using a shared computer

### Browser Security

Your data is stored locally in:
- **LocalStorage**: API keys and settings
- **IndexedDB**: Conversation history

**Security Tips:**
- Use this app on trusted devices only
- Don't use on shared/public computers unless you clear data after
- Use browser's private/incognito mode for extra privacy
- Be aware that browser extensions can access LocalStorage/IndexedDB

## Reporting Vulnerabilities

### If You Find a Security Issue:

1. **Check if it's a real vulnerability:**
   - Does it affect the client-side code?
   - Is it a dependency vulnerability?
   - Does it expose user data?

2. **Open a GitHub Issue:**
   - Since this is an anonymous project, use GitHub Issues
   - Tag it with `security`
   - Provide details (but don't include exploit code if it's severe)

3. **Or Submit a PR:**
   - Fix it yourself and submit a pull request
   - Explain the vulnerability and your fix

### What We Can't Help With:

- ❌ API key leaks (you're responsible for your keys)
- ❌ Third-party AI service issues
- ❌ Browser security issues
- ❌ Your device being compromised
- ❌ Data loss from clearing browser storage

## Dependencies

This project uses npm packages. Vulnerabilities may exist in dependencies.

**To check for vulnerabilities:**
```bash
npm audit
```

**To fix (if possible):**
```bash
npm audit fix
```

## No Guarantees

This software is provided "AS IS" without warranty. Use at your own risk.

## Best Practices for Users

1. **Never share your API keys**
2. **Use strong API key rotation policies**
3. **Monitor your API usage on provider dashboards**
4. **Keep your browser updated**
5. **Use HTTPS (the app should be served over HTTPS)**
6. **Clear browser data if using shared computers**
7. **Review the open-source code yourself**

## Third-Party Services

When you use this app, you're directly communicating with:
- OpenAI API (if using OpenAI)
- Anthropic API (if using Anthropic)
- Google API (if using Google)
- Groq API (if using Groq)
- Ollama (local on your machine)

**Each provider has their own security policies. Review them:**
- OpenAI: https://openai.com/security
- Anthropic: https://www.anthropic.com/security
- Google: https://cloud.google.com/security
- Groq: https://groq.com/security/

## License

See [LICENSE](LICENSE) file. MIT License provides no warranty.

---

**Remember: This is an anonymous community project. No one is monitoring security. Contribute fixes if you find issues.**

Last Updated: January 2026
