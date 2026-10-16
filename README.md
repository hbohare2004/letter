# A Little Letter for her 💌

A dreamy, responsive romantic letter website built with Next.js, Tailwind CSS v4, and Framer Motion.

## Features

- Animated envelope and heart seal
- Click-to-reveal love letter
- Floating hearts in the background
- Responsive layout for phones, tablets, and desktops
- Reduced-motion preference support
- Accessible button labels and keyboard focus styles
- Ready to deploy to Vercel

## Requirements

- Node.js 20.9 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize the letter

Open `app/page.tsx` and edit the paragraphs inside the `letter-body` section. You can also change the greeting and sign-off there.

To change the site title and description, edit `metadata` in `app/layout.tsx`.

## Deploy to Vercel

1. Create a GitHub repository and push this project.
2. Go to [Vercel](https://vercel.com/) and import the repository.
3. Keep the default Next.js framework settings.
4. Click **Deploy**.

No environment variables are required.

## Notes

Google Fonts are loaded through `next/font/google` during the build. If deploying in a restricted network environment, ensure the build environment can fetch Google Fonts, or switch to locally hosted fonts.
