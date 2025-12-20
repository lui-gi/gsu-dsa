# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GSU DSA is a static educational website for Georgia State University students taking CS 2720 / Data Structures. The project provides interactive visualizations for data structures and algorithms covered in Dr. Islam's course, with a PlayStation-inspired navigation interface.

## Architecture

### Navigation System (index.html)

The main entry point features a PlayStation XMB-style menu system with:

- **Horizontal Navigation**: Category selection (Settings, Photo, Music, Video, Game, Network, PSN)
- **Vertical Navigation**: Item selection within each category
- **Visual System**: CSS custom properties control layout (icon size, spacing, positioning)
- **State Management**: Pure JavaScript manages `currentCat` and `currentItem` indices
- **Key Constants**:
  - `ICON_SPACING`: 200px - horizontal distance between category icons
  - `ITEM_HEIGHT`: 80px - vertical spacing for menu items
  - `--selection-gap`: 180px - CSS variable for active item offset

**Navigation Logic**: The active item uses `margin-top: var(--selection-gap)` to create visual space for the category icon to sit in. When navigating vertically, `col.style.transform = translateY(${scrollY}px)` scrolls the item list while the gap creates the signature look.

### Data Structure Visualizations (structures/)

Each visualization is a self-contained HTML file with embedded CSS and JavaScript.

**Example: heap.html**

- **Glass Morphism Design**: GSU blue color palette (`--gsu-blue: #0039A6`) with backdrop-filter blur effects
- **Dual Visualization**:
  - Canvas-based tree view with pan/zoom (mouse drag, scroll wheel, touch gestures)
  - Array representation showing heap structure with index labels
- **Animation Queue System**: Operations (insert, remove, heapify) push animation steps to `animationQueue`, then `runAnimation()` processes them sequentially
- **State Variables**:
  - `heap`: array storing heap values
  - `isMaxHeap`: boolean for min/max heap type
  - `scale`, `offsetX`, `offsetY`: pan/zoom transformation state
  - `isDragging`: mouse interaction state
- **Key Functions**:
  - `insert(value)`: Adds value and bubbles up, recording animation steps
  - `removeRoot()`: Removes root and sinks down, recording animation steps
  - `buildHeap(arr)`: Heapifies array using heapifyDown
  - `runAnimation()`: Processes animation queue with timing and visual updates
  - `drawTree(step, movingNodes)`: Renders tree with canvas transformations
  - `calculatePositions(count)`: Recursively calculates node positions

**Canvas Transform Pattern**: All drawing operations are wrapped in `ctx.save()` / `ctx.restore()` with `ctx.translate(offsetX, offsetY)` and `ctx.scale(scale, scale)` applied for pan/zoom.

## File Structure

```
/
├── index.html          # PlayStation-style navigation menu
├── structures/
│   └── heap.html      # Heap visualization (others planned)
└── assets/
    ├── css/           # Empty (styles inline for now)
    ├── js/            # Empty (scripts inline for now)
    └── images/        # Empty (placeholder for future assets)
```

## Development Workflow

### Opening/Testing

Open HTML files directly in a browser. No build process or server required.

### Adding New Data Structures

1. Create new HTML file in `structures/` directory
2. Follow heap.html pattern:
   - Include GSU color palette CSS variables
   - Implement glass morphism styling
   - Use animation queue pattern for operation visualization
   - Support both tree/graph view and array representation where applicable
3. Add navigation entry in index.html `menuData` array

### Design Patterns

**Animation Queue Pattern**: Instead of direct DOM manipulation, queue animation steps with metadata:
```javascript
animationQueue.push({
  type: 'swap',           // Animation type
  heapSnapshot: [...],    // Data snapshot
  targets: [i, j],        // Highlighted indices
  swapIndices: [i, j]     // For position interpolation
});
```

**Canvas Pan/Zoom Pattern**: Track offset and scale state, apply transformations in drawing function:
```javascript
ctx.save();
ctx.translate(offsetX, offsetY);
ctx.scale(scale, scale);
// ... draw operations ...
ctx.restore();
```

**Glass Morphism Styling**: Use layered approach:
```css
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(40px) saturate(180%);
border: 1px solid rgba(0, 57, 166, 0.1);
box-shadow: 0 8px 32px rgba(0, 57, 166, 0.08);
```

## Git Workflow

Recent commits show a "started from scratch" approach after initial React + TypeScript attempt. Current implementation uses vanilla HTML/CSS/JS for simplicity.

When committing, follow the existing style: short, descriptive messages in lowercase.

## Design Constraints

- **GSU Colors**: Blue (#0039A6) primary, Red (#CC0000) for highlights
- **Self-Contained Files**: Each visualization should work standalone
- **No Dependencies**: Pure HTML/CSS/JS, no frameworks or build tools
- **Mobile Support**: Touch events for pan/zoom on visualizations
- **Accessibility**: High contrast, readable font sizes (18px+ for body text)
