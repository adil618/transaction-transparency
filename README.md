# Transaction Transparency & Donation Management System

A full-stack web application for transparent and auditable donation management. Built with modern technologies and a professional white & black minimalist design system.

## 🎯 Project Goal

Build a comprehensive donation management system where:
- **Donors** can discover campaigns and make transparent donations
- **NGOs** can create beneficiaries, manage campaigns, and track donations
- **Admin** can verify organizations, monitor transactions, and prevent fraud
- **Every transaction** is traceable, auditable, and transparent

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 16+ (App Router)
- **UI Library**: React 19+
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Radix UI
- **Authentication**: JWT with Context API
- **HTTP Client**: Custom fetch wrapper with error handling
- **Type Safety**: TypeScript
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT
- **Validation**: Express middleware
- **Logging**: Structured console logging

### Theme
- **Design System**: White & Black Minimalist Professional
- **Color Palette**: Pure black, white, grays, semantic colors
- **Typography**: System fonts
- **Spacing**: 8px grid base
- **Border Radius**: 8px standard

## 📦 Project Structure

```
transaction-transparenct/
├── backend/                         # Express.js API Server
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/                # Business logic
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── ngoController.js
│   │   ├── beneficiaryController.js
│   │   ├── campaignController.js
│   │   └── donationController.js
│   ├── middleware/                 # Express middleware
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── errorMiddleware.js      # Error handling
│   │   ├── roleMiddleware.js       # RBAC
│   │   └── validationMiddleware.js # Validation
│   ├── models/                     # Mongoose schemas
│   │   ├── user.js
│   │   ├── Ngo.js
│   │   ├── Beneficiary.js
│   │   ├── Campaign.js
│   │   └── Donation.js
│   ├── routes/                     # API endpoints
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── ngoRoutes.js
│   │   ├── beneficiaryRoutes.js
│   │   ├── campaignRoutes.js
│   │   └── donationRoutes.js
│   ├── utils/
│   │   ├── seed.js                # Database seeding
│   │   └── token.js               # JWT utilities
│   ├── index.js                   # Entry point
│   ├── package.json
│   └── .env
│
├── client/                         # Next.js Frontend
│   ├── app/
│   │   ├── globals.css            # Global styles & design tokens
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── providers.tsx          # Context providers
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/             # Role-based dashboards
│   │   │   ├── page.tsx          # Dashboard router
│   │   │   ├── admin/            # Admin dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   ├── users/
│   │   │   │   ├── ngos/
│   │   │   │   └── transactions/
│   │   │   ├── donor/            # Donor dashboard
│   │   │   └── ngo/              # NGO dashboard
│   │   └── [other routes]
│   ├── components/
│   │   ├── ui/                   # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── [other UI components]
│   │   ├── admin/                # Admin-specific
│   │   │   └── admin-layout.tsx  # Sidebar & layout
│   │   ├── navbar.tsx            # Navigation
│   │   ├── protected-route.tsx   # Route protection
│   │   ├── signup-form.tsx
│   │   └── [other components]
│   ├── context/
│   │   └── auth-context.tsx      # Auth state
│   ├── lib/
│   │   ├── api.ts                # API wrapper
│   │   ├── auth.ts               # Token management
│   │   └── utils.ts              # Utilities
│   ├── public/                   # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.ts
│
├── postman/
│   └── transaction-transparency.postman_collection.json
│
├── DESIGN_SYSTEM.md              # Design system documentation
├── README.md                     # This file
└── .gitignore
```

## 🎨 Design System

A professional **white & black minimalist** design system optimized for trust and clarity.

### Color Palette
| Element | Color | Hex |
|---------|-------|-----|
| Background | White | #FFFFFF |
| Text | Black | #000000 |
| Secondary BG | Light Gray | #F5F5F5 |
| Secondary Text | Dark Gray | #333333 |
| Borders | Soft Gray | #E5E5E5 |
| Success | Green | #16A34A |
| Warning | Amber | #F59E0B |
| Error | Red | #DC2626 |
| Focus Ring | Black | #000000 |

### Design Features
✓ Professional banking-style layout
✓ Clean spacing (8px grid)
✓ Soft shadows for depth
✓ 8px rounded corners  
✓ Fully responsive
✓ Minimal animations
✓ No bright colors or gradients
✓ WCAG AA accessible
✓ Sidebar navigation for admin
✓ Touch-friendly mobile UI

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete reference.

## 👥 User Roles

### 1. Donor
- Browse and view campaigns
- Donate to campaigns
- View donation history
- Track donation status
- Receive receipts

### 2. NGO (Non-Governmental Organization)
- Create beneficiaries
- Create and manage campaigns
- Track incoming donations
- View campaign progress
- Generate reports

### 3. Admin
- Verify NGO registrations
- Approve/reject beneficiaries
- Monitor transactions
- View audit logs
- Manage users
- Block suspicious accounts

## 🔐 Authentication & Security

### Features
- JWT-based authentication
- Secure http-only cookies
- Bcrypt password hashing (10 salt rounds)
- Token rotation on refresh
- Role-based access control (RBAC)
- Protected API & frontend routes
- Automatic logout on expiry

### Token Configuration
- Access Token: 15 minutes
- Refresh Token: 7 days
- Stored in secure cookies
- Auto-refreshed seamlessly

## 🛣️ API Endpoints

### Authentication
```
POST   /api/auth/register        # Register user
POST   /api/auth/login           # Login
POST   /api/auth/logout          # Logout
POST   /api/auth/refresh         # Refresh token
GET    /api/auth/me              # Get current user
```

### Admin Endpoints
```
GET    /api/admin/users          # List users
PUT    /api/admin/users/:id      # Update user
PUT    /api/admin/ngos/:id/approve   # Approve NGO
GET    /api/admin/transactions   # View transactions
GET    /api/admin/dashboard/stats    # Dashboard stats
```

### NGO Endpoints
```
POST   /api/ngos                 # Create NGO
GET    /api/ngos/me              # Get my NGO
POST   /api/beneficiaries        # Create beneficiary
POST   /api/campaigns            # Create campaign
GET    /api/donations/ngo        # View donations
```

### Donor Endpoints
```
POST   /api/donations            # Make donation
GET    /api/donations/mine       # View my donations
GET    /api/campaigns            # List campaigns
```

## 🗄️ Database Models

### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: 'admin' | 'ngo' | 'donor' | 'tester',
  status: 'active' | 'blocked',
  lastLogin: Date,
  timestamps: true
}
```

### NGO
```javascript
{
  user: ObjectId,
  name: String,
  registrationNumber: String,
  description: String,
  contactEmail: String,
  contactPhone: String,
  address: String,
  status: 'pending' | 'approved' | 'rejected',
  timestamps: true
}
```

### Campaign
```javascript
{
  ngo: ObjectId,
  beneficiary: ObjectId,
  title: String,
  description: String,
  goalAmount: Number,
  currentAmount: Number,
  status: 'active' | 'paused' | 'completed',
  timestamps: true
}
```

### Donation
```javascript
{
  donor: ObjectId,
  campaign: ObjectId,
  ngo: ObjectId,
  amount: Number,
  transactionRef: String,
  status: 'completed' | 'pending' | 'failed',
  timestamps: true
}
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install

# Create .env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
NODE_ENV=development

# Seed database
node utils/seed.js

# Start server
npm run dev
```

Server: `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install

# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000

# Start dev server
npm run dev
```

Client: `http://localhost:3000`

## 📝 Default Test Accounts

After seeding:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.com | password123 |
| NGO | ngo@demo.com | password123 |
| Donor | donor@demo.com | password123 |

## ✨ Features

### ✅ Completed
- User registration & login
- JWT authentication
- Role-based access control
- Protected routes (API & frontend)
- User dashboard (per role)
- Admin panel with sidebar
- NGO verification workflow
- Beneficiary management
- Campaign management
- Donation processing
- Transaction tracking
- User management (search, block)
- NGO management (approve/reject)
- Responsive design
- Professional UI
- Error handling
- Input validation

### 🔄 Future Enhancements
- Payment gateway integration
- Email notifications
- SMS alerts
- Advanced analytics  
- PDF/CSV export
- Two-factor authentication
- Rate limiting
- WebSocket real-time updates
- Mobile app

## 🧪 API Testing

Import the Postman collection:
```
postman/transaction-transparency.postman_collection.json
```

## 📝 Code Quality

- ✓ Clean code principles
- ✓ MVC pattern (backend)
- ✓ Component-based (frontend)
- ✓ TypeScript for type safety
- ✓ Proper error handling
- ✓ Input validation
- ✓ Security best practices
- ✓ Responsive design
- ✓ WCAG AA compliance

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Commit with clear messages
4. Push and create PR

## 📄 License

MIT License - see LICENSE file

## 🆘 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify IP whitelist (Atlas)

**CORS Errors**
- Backend running on port 5000?
- Check NEXT_PUBLIC_API_URL

**Build Errors**
- Clear `.next` folder
- Reinstall: `npm install`
- Node 18+ required

## 📞 Support

- Check documentation in DESIGN_SYSTEM.md
- Review error messages
- Check GitHub issues
- Contact development team

---

**Version**: 1.0.0  
**Status**: Active Development ✅  
**Last Updated**: March 2026

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
