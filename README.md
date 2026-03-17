# QC Frontend - Business Registration Portal

A high-fidelity, local-first business registration portal built for the U.S. Department of Defense (OLDCC). This application features a multi-step registration wizard, persistent application tracking, and a comprehensive profile management dashboard.

## Key Features (Presentation Guide)

### 1. **DOD Professional Header & Navigation**
- **High-Fidelity Branding**: Implemented according to design specs with official DOD Blue (`#005EA2`) and Slate (`#1C355E`).
- **Notification System**: Custom 15x28px notification bell with a manual red alert badge (`#EF4444`).
- **Responsive Design**: Integrated hamburger menu and slide-out drawer for seamless mobile navigation.

### 2. **My Applications Dashboard**
- **Unified Workflow**: The "New Application" flow is embedded directly here.
- **Persistence**: Applications are assigned unique IDs and timestamps, then saved to `localStorage` via Zustand.
- **Empty State**: Beautiful, image-led state for new users with a clear "Create New Application" call-to-action.

### 3. **Smart Registration Wizard**
- **Multi-Step Engine**: 3-step process (Business Details -> Board of Directors -> Review).
- **Zod Validation**: Strict real-time validation for Tax IDs (`XX-XXXXXXX`) and member limits (1-10 directors).
- **Visual Stability**: Error messages use absolute positioning to prevent layout "jumping" during validation.
- **Optimistic UI**: Mocked API integration with success/error toast notifications.

### 4. **Profile Management**
- **Modern Layout**: Clean, flat design with no box shadows, aligned to the global `#f8f9fa` background.
- **Action Cards**: Quick-access cards for New Application, Activity, and Support using official PNG assets.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 (Modern Design Tokens)
- **State Management**: Zustand (with Persist Middleware)
- **Form Handling**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library (27 passing tests)
- **Component Docs**: Storybook

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run full test suite
npm test

# Launch Storybook
npm run storybook
```

## Project Structure

- `src/components/ui`: Atomic, reusable UI components.
- `src/components/wizard`: Registration form steps and logic.
- `src/components/profile`: Dashboard and Application listing views.
- `src/lib`: Zustand store, Zod schemas, and mocked API services.
- `src/__tests__`: Comprehensive unit and integration tests.
