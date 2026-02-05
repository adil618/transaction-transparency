# Transaction Transparency Frontend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

Open `http://localhost:3000`.

## Pages

- `/` Landing page
- `/signup` Registration (multi-step)
- `/login` Login
- `/dashboard` Role-based redirect
- `/dashboard/ngo` NGO dashboard
- `/dashboard/donor` Donor dashboard
- `/dashboard/admin` Admin dashboard

## Notes

- Auth uses HTTP-only cookies plus an access token stored in localStorage.
- All API calls include `credentials: "include"` to send cookies.
