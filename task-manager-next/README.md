# Task Manager Next MVP

This folder contains the first Next.js client-side migration of the static TaskManager template.

The current MVP keeps the core workflow only:

- task creation and editing
- task list and detail workspace
- search, filter, sort, and view modes
- light and dark theme persistence
- browser-side local persistence for tasks and core preferences

Deferred for later phases:

- categories management UI
- templates
- items lookup
- reports
- Excel export
- advanced settings panels

## Commands

```bash
npm run dev
npm run lint
npm run build
```

Open `http://localhost:3000` after starting the dev server.

## Structure

The app is organized by feature:

- `src/app` for the App Router shell
- `src/features/tasks` for task state, selectors, types, and task UI
- `src/features/theme` for theme persistence and toggling
- `src/features/workspace` for the page-level shell pieces like the header and filters
- `src/shared` for reusable modal and storage helpers

## Notes

- The original static template remains in the sibling `TaskManager` folder as the source reference.
- The MVP stores migrated task data under a new local key and can also read the legacy task payload to seed the first load.
