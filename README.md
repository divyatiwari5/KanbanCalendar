# Kanban Calendar

A modern, interactive calendar application with kanban-style drag-and-drop capabilities for managing events.

## Live Demo

Check out the live application: [https://kanban-calendar.vercel.app/](https://kanban-calendar.vercel.app/)

## About The Project

This Kanban Calendar is a responsive web application built with Next.js that allows users to:
- View and interact with a weekly calendar interface
- Drag and drop events to reschedule them
- Smooth navigation between days by swiping left and right on mobile 
- Smooth navigation between days by selecting any date on mobile 
- View detailed information about events when clicked
- Navigate between weeks with intuitive controls

## Development Approach

### Technologies Used
- **Next.js 15** - React framework with App Router
- **React 19** - UI component library
- **TypeScript** - For type safety and code quality
- **Tailwind CSS** - For styling and responsive design
- **Framer Motion** - For smooth animations and transitions
- **Hello Pangea DND** - For drag and drop functionality
- **Date-fns** - For date manipulation and formatting

### Architecture
- **Component-Based Structure**: The app is built using reusable React components
- **Client-Side Navigation**: Using Next.js App Router for smooth transitions
- **Responsive Design**: Adapts to different screen sizes with mobile-first approach
- **Data Management**: Currently uses mock data with a flexible structure for easy integration with a backend

### Key Features
- Interactive weekly calendar view
- Animated event details modal
- Smooth navigation between days by swiping left and right on mobile 
- Smooth navigation between days by selecting any date on mobile 
- Drag and drop event scheduling
- Responsive UI for desktop and mobile devices

## Future Scope

### Enhanced Drag and Drop Experience
- Optimize touch interactions for mobile devices
- Implement smoother animations during dragging operations
- Add haptic feedback for drag operations on supporting devices
- Implement custom drag handles and drop indicators
- Add support for multi-day event scheduling through drag operations
- Introduce snap-to-grid functionality for more precise time scheduling

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

