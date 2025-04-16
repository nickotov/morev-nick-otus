# Node.js Course Implementation

This directory contains the implementation of homework assignments for the Node.js course.

## Project Setup

This project is built with TypeScript and includes various utilities and examples from the course lessons.

### Project Structure

```
node/
├── src/
│   ├── lessons/           # Contains code examples and homework implementations for each lesson
│   │   ├── lesson-1.ts    # Homework for Lesson 1 - File system tree display
│   │   └── lesson-4.ts    # Homework for Lesson 4 - Text processing with Node.js streams
│   ├── utils/             # Utility functions used across lessons
│   │   ├── tree.ts        # Tree utility to display directory structure
│   │   └── text-vectorizer.ts # Text processing and vectorization utility
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

### Lesson 4: Text Processing with Node.js Streams

The fourth lesson's homework implements a text processing pipeline using Node.js streams to:
1. Read text from an input file
2. Split into words and filter out non-alphanumeric characters
3. Count word occurrences 
4. Transform the counts into a sorted vector
5. Output the result to a file

To run:

```bash
npm run lesson-4
```

This script expects two environment variables:
- `INPUT_FILE`: Path to the input text file
- `OUTPUT_FILE`: Path where the processed output will be saved

The script in `package.json` is configured to use sample data:
```
"lesson-4": "npm run build && INPUT_FILE=data/lesson-4-text OUTPUT_FILE=dist/data/lesson-4-output node dist/lessons/lesson-4.js"
```

#### Text Vectorizer Utility

The text vectorizer utility (`src/utils/text-vectorizer.ts`) provides a class for processing text files and converting them to numerical vectors:

```typescript
import { TextVectorization } from '@/utils/text-vectorizer';

// Create a new vectorizer with input and output files
const vectorizer = new TextVectorization('input.txt', 'output.json');

// Process the text file and output the result
await vectorizer.vectorize();
```

The vectorizer:
- Reads text line by line from the input file
- Cleans text by removing special characters and converting to lowercase
- Counts word occurrences
- Converts word counts to a sorted numerical vector
- Writes the resulting vector to the output file

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
