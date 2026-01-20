# Nuxt App

Modern Vue 3 frontend SPA built with Nuxt 4 and Nuxt UI Pro.

## Prerequisites

- Node.js 24.0.0 or higher
- npm

## Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
nuxt-app/
├── app/
│   ├── app.config.ts          # Application config
│   ├── app.vue                # Root component
│   ├── assets/                # CSS and static assets
│   ├── layouts/               # Page layouts
│   └── pages/                 # Route pages
├── public/                    # Static files
├── .env                       # Environment variables
└── nuxt.config.ts             # Nuxt configuration
```

## Configuration

Create `.env` file with:

```env
NUXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

## Development

### Common Tasks

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

### Customization Points

- **Styling:** Modify `app/assets/css/main.css` for global styles
- **Layout:** Edit `app/layouts/default.vue` for default layout
- **Routes:** Add pages in `app/pages/` (file-based routing)
- **Config:** Update `nuxt.config.ts` for Nuxt settings
- **Backend URL:** Change `NUXT_PUBLIC_BACKEND_URL` in `.env`

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 24.0.0+ | Runtime |
| Nuxt | ^4.0.1 | Framework |
| Vue | 3 | UI Framework |
| Nuxt UI Pro | ^3.3.0 | Component library |
| TypeScript | - | Type safety |
| Tailwind CSS | - | Styling |

## Troubleshooting

**Cannot connect to backend:**

Check that:
1. `NUXT_PUBLIC_BACKEND_URL` in `.env` points to your backend
2. Backend is running on the specified port
3. CORS is configured correctly in backend

**Module resolution errors:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**

```bash
rm -rf .nuxt .output
npm run dev
```

## Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org)
- [Nuxt UI Pro](https://ui.nuxt.com/pro)
- [Tailwind CSS](https://tailwindcss.com)
