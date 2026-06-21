# Full Stack Weather App

A modern, full-stack weather dashboard built to provide real-time weather information while caching historical searches using a local database. The project is split into a React client and a Node.js API server.

## Features
- **Frontend**: Built with React 19, TypeScript, and Vite for lightning-fast performance.
- **Backend**: An Express.js REST API providing clean endpoints.
- **Database**: SQLite3 integration to cache weather queries and prevent excessive external API calls.
- **Testing**: Frontend components tested using Vitest and React Testing Library.

## Prerequisites
Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- `npm` (comes with Node.js)

## Getting Started

Because this is a full-stack application, you will need to run **both** the frontend and the backend servers simultaneously in two separate terminal windows.

### 1. Start the Backend API Server
The backend handles the data fetching and SQLite database caching.

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server using `tsx`:
   ```bash
   npx tsx watch src/server.ts
   ```
   *Note: If prompted to install `tsx`, simply type `y` and press enter.*

You should see a message stating: `Server is running on http://localhost:3001` and `Connected to the SQLite database.`

### 2. Start the Frontend Development Server
The frontend is the UI where users will interact with the application.

1. Open a **second, new terminal window** (leave the backend running in the first one).
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install the frontend dependencies:
   ```bash
   npm install
   ```
4. Start the frontend Vite server:
   ```bash
   npm run dev
   ```

Your terminal will provide a local URL (e.g., `http://localhost:5173/`). `Ctrl + Click` that link or open it in your browser to view the application!

## Running Tests
To run the automated test suite for the frontend components:
```bash
cd frontend
npm run test
```

## Python Automation & ML Scripts
This project includes a suite of Python scripts in the `python_tools` directory tailored for automated testing and machine learning data analysis.

### Prerequisites
Make sure you have Python installed, then install the required dependencies:
```bash
cd python_tools
pip install -r requirements.txt
```

### 1. Automated Integration Tests
Runs end-to-end integration tests against the backend API to validate endpoints:
```bash
python api_automation_test.py
```

### 2. Search Trend Analyzer (AI/ML)
Connects directly to the SQLite database to extract historical search queries and uses `scikit-learn` for trend prediction via CountVectorizer token analysis:
```bash
python search_trend_analyzer.py
```
