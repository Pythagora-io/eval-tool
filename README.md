# Eval Tool

Eval Tool is a web application designed to facilitate the evaluation of various Large Language Models (LLMs) such as OpenAI, Anthropic, and Groq. Users can create, configure, and run tests against different LLMs using specific scenarios, and review the responses to assess the performance of these models.

## Overview

The Eval Tool web application is built using a Node.js and Express backend, with MongoDB as the database to store user data, test configurations, and results. The front-end is rendered using EJS templates and styled with Bootstrap for a responsive user interface. The application follows a Model-View-Controller (MVC) architecture to ensure separation of concerns, enhancing maintainability and scalability. Authentication is managed through session-based authentication to secure user sessions.

### Project Structure
- **Models**: Contains schema definitions for MongoDB using Mongoose.
- **Routes**: Defines the server routes for handling HTTP requests.
- **Views**: EJS templates for generating the HTML content.
- **Public**: Contains static files like JavaScript, CSS, and image assets.
- **Config**: Includes configuration files for setting up and securing the application.

## Features

- **Test Management**: Users can create, edit, and delete tests, each containing multiple scenarios for evaluating LLMs.
- **Dynamic Scenario Configuration**: Configure scenarios with different providers, models, and settings directly from the user interface.
- **Parallel Execution**: Scenarios are executed in parallel to optimize performance and reduce wait times.
- **Results Review**: Users can review LLM responses, score them, and add notes. The system also supports automated review using AI.
- **Import/Export Functionality**: Import messages for tests from JSON files and export test configurations.

## Getting Started

### Requirements
- Node.js
- MongoDB (local installation or cloud instance like MongoDB Atlas)
- NPM (Node Package Manager)

### Quickstart
1. **Clone the repository:**
   ```
   git clone https://github.com/your-repository/eval-tool.git
   ```
2. **Navigate to the project directory:**
   ```
   cd eval-tool
   ```
3. **Install dependencies:**
   ```
   npm install
   ```
4. **Set up the environment variables:**
   Copy `.env.example` to `.env` and fill in the necessary API keys and database URL.
   ```
   cp .env.example .env
   ```
5. **Start the server:**
   ```
   npm start
   ```
   This will run the server on `http://localhost:3000` by default.

### License

Copyright (c) 2024.

This software is proprietary and may not be copied, modified, or distributed without explicit permission from the owner.