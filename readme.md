# Node.js Course Homeworks

This repository contains the homework assignments and related code for the Node.js course.

## Repository Structure

```
otus/
├── node/                  # Main project directory
    ├── src/               # Source code
        ├── lessons/       # Lesson-specific code and homework examples
        ├── utils/         # Utility functions
        └── index.ts       # Main entry point
```

## Getting Started

### Prerequisites

- Node.js (v22 or higher recommended, look at .nvmrc)
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory
```bash
cd otus/node
```
3. Install dependencies
```bash
npm ci
```

## Running Homework Assignments

Each lesson has a corresponding homework assignment located in the `src/lessons` directory. You can run them using the npm scripts defined in `package.json`.

### Lesson 1: File System Tree Generator

The first homework assignment implements a function that displays the directory tree structure in the console.

To run Lesson 1 homework:

```bash
npm run lesson-1
```

This command builds the TypeScript code and executes the `dist/lessons/lesson-1.js` file, which demonstrates the tree structure functionality.

#### About the Tree Function

The tree function is implemented in `src/utils/tree.ts` and can:
- Display a directory structure in a visual tree format
- Accept parameters for path and maximum depth
- Count and report the total number of folders and files

Example output:
```
src
├── lessons
│   └── lesson-1.ts
├── utils
│   └── tree.ts
└── index.ts


  Total folders: 2  
  Total files: 3  
```

## Adding New Lessons

As the course progresses, new lessons will be added to the `src/lessons` directory with corresponding scripts in `package.json` to run them.

## Development

- Build the project: `npm run build`
- Run in development mode with auto-reload: `npm run dev`
- Format code: `npm run format`
