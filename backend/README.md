# Transaction Transparency Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file (see `.env` sample in this folder).
3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

- `index.js` - Entry point
- `routes/` - Express route definitions
- `controllers/` - Route handler logic
- `models/` - Mongoose models
- `config/` - Database and environment config
- `middleware/` - Custom middleware (add as needed)
- `utils/` - Utility functions (add as needed)

## API Endpoints

- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Create a new transaction

## Requirements
- Node.js 18+
- MongoDB (local or remote)
