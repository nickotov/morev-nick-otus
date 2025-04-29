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