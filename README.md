# Eval Tool

Eval Tool is a web application designed to facilitate the evaluation of various Large Language Models (LLMs) such as OpenAI, Anthropic, and Groq. Utilizing a Node.js and Express backend with a MongoDB database, the app enables users to create, edit, and run tests against selected LLMs, providing a structured framework for comparing model responses based on user-defined criteria.

## Overview

The application adopts a Model-View-Controller (MVC) architecture to separate concerns, enhancing maintainability and scalability. The backend, built with Node.js and Express, interfaces with MongoDB via Mongoose for data persistence, managing user information, tests, and test results. The frontend leverages EJS templates and Bootstrap for a responsive user interface. User authentication is session-based, ensuring secure access to tests. The application dynamically configures AI models for evaluation using environment variables, supporting parallel execution of LLM requests for efficiency.

### Project Structure

- **Models**: Define the data schema for users and tests.
- **Routes**: Handle HTTP requests, directing them to the appropriate controller logic.
- **Views**: EJS templates for rendering the user interface.
- **Public**: Contains static assets like CSS and JavaScript files.
- **Config**: Includes configuration files, such as those for setting up the database connection.
- **Controllers**: (Not explicitly mentioned but implied by MVC architecture) Contain logic to interact with models and render views.

## Features

- **Test Creation and Editing**: Users can create new tests and configure them with messages and review instructions.
- **LLM Evaluation**: Supports evaluation against multiple LLMs by configuring scenarios with different models and parameters.
- **Results Analysis**: Displays the outcomes of each test, including response adequacy based on user-defined scores.
- **User Authentication**: Secure login mechanism to manage access to tests.

## Getting started

### Requirements

- Node.js
- MongoDB (Local installation or MongoDB Atlas)
- NPM for managing packages

### Quickstart

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repository/eval-tool.git
   cd eval-tool
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Copy `.env.example` to `.env` and fill in your MongoDB URI, session secret, and API keys for the LLM providers.

4. **Run the application**:
   ```sh
   npm start
   ```
   This will start the server. By default, the application will be available at `http://localhost:3000`.

### License

Copyright (c) 2024.

This project is proprietary and not open source. Unauthorized copying of files, via any medium, is strictly prohibited.