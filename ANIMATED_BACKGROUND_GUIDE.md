# Animated Background System

This guide explains the animated background system that has been implemented across your website using the exact design from your provided `shape-landing-hero.tsx` code.

## Overview

The animated background system provides a consistent, beautiful background across your entire website featuring:
- **Floating geometric shapes** with glass morphism effects
- **Multiple gradient colors** (indigo, rose, violet, amber, cyan)
- **Smooth entrance animations** with staggered timing
- **Continuous floating motion** for dynamic visual appeal
- **Dark theme base** (`bg-[#030303]`) with gradient overlays

## Implementation

### Global Background (Active Now)

The animated background is implemented as a **fixed background layer** in `App.tsx` that appears behind all content on every page:

```tsx
// In App.tsx - provides site-wide background
<AnimatedBackground className="fixed inset-0 z-0" />
```

### Component Structure

```tsx
import { AnimatedBackground } from "@/components/ui/animated-background";

<AnimatedBackground className="fixed inset-0 z-0" />
```

**Props:**
- `className`: Additional CSS classes (typically used for positioning)

## How It Works

### Background Features
1. **Base Layer**: Dark background (`bg-[#030303]`) with gradient overlay
2. **Animated Shapes**: 5 floating shapes with different:
   - Sizes (150px to 600px width)
   - Colors (indigo, rose, violet, amber, cyan gradients)
   - Positions (strategically placed across the viewport)
   - Rotation angles (from -25° to 20°)
   - Animation delays (0.3s to 0.7s staggered)

### Animation Details
- **Entrance Animation**: 2.4s duration with custom bezier easing
- **Floating Motion**: 12s infinite loop moving shapes up and down (15px range)
- **Glass Effects**: Backdrop blur, subtle borders, and radial gradients

### Shape Positioning
- **Top Left**: Large indigo shape (600×140px)
- **Top Right**: Small amber shape (200×60px)
- **Center Left**: Medium violet shape (300×80px)
- **Bottom Right**: Medium rose shape (500×120px)
- **Top Center**: Small cyan shape (150×40px)

## Content Integration

### Z-Index Management
- **Background**: `z-0` (fixed background layer)
- **Content**: `z-10` (all page content)
- **Navigation**: `z-20+` (navbar and UI elements)
- **Modals**: `z-30+` (overlays and modals)

### Styling Updates Made
1. **App.tsx**: Added fixed background layer
2. **Index.tsx**: Removed conflicting background styles, added `relative z-10`
3. **index.css**: Set body background to `transparent` to prevent conflicts

## Customization

### Shape Properties
Each shape can be customized with:
```tsx
<ElegantShape
    delay={0.3}              // Animation delay
    width={600}              // Shape width
    height={140}             // Shape height
    rotate={12}              // Rotation angle
    gradient="from-indigo-500/[0.15]"  // Gradient color
    className="left-[-10%] top-[20%]"   // Position
/>
```

### Available Gradients
- `from-indigo-500/[0.15]` - Blue shapes
- `from-rose-500/[0.15]` - Pink shapes
- `from-violet-500/[0.15]` - Purple shapes
- `from-amber-500/[0.15]` - Yellow shapes
- `from-cyan-500/[0.15]` - Cyan shapes

## Technical Details

### Performance
- Uses CSS transforms for smooth animations
- Backdrop-filter for modern blur effects
- Fixed positioning to minimize scroll reflows
- Optimized animation timing functions

### Browser Support
- Modern browsers with backdrop-filter support
- Graceful degradation on older browsers
- Responsive design with mobile-specific positioning

## Result

Your website now has a **consistent, animated background** that:
- ✅ Appears across all pages automatically
- ✅ Uses the exact design from your provided code
- ✅ Maintains performance with optimized animations
- ✅ Preserves all existing functionality
- ✅ Provides a cohesive visual experience

The background creates a **futuristic, professional atmosphere** that complements your portfolio content while ensuring excellent readability and user experience.