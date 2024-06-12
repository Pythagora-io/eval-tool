# Eval Tool

**Eval Tool** is a web application designed to evaluate the performance of various Large Language Models (LLMs) including OpenAI, Anthropic, and Groq. It allows users to create, configure, and run tests against different AI models, analyze the responses, and review the results with detailed instructions.

## Overview

The Eval Tool web application is built using a Node.js and Express backend with MongoDB for data storage. It utilizes a Model-View-Controller (MVC) architecture to separate concerns, making the application scalable and manageable. The front end is rendered using EJS templates and styled with Bootstrap for a responsive design. User authentication is managed via session-based authentication to ensure secure access to the application.

### Project Structure

- **Models**: Contains schema definitions for MongoDB.
- **Routes**: Defines the server routes for handling HTTP requests.
- **Public**: Holds static files like JavaScript, CSS, and images.
- **Views**: Contains EJS templates for rendering HTML on the client side.
- **Config**: Includes configuration files for the application, such as database connections.
- **Controllers**: Logic for handling requests, interacting with the database, and returning responses.

## Features

- **Test Creation and Management**: Users can create and manage tests with specific scenarios to evaluate different LLMs.
- **Dynamic Test Configuration**: Configure tests dynamically by selecting AI providers, models, and other parameters.
- **Parallel Execution**: Tests are executed in parallel to optimize performance and reduce waiting time.
- **Results Analysis**: Analyze the responses from LLMs based on predefined review instructions and score the adequacy of responses.
- **User Authentication**: Secure user authentication system to manage access to different functionalities.

## Getting Started

### Requirements

- Node.js
- MongoDB
- NPM (Node Package Manager)

### Quickstart

1. **Clone the repository**:
   ```bash
   git clone https://example.com/eval-tool.git
   cd eval-tool
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the environment variables**:
   Copy `.env.example` to `.env` and update the values accordingly.

4. **Start the MongoDB server**:
   Ensure that MongoDB is running on your system or connect to a remote MongoDB server.

5. **Run the application**:
   ```bash
   npm start
   ```
   This will start the server on the defined PORT, defaulting to 3000.

6. **Access the application**:
   Open a web browser and go to `http://localhost:3000` to start using the Eval Tool.

### License

Copyright (c) 2024. All rights reserved.

This project is proprietary and not open source. Redistribution or commercial use is strictly prohibited without prior agreement.