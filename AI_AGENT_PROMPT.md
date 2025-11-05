# 🤖 AI Agent Quick Start - InnerAnimal Toolbox

> **For: GitHub Copilot, Claude, ChatGPT, Cursor, and other AI coding assistants**

## 📋 Repo Overview

This is **InnerAnimal AI Toolbox** - a Next.js application with AI-powered developer tools. The goal: **let non-technical team members click buttons to generate code, configure APIs, and deploy applications** without needing to understand the underlying APIs.

## 🎯 Core Concept

Instead of teaching team members how to use Stripe, Supabase, Vercel APIs, etc., they click "Magic Buttons" that:
1. Ask what they need (natural language)
2. AI generates the code/configuration
3. System handles the technical implementation
4. Results are displayed in plain English

## 🏗️ Architecture

```
Next.js 15 + React 19 + TypeScript + Tailwind CSS
├── Server-side AI API routes (Claude/GPT)
├── Glassmorphic UI with sticky header
├── Magic buttons for AI-powered actions
└── Secure: All API calls server-side only
```

## 📁 Key Files

### **Most Important:**
- `components/Header/Header.tsx` - Main navigation with toolbox button
- `components/Toolbox/ToolboxModal.tsx` - AI tools modal
- `components/Toolbox/MagicButton.tsx` - Interactive AI-powered buttons
- `app/api/ai/magic/route.ts` - AI API endpoint
- `lib/ai.ts` - AI helper functions (Claude/GPT integration)

### **Configuration:**
- `.env.example` - Environment variable template
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Custom theme (teal, orange, purple, mint)

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 🔑 Environment Setup

Copy `.env.example` to `.env.local` and fill in:

**Required for AI features:**
- `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`

**Required for full functionality:**
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

**Optional (for extended features):**
- Stripe, Vercel, Cloudflare tokens

## 🎨 Design System

**Colors:**
- Teal: `#339999`
- Orange: `#FF6B35`
- Purple: `#9B59B6`
- Mint: `#4AECDC`

**UI Style:**
- Glassmorphism (backdrop-blur + transparency)
- Gradient backgrounds
- Smooth transitions (cubic-bezier)
- Responsive (mobile-first)

## 💡 How to Add Features

### Adding a New Magic Button:

1. **Add tool definition** in `components/Toolbox/ToolboxModal.tsx`:
```typescript
{
  id: 'new-feature',
  name: 'Feature Name',
  description: 'What it does',
  icon: '🎯',
  badge: 'AI',
  badgeColor: 'from-purple to-mint',
  action: 'new-action',
}
```

2. **Add handler** in `lib/ai.ts`:
```typescript
export async function handleNewAction(prompt: string): Promise<string> {
  // Use Claude/GPT to process the request
  const result = await anthropic.messages.create({...});
  return result;
}
```

3. **Add route case** in `app/api/ai/magic/route.ts`:
```typescript
case 'new-action':
  result = await handleNewAction(prompt);
  break;
```

### Adding a New Page:

```bash
# Create page file
touch app/new-page/page.tsx

# Add to navigation in components/Header/Header.tsx
{ href: '/new-page', label: 'New Page' }
```

## 🔐 Security Best Practices

**Already Implemented:**
- ✅ All AI API calls are server-side only
- ✅ Environment variables properly scoped (NEXT_PUBLIC vs private)
- ✅ No secrets in client code
- ✅ .env.local gitignored

**When Adding Features:**
- Never expose API keys to the browser
- Use server actions or API routes for sensitive operations
- Validate all user inputs
- Rate limit AI endpoints in production

## 🎯 Common Tasks

### **Task: "Add authentication"**
```typescript
// Use Supabase Auth (already configured in lib/supabase.ts)
import { supabase } from '@/lib/supabase';

// In a component:
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});
```

### **Task: "Add a new external tool link"**
```typescript
// In components/Toolbox/ToolboxModal.tsx, add to externalTools array:
{
  name: 'Tool Name',
  url: 'https://tool.com',
  icon: '🔧',
  badge: 'TN',
  badgeColor: 'bg-blue-500',
  description: 'What it does',
}
```

### **Task: "Customize the color theme"**
```css
/* In app/globals.css, update CSS variables: */
:root {
  --teal: #your-color;
  --orange: #your-color;
  /* etc. */
}
```

### **Task: "Make AI use GPT instead of Claude"**
```typescript
// In lib/ai.ts, swap the order of preference:
// Put openai check before anthropic check
if (openai) { /* use OpenAI */ }
else if (anthropic) { /* fallback to Claude */ }
```

## 🐛 Troubleshooting

**Issue: "AI features not working"**
- Check `.env.local` has valid `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`
- Restart dev server after env changes
- Check API key has sufficient credits

**Issue: "Supabase errors"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project is running
- Verify RLS policies if using auth

**Issue: "Build errors"**
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors: `npm run type-check`
- Clear `.next` folder: `rm -rf .next && npm run dev`

## 📚 Tech Stack References

- **Next.js 15:** https://nextjs.org/docs
- **React 19:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Anthropic Claude:** https://docs.anthropic.com/
- **OpenAI:** https://platform.openai.com/docs
- **Supabase:** https://supabase.com/docs
- **Vercel Deployment:** https://vercel.com/docs

## 🎓 Project Goals

1. **Simplify complex tasks** - Non-technical users can build features
2. **AI-first approach** - Let AI handle the technical details
3. **Beautiful UX** - Glassmorphism, smooth animations, responsive
4. **Production-ready** - Proper error handling, security, performance
5. **Extensible** - Easy to add new tools and features

## 💬 Quick Prompt Templates

**For adding features:**
> "Add a new magic button that [does X]. It should use AI to [generate Y] and display the result in the modal."

**For fixing bugs:**
> "The [component name] is throwing [error]. Check [file path] and fix the issue while maintaining the existing functionality."

**For styling:**
> "Update the [component] styling to match the glassmorphism design system. Use the existing color variables (teal, orange, purple, mint)."

**For API integration:**
> "Add a new API route that connects to [service]. Use the existing pattern in app/api/ai/magic/route.ts as a reference. Ensure all sensitive operations are server-side."

## 🎯 Success Criteria

When working with this repo, you should be able to:
- ✅ Understand the file structure immediately
- ✅ Add new magic buttons in under 5 minutes
- ✅ Customize styling without breaking existing design
- ✅ Deploy to Vercel with one command
- ✅ Know where to find any functionality

---

**🤖 You're now ready to work on the InnerAnimal AI Toolbox!**

For questions or issues, check the main README.md or consult the code comments.
