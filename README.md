# True Ink Studio - Next.js Demo

This is a minimal scaffold for a landing/portfolio site using Next.js + Tailwind + Swiper. It's intended as a starting point you can connect to a headless CMS (Sanity/Strapi) later.

What is included
- Next.js pages-based app
- Tailwind CSS config
- Hero, Navbar, Gallery (Swiper) and Contact form (API route logs to console)

Quick start (Windows PowerShell):

```powershell
cd e:/TemplateWebsite
npm install
npm run dev
```

Notes
- Add your images in `public/images/` with names `hero.jpg`, `photo1.jpg`, etc.
- To connect Sanity: create a Sanity project, then replace the `mockPhotos` and any hard-coded content with fetches to Sanity's Content API (or use GROQ + @sanity/client).
- For production email, replace the `pages/api/contact.js` handler to use SendGrid/Mailgun or store submissions in a DB.
- Deploy to Vercel for easiest hosting (connect repo and push).

Next steps I can do for you
- Integrate Sanity schema and live content fetching.
- Add i18n support.
- Improve animations/UX to match your screenshot more closely.

