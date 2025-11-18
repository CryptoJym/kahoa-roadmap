# Kahoa Gamma Presentation Generation Guide

## Theme Created
A complete Kahoa-branded theme has been created in `/Users/jamesbrady/kahoa-gamma-theme.json`

## How to Generate the Presentation

### Option 1: Using Codex (Recommended - Has Gamma MCP Access)

1. Open Codex
2. Use this prompt:

```
Using the Gamma MCP, create a presentation about Kahoa's AI training services with these settings:

**Theme & Design:**
- Primary color: #000000 (black)
- Secondary color: #1955ED (blue)
- Background: #FFFFFF (white)
- Style: Modern, minimalist, tech-focused
- Layout: 16:9, 10 cards

**Content Direction:**
- Topic: "Mastering AI: From Skill to Business Impact"
- Tone: Professional, authoritative, pragmatic
- Key message: "AI isn't magic. It's a skill."
- Focus areas:
  - Practical AI skill development
  - Enterprise-ready AI training
  - Role-specific learning paths
  - Team empowerment
  - Measurable AI integration

**Imagery:**
- AI-generated images
- Style: Professional, tech-focused, modern office
- Visual elements: Clean, minimalist

**Gamma Settings:**
- Format: presentation
- Text mode: generate
- Text amount: medium
- Card dimensions: 16:9
- Number of cards: 10
```

### Option 2: Direct API Call

If you have the Gamma API key (`sk-gamma-8lq4gkTyYe0o57pkuMT0SPUnXGql89e9fsn2Fq37JA`):

```bash
curl -X POST https://api.gamma.app/api/generate \
  -H "Authorization: Bearer sk-gamma-8lq4gkTyYe0o57pkuMT0SPUnXGql89e9fsn2Fq37JA" \
  -H "Content-Type: application/json" \
  -d '{
    "input_text": "Create a presentation about Kahoa AI training services focusing on practical skill development",
    "format": "presentation",
    "text_mode": "generate",
    "text_amount": "medium",
    "tone": "professional",
    "image_source": "aiGenerated",
    "image_style": "professional, tech-focused, modern office",
    "card_dimensions": "16:9",
    "num_cards": 10,
    "theme": {
      "primary_color": "#000000",
      "secondary_color": "#1955ED",
      "background_color": "#FFFFFF"
    }
  }'
```

### Option 3: Manual Theme Application in Gamma.app

1. Go to https://gamma.app
2. Create new presentation
3. Apply custom theme:
   - Primary: Black (#000000)
   - Accent: Blue (#1955ED)
   - Background: White (#FFFFFF)
4. Use modern sans-serif fonts (Inter/Helvetica)
5. Add content about Kahoa's AI training

## Expected Output

A 10-card presentation with:
- Clean, minimalist design
- Black and blue color scheme
- Professional imagery
- Content about AI skill development
- Kahoa brand personality throughout

## Theme Reference

See `/Users/jamesbrady/kahoa-gamma-theme.json` for complete brand specifications including:
- Color palette
- Typography guidelines
- Design principles
- Visual elements
- Brand personality traits
- Content themes

---

**Status:** Theme specification complete ✅
**Next:** Generate presentation using one of the options above
**Created:** 2025-10-01
