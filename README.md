# Transaction Transparency Platform

A comprehensive admin dashboard for managing NGO campaigns, donations, and ensuring transparency in charitable transactions.

## Features

### Authentication & Roles
- JWT-based authentication with access and refresh tokens
- Role-based access control (ADMIN, NGO, DONOR)
- Secure cookie-based token storage
- Password hashing with bcrypt

### Admin Dashboard
- **Dashboard Overview**: Stats cards, charts, and recent activity
- **User Management**: CRUD operations, role management, user blocking/unblocking
- **NGO Management**: Approve/reject NGO registrations, view organization details
- **Campaign Management**: Approve campaigns, archive completed ones
- **Beneficiary Management**: View and manage beneficiaries
- **Transaction Monitoring**: View all donations with filtering and search
- **Settings**: User preferences and system configuration

### Dynamic Forms
- API-driven form generation
- Support for text, email, select, textarea, file upload fields
- Client-side validation with Zod
- Role-specific form configurations

### UI/UX Features
- Modern, responsive design with shadcn/ui components
- Dark mode support
- Loading states and error handling
- Toast notifications
- Mobile-friendly sidebar navigation

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **React Query** for state management
- **React Hook Form + Zod** for forms
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Joi** for validation
- **Multer** for file uploads
- **Helmet** for security
- **Express Rate Limit** for API protection

## Project Structure

```
transaction-transparency/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── ngoController.js
│   │   ├── campaignController.js
│   │   ├── beneficiaryController.js
│   │   └── donationController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── validationMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── user.js
│   │   ├── Ngo.js
│   │   ├── Campaign.js
│   │   ├── Beneficiary.js
│   │   └── Donation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── ngoRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── beneficiaryRoutes.js
│   │   ├── donationRoutes.js
│   │   └── formRoutes.js
│   ├── utils/
│   │   ├── token.js
│   │   └── seed.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── users/
│   │   │   │   ├── ngos/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── beneficiaries/
│   │   │   │   └── transactions/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   └── admin-layout.tsx
│   │   ├── ui/ (shadcn components)
│   │   ├── dynamic-form.tsx
│   │   ├── navbar.tsx
│   │   └── protected-route.tsx
│   ├── context/
│   │   └── auth-context.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── package.json
│   └── .env.example
├── postman/
│   └── transaction-transparency.postman_collection.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - Set MongoDB connection string
   - Configure JWT secrets
   - Set CORS origin for frontend

4. **Start MongoDB** (if running locally)

5. **Seed database (optional):**
   ```bash
   npm run seed
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```
# Server will run on http://localhost:5001

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   ```bash
   cp .env.example .env.local
   ```
   Configure API URL to point to backend.

4. **Start development server:**
   ```bash
   npm run dev
   ```
   App will run on http://localhost:3000

### Running Both Services

You can run both frontend and backend simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client && npm run dev
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Admin Endpoints
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/users` - List users with pagination
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/block` - Block user
- `PUT /api/admin/users/:id/unblock` - Unblock user
- `GET /api/admin/ngos` - List NGOs
- `PUT /api/admin/ngos/:id/approve` - Approve NGO
- `PUT /api/admin/ngos/:id/reject` - Reject NGO
- `GET /api/admin/campaigns` - List campaigns
- `PUT /api/admin/campaigns/:id/approve` - Approve campaign
- `PUT /api/admin/campaigns/:id/archive` - Archive campaign
- `GET /api/admin/transactions` - List transactions

### Dynamic Forms
- `GET /api/forms/:type?role=:role` - Get form configuration

## Default Admin Account

After running the seed script, you can login with:
- **Email:** admin@example.com
- **Password:** admin123

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Short-lived access tokens, rotating refresh tokens
- **Rate Limiting**: API rate limiting to prevent abuse
- **Helmet**: Security headers
- **CORS**: Configured for frontend origin
- **Input Validation**: Joi schemas for all inputs
- **Role-based Access**: Middleware protection for routes

## Development

### Adding New Admin Pages

1. Create page in `client/app/dashboard/admin/[page]/page.tsx`
2. Add route to sidebar in `admin-layout.tsx`
3. Implement API endpoints in backend if needed

### Adding New Form Types

1. Add form configuration in `formRoutes.js`
2. Use `DynamicForm` component in frontend
3. Handle form submission in parent component

### Database Models

The application uses the following main models:
- **User**: Authentication and profile data
- **NGO**: Organization information
- **Campaign**: Fundraising campaigns
- **Beneficiary**: People being helped
- **Donation**: Transaction records

## Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Set strong JWT secrets
5. Use a reverse proxy (nginx) in production

### Frontend Deployment
1. Build the application: `npm run build`
2. Configure environment variables for production API URL
3. Deploy to Vercel, Netlify, or your preferred platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

Frontend `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Postman

Import `postman/transaction-transparency.postman_collection.json` for API tests.
