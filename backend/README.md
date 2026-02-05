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
4. (Optional) Seed demo data:
   ```sh
   npm run seed
   ```

## Project Structure

- `index.js` - Entry point
- `routes/` - Express route definitions
- `controllers/` - Route handler logic
- `models/` - Mongoose models
- `config/` - Database and environment config
- `middleware/` - Auth + role middleware
- `utils/` - Utilities (tokens, seed, etc.)

## Auth Flow

- Access token (15m) + refresh token (7d)
- HTTP-only cookies + bearer token support
- Refresh endpoint rotates refresh tokens

## API Endpoints (Core)

- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/refresh`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- NGO:
  - `POST /api/ngos`
  - `GET /api/ngos/me`
  - `PUT /api/ngos/approve/:id`
  - `PUT /api/ngos/reject/:id`
- Campaigns:
  - `GET /api/campaigns`
  - `GET /api/campaigns/:id`
  - `GET /api/campaigns/mine`
  - `POST /api/campaigns`
  - `PUT /api/campaigns/:id`
  - `DELETE /api/campaigns/:id`
- Beneficiaries:
  - `GET /api/beneficiaries/mine`
  - `POST /api/beneficiaries`
  - `PUT /api/beneficiaries/:id`
  - `DELETE /api/beneficiaries/:id`
- Donations:
  - `POST /api/donations`
  - `GET /api/donations/mine`
  - `GET /api/donations/ngo`
  - `GET /api/donations/all`
- Admin:
  - `GET /api/admin/ngos`
  - `PUT /api/admin/users/:id/block`
  - `PUT /api/admin/users/:id/unblock`

## Requirements

- Node.js 18+
- MongoDB (local or remote)
