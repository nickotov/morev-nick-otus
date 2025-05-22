# Best Course Ever App

## Description

An educational platform that allows users to view and edit media content.

### Features
- Users can view course
- Users can create their own courses and edit them
- Courses include descriptions and sets of lessons
- Courses (including lessons and their descriptions) are available to all users
- Users can add comments to lessons and view comments from others
- Each lesson can contain descriptions, videos, links, and files as different resource types
- Course authors can grant access to their course lessons by adding users to an approved accounts list

## Requirements
The application MUST:

- Store courses with descriptions, input/output examples, difficulty levels, tags (e.g., "algorithms", "data structures", "dynamic programming"), and additional materials (files, links)
- Provide login and logout functionality
- Implement user roles (user, administrator, author) and verify user permissions in the system
- Allow users to leave comments on courses and lessons
- Enable users to rate courses and lessons to help others understand difficulty and interest level
- Allow users to view author and course profiles and edit their ratings
- Include REST API for application resource management
- Use a database to store information about tasks and users

## Stack

- express
- mongodb

## Nuances

- use rest api
- use Controller Service Repository (CSR) pattern

## What app is

This app has two parts - backend and frontend.
Frontend will be written using React and it will be a SPA.
For a backend I will use express for a server part.
For an api I plan to stick with REST, though later it would be nice to switch to graphql for more flexibility considering
the specificity of app (for example page with all course needs few fields from backened and a page for a concrete course need more data).
For data storage i'll try mongodb with mongouse as ORM and for a more clear data definition via code.
I'll stick with Controller-Service-Repository pattern.
For authentication i'll probably use Passport.js.

For now entities (kind of) described in `types.ts` files in repositories directories and dummy classes for repositories created there as well.
