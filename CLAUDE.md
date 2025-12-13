# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a data structures and algorithms visualization project for Georgia State University (GSU). The project consists of two main parts:

1. **Standalone HTML Visualizations** (`/visualizations/`): Self-contained HTML files with embedded CSS/JavaScript for visualizing various data structures and algorithms
2. **React + Vite Application** (`/src/`): A modern web application shell built with React 19, TypeScript, and Vite 7

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (React app on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Lint code
npm run lint
```

## Architecture

### Dual-Application Structure

The repository contains two distinct presentation layers:

1. **Visualizations Directory** (`/visualizations/`)
   - Standalone HTML files that can be opened directly in browsers
   - Each file is a complete, self-contained visualization with inline CSS and JavaScript
   - No build process required for these files
   - Main landing page: `visualizations/index.html` provides a retro-styled interface to navigate between visualizations
   - Examples: `avl.html`, `heap.html`, `dijkstra.html`, `trie.html`, `graphs.html`, `countingsort.html`, `radix.html`, `kway.html`

2. **React Application** (`/src/`)
   - Currently uses the Vite + React template as a starting point
   - Entry point: `src/main.tsx` renders `src/App.tsx` into `index.html`
   - May be intended to eventually integrate or replace the standalone visualizations

### Styling Approach

The visualizations use a consistent GSU color palette defined in CSS custom properties:
```css
--gsu-blue: #0039A6;
--gsu-dark: #1f2a36;
--gsu-gray: #777777;
--light-bg: #f4f4f4;
--highlight: #CC0000;
--success: #28a745;
```

The main index uses a retro/vaporwave aesthetic with Press Start 2P font and VT323 font families.

## TypeScript Configuration

The project uses strict TypeScript settings with:
- Target: ES2022
- JSX: react-jsx (React 19)
- Strict mode enabled
- No unused locals or parameters allowed
- Module resolution: bundler mode

## Important Context

- The React application (`/src/`) is currently minimal boilerplate and may not be the primary focus
- The actual educational content lives in `/visualizations/` as standalone HTML files
- When working on visualizations, changes are made directly to the HTML files without a build step
- The project uses modern React 19 features in the React portion
