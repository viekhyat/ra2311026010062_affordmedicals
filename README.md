# Frontend Assessment - Priority Notifications

**Roll No:** RA2311026010062  
**Name:** Viekhyat Khare  

### 🎥 Demonstration Video
**Watch the App in Action:** [Link to your Google Drive/YouTube Video here]

This repository contains the complete implementation for the Frontend Coding Assessment, divided into the React Application (Q1) and the custom Data Structure Algorithm (Q2).

## Project Structure

```
.
├── Q1/                     # React Frontend Application (Vite + Material UI)
│   ├── src/                # Source Code
│   │   ├── api/            # API Service layer (Fetch logic)
│   │   ├── auth/           # Authentication handlers
│   │   ├── middleware/     # Custom logging middleware
│   │   └── page/           # Main UI components (Inbox, Lists)
│   ├── index.html          # Vite entry
│   └── vite.config.js      # Server & Proxy configuration
│
└── Q2/                     # Data Structures & Algorithms
    └── priority_queue.js   # Min-Heap algorithm implementation
```

## Features Implemented

### 1. React Application (Q1)
- **Beautiful UI**: Built exclusively using Material UI. Implements a responsive, dynamic layout with transitions, custom styling, and clean rendering.
- **Priority Inbox**: Displays the top N notifications correctly sorted using a dedicated priority weighting system.
- **Data Fetching**: Includes robust pagination, filtering logic (Placement, Result, Event), and handles edge cases elegantly.
- **CORS Bypass**: Implemented a Vite Proxy to securely tunnel API requests without browser restrictions.
- **Centralized Logging**: `console.log` is strictly prohibited. All logs (info, error) are routed gracefully through the provided Evaluation Logging API.

### 2. Custom Algorithm (Q2)
- **Min-Heap Data Structure**: Engineered a highly efficient Min-Heap in `Q2/priority_queue.js` specifically designed for $O(\log k)$ performance. 
- **Priority Weights**: Evaluates incoming data assigning strict weight scores: Placement (3), Result (2), and Event (1), falling back to Recency for equal-weight items.

## How to Run the App Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Instructions

1. **Navigate to the Q1 directory:**
   ```bash
   cd Q1
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Provide your Access Token:**
   - Create a `.env` file inside the `Q1` directory.
   - Add your token like this: `VITE_ACCESS_TOKEN=your_token_here`

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **View the Application:**
   Open your browser and navigate to `http://localhost:3000`.

*(Note: Tokens provided by the evaluation server expire strictly after 15 minutes and will need to be regenerated).*
