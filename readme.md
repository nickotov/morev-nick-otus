# Node.js Course Implementation

This directory contains the implementation of homework assignments for the Node.js course.

## Project Setup

This project is built with TypeScript and includes various utilities and examples from the course lessons.

### Project Structure

```
node/
├── src/
│   ├── lessons/           # Contains code examples and homework implementations for each lesson
│   │   └── lesson-1.ts    # Homework for Lesson 1 - File system tree display
│   ├── utils/             # Utility functions used across lessons
│   │   └── tree.ts        # Tree utility to display directory structure
│   └── index.ts           # Main entry point
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Installation

```bash
# Install dependencies
npm install
```

## Running Lessons

Each lesson's homework is accessible through npm scripts defined in `package.json`.

### Lesson 1: File System Tree

The first lesson's homework implements a directory structure visualization tool.

To run:

```bash
npm run lesson-1
```

This runs the example in `src/lessons/lesson-1.ts` which uses the `tree` utility to display the structure of the `src` directory.

#### Tree Utility Options

The tree utility (`src/utils/tree.ts`) can be configured with the following options:

- `path` (required): The directory path to display
- `maxDepth` (optional): Maximum depth of subdirectories to display (default: 100)

You can use it in your code:

```typescript
import { tree } from '@/utils/tree';

// Display tree for current directory
tree({ path: process.cwd() });

// Display tree with limited depth
tree({ path: './some/directory', maxDepth: 2 });
```

You can also use it from the command line with parameters:
```
node dist/utils/tree.js /path/to/directory -d 3
```

Or set environment variables:
```
TREE_ROOT=/path/to/directory TREE_MAX_DEPTH=3 node dist/utils/tree.js
```

## Development Commands

- `npm run build`: Compile TypeScript files
- `npm run dev`: Run with nodemon for development
- `npm run watch`: Watch for file changes
- `npm run format`: Format code with Prettier

## Adding New Lessons

As the course progresses, new lesson files will be added to the `src/lessons` directory with corresponding npm scripts to run them.

When adding a new lesson:

1. Create a new file in `src/lessons/` (e.g., `lesson-2.ts`)
2. Add a script to `package.json`:
```
"lesson-2": "npm run build && node dist/lessons/lesson-2.js"
```
