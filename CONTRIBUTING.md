# Contributing to Roamio

First off, thank you for considering contributing to Roamio! It's people like you that make Roamio such a great tool for explorers worldwide.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and courteous to others.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear descriptive title**
- **Detailed steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear descriptive title**
- **Detailed description of the proposed feature**
- **Why this enhancement would be useful**
- **Possible implementation approach** (optional)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding style** of the project
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request** with a comprehensive description

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/roamio.git
   cd roamio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Make your changes and test thoroughly

5. Build to verify:
   ```bash
   npm run build
   # or
   bun run build
   ```

## Coding Standards

- Use **TypeScript** for type safety
- Follow **React best practices** and hooks conventions
- Use **Tailwind CSS** for styling (prefer design system tokens)
- Keep components **small and focused**
- Write **clean, readable code** with meaningful variable names
- Add **comments** for complex logic

## Project Structure

- `src/components/` - React components (UI and feature components)
- `src/components/ui/` - shadcn/ui base components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and helpers
- `src/pages/` - Page-level components
- `src/index.css` - Global styles and design system tokens

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

Examples:
```
feat: add satellite pass prediction for ISS
fix: resolve map marker positioning bug
docs: update installation instructions
style: improve responsive layout for mobile
refactor: extract weather API logic to custom hook
```

## Questions?

Feel free to open an issue for any questions or concerns. We're here to help!

Thank you for contributing! 🌍
