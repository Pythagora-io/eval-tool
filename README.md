# Eval Tool

Eval Tool is a web application designed to help users evaluate and test various Large Language Models (LLMs) such as OpenAI, Anthropic, and Groq. It provides an interface for creating, editing, and running tests, and analyzing the results of these tests, making it easier for developers and researchers to assess the performance of different LLMs.

## Overview

The Eval Tool web application is built using a Node.js and Express backend, with MongoDB as the database for storing user and test data. The front end is rendered using EJS templates and styled with Bootstrap for a responsive user interface. It follows a Model-View-Controller (MVC) architecture to separate concerns, making the codebase more manageable and scalable. User authentication is handled using session-based authentication to ensure secure access.

### Project Structure
- **Models**: Contains Mongoose schemas and models for users and tests.
- **Routes**: Express routes handling API requests for authentication and test operations.
- **Views**: EJS templates for rendering the front-end.
- **Public**: Static files like JavaScript, CSS, and sample data.
- **Config**: Environment configuration files.

## Features

- **Test Management**: Users can create, edit, and delete tests. Each test includes a set of scenarios for different LLMs, and each scenario contains multiple test runs.
- **LLM Integration**: Supports interactions with multiple LLM providers using their respective SDKs.
- **Parallel Execution**: Runs multiple test scenarios in parallel to efficiently evaluate the LLMs.
- **Results Analysis**: Analyzes and displays the results, including pass/fail scores based on the responses from the LLMs.
- **User Authentication**: Manages user sessions to secure access to the application.

## Getting Started

### Requirements
- Node.js
- MongoDB
- NPM

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://example.com/eval-tool.git
   cd eval-tool
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the environment variables:**
   Copy the `.env.example` file to a new file named `.env` and fill in the required API keys and database URL.

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open a web browser and navigate to `http://localhost:3000` to start using the Eval Tool.

### License

Copyright (c) 2024. All rights reserved.