# Transaction Transparency Platform

Full-stack web app for transparent donations with role-based access:

- ADMIN: approve/block NGOs and monitor transactions
- NGO: create campaigns, manage beneficiaries
- DONOR: browse campaigns and donate

## Prerequisites

- Node.js 18+
- MongoDB running locally or remotely

## Backend

```bash
cd backend
npm install
npm run dev
```

Optional seed data:

```bash
npm run seed
```

## Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Backend `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/transaction_transparency
NODE_ENV=development
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
CLIENT_URL=http://localhost:3000
```

Frontend `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Postman

Import `postman/transaction-transparency.postman_collection.json` for API tests.
