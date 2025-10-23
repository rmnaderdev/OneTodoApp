# Copilot Instructions for OneTodoApp (Next.js)

## Project Overview
- This repo contains multiple sub-projects for a basic todo app, each in a different tech stack. The `one-todo-app-nextjs` folder is a Next.js 16 app using React 19 and TypeScript.
- The goal is to explore and compare implementations across frameworks. Each subfolder is a separate stack.

## Architecture & Patterns
- Uses Next.js App Router (`src/app/`), with `layout.tsx` for global layout and `page.tsx` for the main page.
- Styling is via Tailwind CSS (see `globals.css`, `postcss.config.mjs`, and Tailwind in `devDependencies`).
- Fonts are loaded using `next/font` (Geist, Geist_Mono) and set as CSS variables in `layout.tsx`.
- No backend or API routes are present yet; all logic is currently client-side.
- The app is scaffolded with `create-next-app` and follows Next.js conventions for file structure and routing.

## Developer Workflows
- **Start dev server:** `pnpm dev` (or `npm run dev`, `yarn dev`, `bun dev`)
- **Build:** `pnpm build` (or `npm run build`)
- **Lint:** `pnpm lint` (uses ESLint with Next.js and TypeScript configs)
- **Type checking:** TypeScript is strict; see `tsconfig.json` for config and path aliases (`@/*` → `src/*`).
- **Styling:** Tailwind classes are used throughout; update `globals.css` for global styles.

## Conventions & Custom Rules
- ESLint config is in `eslint.config.mjs`, extending Next.js core web vitals and TypeScript rules. Default ignores are overridden.
- All new pages/components should be placed in `src/app/` following Next.js App Router conventions.
- Use functional React components and TypeScript for all new code.
- Prefer Tailwind for styling; avoid custom CSS unless necessary.
- Use `next/font` for font management.

## Integration Points
- No authentication, API, or database integration yet. Future stacks may add these.
- Images and static assets go in `public/`.
- For cross-stack conventions, see root `README.md` for requirements and planned features.

## Key Files & Directories
- `src/app/layout.tsx`: Global layout, font setup
- `src/app/page.tsx`: Main page, starting point for UI
- `globals.css`: Global styles
- `package.json`: Scripts, dependencies
- `tsconfig.json`: TypeScript config, path aliases
- `eslint.config.mjs`: Linting rules
- `postcss.config.mjs`: Tailwind/PostCSS config
- `README.md` (root and subproject): Project goals, requirements

## Example Patterns
- Font setup:
  ```tsx
  import { Geist, Geist_Mono } from "next/font/google";
  const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
  ```
- Page structure:
  ```tsx
  export default function Home() {
    return <div>...</div>;
  }
  ```

---

If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.