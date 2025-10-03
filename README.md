# Angular 20 Starter Boilerplate

> A clean, scalable Angular 20 starter template following modern best practices and architecture patterns.

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📁 Project Structure

```
project-root/
├── public/
│
└── src/
    ├── app/
    │   ├── core/
    │   ├── shared/
    │   ├── features/
    │   ├── layout/
    │   ├── app.config.ts
    │   ├── app.html
    │   ├── app.routes.ts
    │   └── app.ts
    │
    ├── environments/
    ├── index.html                     # Main HTML file
    ├── main.ts                        # Application bootstrap
    └── styles.css                     # Global styles
```

## 📂 Directory Descriptions

### `/public`
Static files served directly without build processing (at project root level).
- `images/` - Images and graphics
- `icons/` - Icon assets
- `fonts/` - Custom fonts
- `i18n/` - Translation files (if using internationalization)
- Files accessible via root path (e.g., `/images/logo.svg`)

### `/core`
Singleton services and app-wide functionality that should be loaded once.
- `guards/` - Route guards for authentication and authorization
- `interceptors/` - HTTP interceptors for request/response handling
- `services/` - Global services (API, auth, state management)
- `models/` - Global TypeScript interfaces and types
- `constants/` - Application-wide constants

### `/shared`
Reusable, presentation-only components and utilities used across features.
- `components/` - Stateless UI components (buttons, modals, cards)
- `directives/` - Custom Angular directives
- `pipes/` - Custom Angular pipes
- `utils/` - Helper functions and utilities

### `/features`
Self-contained feature modules organized by business domain.
- Each feature contains its own components, services, models, and routes
- Configured for lazy loading to optimize performance
- Example structure: `feature-name/components/`, `feature-name/services/`

### `/layout`
Application layout components that wrap feature content.
- `header/` - Top navigation bar
- `footer/` - Page footer
- `sidebar/` - Side navigation (if needed)
- `main-layout/` - Main layout wrapper component

### `/environments`
Environment-specific configuration files.
- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment

### `/main.ts`
Application entry point that starts up the Angular application.
- Calls `bootstrapApplication()` to initialize and launch the app
- Imports app configuration and root component
- First file executed when the app runs