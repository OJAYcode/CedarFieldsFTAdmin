# CedarFields Hotel - Admin Dashboard

Admin panel for managing CedarFields Hotel bookings, rooms, and settings.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Backend Server

Make sure the backend server is running on port 5000.

### 4. Run Development Server

```bash
npm run dev
```

The admin dashboard will run on [http://localhost:3001](http://localhost:3001)

## Default Admin Credentials

- **Email**: superadmin@cedarfields.com
- **Password**: SuperAdmin@123

## Admin Features

- **Dashboard**: Overview of bookings, revenue, and occupancy stats
- **Bookings Management**: View, update, and manage all hotel bookings
- **Rooms Management**: Add, edit, and manage hotel rooms
- **Hotel Settings**: Update hotel information and amenities
- **User Management**: Manage admin users (superadmin only)

## Important Notes

- Admin panel runs on **port 3001** (different from main app on port 3000)
- Both apps connect to the same backend API on port 5000
- Make sure backend server is running before starting admin panel

## Route Updates

All admin routes have been updated:

- `/admin/dashboard` → `/dashboard`
- `/admin/bookings` → `/bookings`
- `/admin/rooms` → `/rooms`
- `/admin/hotel` → `/hotel`
- `/admin/users` → `/users`
- `/admin/login` → `/` (login is now homepage)
