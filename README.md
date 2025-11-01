# EventsApp

Web application for displaying events in different cities. Events are fetched from Facebook Graph API.

## Features

- 📍 City selection
- 📅 Event display in categories: Today, Tomorrow, This Weekend, This Month
- 🎨 View mode toggle (List/Grid)
- 📱 Responsive design

## Technologies

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

## Installation

```bash
npm install
```

Create `.env.local`:

```
FACEBOOK_ACCESS_TOKEN=your_access_token_here
```

Add Facebook Page IDs to `src/lib/facebook.ts`:

```typescript
const BRNO_CLUB_PAGES: string[] = ['page_id_1', 'page_id_2'];
```

## Running

```bash
npm run dev
```

Available at [http://localhost:3000](http://localhost:3000)

## Facebook API Setup

1. Create an app in [Meta for Developers](https://developers.facebook.com/)
2. Get an Access Token from [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
3. Required permissions:
   - `pages_read_engagement`
   - `pages_read_user_content`
4. Get Page ID for each club from their Facebook page
