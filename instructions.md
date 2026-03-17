# FRONTEND ASSIGNMENT Self-Sufficient / Local-First 

## SCENARIO: 
"You are building the UI for a massive government business registration portal. Government APIs are notoriously slow and occasionally fail. Furthermore, citizens often have unstable internet connections. You must build a Next.js (App Router) interface that feels instantaneous, prevents unnecessary re-renders, and protects the user's data even if the backend is completely offline. 

The Goal: You are tasked with building a highly performant, offline-resilient frontend application that translates a strict Figma design system into scalable Next.js code. 

The "Zero-Resource" Constraint: You must not connect this application to any external database or backend service (e.g., Firebase, Supabase, or AWS). Your submission must run perfectly on a reviewer's local machine using only `npm install` and `npm run dev`. 

## Phase 1: The Design System & UI (The "Paint") 
Before building complex logic, you must establish the foundational UI architecture. We have provided a design for a single UI page, along with a simple design system (colors and typography) embedded in the file. 

**Your Tasks:**
- Token Extraction: Inspect the Figma file and extract the defined design tokens (colors, typography, spacing). Configure these tokens dynamically in your tailwind.config.ts (or CSS modules). Do not hardcode hex values directly into your components. 
- Pixel-Perfect Translation: Build the whole Assessment UI page as a responsive Next.js component. It must break down flawlessly to different Desktop layout (And to functional Mobile layout if possible) 
- Reusable Components: Construct the buttons, text inputs, and typography elements so they can be reused globally across the rest of the application. 

## Phase 2: The "Offline-Resilient" E-Procurement Wizard (The "Engine") 
Using the exact design tokens, styling, and reusable input components you established in Phase 1, you will now build the core logic: a 3-step business registration wizard. 

**Your Tasks:**
- **The Multi-Step Flow:**
  - Step 1: Business Details (Business Name, Tax ID, Official Address).
  - Step 2: Board of Directors. This must be a dynamic list where the user can click "Add Director" up to 10 times.
  - Step 3: Review and Submit. 
- **Performance (Critical Pass/Fail):** You must use React Hook Form, Zustand, or a highly optimized Context setup. If typing a single character into the "Business Name" input causes the entire page or the dynamic list to re-render, the submission will fail. 
- **Data Persistence:** If the user accidentally refreshes the page or closes the tab on Step 2, their data must survive. Implement local persistence (e.g., syncing the form state to localStorage). 
- **Validation:** Strictly validate the form schema using Zod before allowing submission.
- **Mocking the Network:** Write a mock client-side utility (e.g., using setTimeout) to simulate the backend submission. 
  - It must intentionally take 4 seconds to resolve. 
  - It must randomly throw a 500 Internal Server Error 25% of the time.
- **Optimistic UI:** When the user clicks "Submit," disable the button and show a clear loading state. If the random 25% error occurs, handle it gracefully with a toast notification, allowing the user to retry without losing their 3 pages of inputted data. 

## Deliverables & Submission 
1. GitHub Repository: A link to your public repository containing clean, well-documented Next.js (App Router) code. 
2. Live Deployment: A live URL hosted on Vercel, Netlify, or a similar platform.
3. A 3-to-5 Minute Loom Video (Crucial Requirement)

## Evaluation Criteria 
- UI/UX Fidelity
- Component Reusability
- React Performance
- Resilience
