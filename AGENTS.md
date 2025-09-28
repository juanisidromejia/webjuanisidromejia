# Agent Guidelines for Juan Isidro Mejía Portfolio

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro check` - Type check Astro components

## Code Style

- **Formatting**: Prettier (printWidth: 160, singleQuote: true, tabWidth: 4, no trailing commas)
- **TypeScript**: Strict mode with strictNullChecks, PascalCase types, camelCase variables
- **Imports**: `import type` for type imports, single quotes
- **Components**: PascalCase names, use `class:list` for conditional Tailwind classes
- **Naming**: camelCase for functions/variables, PascalCase for types/components
- **Styling**: Tailwind CSS with custom theme, dark mode support via 'class' strategy
- **Error Handling**: Use null checks and optional chaining, throw descriptive errors

## Project Structure

- Astro.js with TypeScript, MDX, and Tailwind CSS
- Content collections for blog/projects in `src/content/`
- Components in `src/components/`, utilities in `src/utils/`
- Static assets in `public/`, custom fonts via @fontsource

## Development Notes

- No linting or testing scripts configured - run `astro check` for type validation
- Use `astro add` for new integrations
- Follow existing patterns for component props and data structures
