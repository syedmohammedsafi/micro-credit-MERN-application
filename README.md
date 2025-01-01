# micro-credit-app
## Description

A **Micro Credit Application** built with **MERN Stack** (MongoDB, Express, React, Node.js) and **Vite** for fast development. The app enables loan eligibility calculation, loan approval, and user management.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **MongoDB Atlas** account
- **npm** or **yarn**

- A Twilio account is required to send SMS messages.
- Ensure that the phone numbers you wish to send messages to are **verified** in your Twilio account.  
  Twilio only allows messages to verified numbers when using a trial account.

## Setting Up Twilio

1. Sign up for a [Twilio Account](https://www.twilio.com/).
2. Obtain your `Account SID`, `Auth Token`, and a valid Twilio phone number.
3. Add the phone numbers you want to use to your **Verified Caller IDs** in Twilio:
   - Log in to the Twilio Console.
   - Navigate to **Phone Numbers** > **Verified Caller IDs**.
   - Add and verify the recipient's phone number.
4. Update your environment variables with Twilio credentials:
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/micro-credit-app.git
cd micro-credit-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server` directory:

```env
ACCOUNT_SID=AC85c774794f67fc574ce2541afba03328
AUTH_TOKEN=e681f62508354e3748d9535865c7ea57
ADMIN_EMAIL=safi22052004@gmail.com
MONGO_URI=mongodb+srv://21cs111:21cs111@cluster.sjhbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
JWT_SECRET=7d7a17419f4e28b41b14f1a445c8e2168b7758b7c6a97b0bc8d4f7c0d7a4c05a
JWT_EXPIRES_IN=7d
```

### 4. Run the Application

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
npm run dev
```

### 5. Access the App

- Frontend UI: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Folder Structure

```bash
├── server/             # Backend (Express)
│   ├── controllers/    # Logic for loans
│   ├── schemas/        # Mongoose models
│   ├── server.js       # Backend entry point and API routes
├── src/                # Frontend (React)
│   ├── components/     # React components
|   ├── context/        # Contexts for authentication
│   ├── pages/          # Page components
├── .gitignore          # Git ignore file
├── .env                # Environment variables
├── package.json        # Frontend dependencies
├── tailwind.config.js  # Tailwind config
├── vite.config.js      # Vite config
```

# Dependencies

# Tech Stack
| Client-side                      | Server-side                        | Dev Tools                        |
|----------------------------------|------------------------------------|----------------------------------|
| react: ^18.3.1                   | express: ^4.21.2                   | vite: ^6.0.3                     |
| react-dom: ^18.3.1               | mongoose: ^8.9.2                   | @vitejs/plugin-react: ^4.3.4     |
| react-router-dom: ^7.1.0         | bcryptjs: ^2.4.3                   | tailwindcss: ^3.4.17             |
| react-icons: ^5.4.0              | cors: ^2.8.5                       | autoprefixer: ^10.4.20           |
| react-leaflet: ^4.2.0            | dotenv: ^16.4.7                    | eslint: ^9.17.0                  |
| leaflet: ^1.9.4                  | jsonwebtoken: ^9.0.2               | eslint-plugin-react: ^7.37.2     |
| twilio: ^5.4.0                   | jwt-decode: ^4.0.0                 | eslint-plugin-react-hooks: ^5.0.0|
| zod: ^3.24.1                     | mongodb: ^6.12.0                   | eslint-plugin-react-refresh:^0.4.16|
|                                  | nodemon: ^3.1.9                    | postcss: ^8.4.49                 |
|                                  |                                    | @types/react: ^18.3.17           |
|                                  |                                    | @types/react-dom: ^18.3.5        |
|                                  |                                    | globals: ^15.13.0                |


## Sample Datas 

User Collection (Sample Data)
```json
{
    "_id": "6774dff531d19fd73132a41a",
    "email": "21cs111@psr.edu.in",
    "number": "7305607997",
    "password": "$2a$10$YDG9ttTH9p6K4rWhaAkZQuq8/1qO904/hceakLz/lp4WgSCenS.LO", //Password: sadfsadf
    "createdAt": "2025-01-01T00:00:00Z",
    "address": "81/b, MSP puram, Thoothukudi, Tamil Nadu, 628501",
    "bank": "State Bank of India (SBI)",
    "dob": "2025-12-01",
    "emi": 5000,
    "expense": 10000,
    "gender": "Male",
    "householdSize": 3,
    "loanPurpose": "Emergency Fund",
    "loanamt": 50000,
    "maritalStatus": "Single",
    "name": "Safi",
    "occupation": "Software Developer",
    "pancard": "EVQPA8861P",
    "posthike": "2025-02-09",
    "prehike": "2025-01-03",
    "presalary": 25000,
    "rent": 5000,
    "salary": 35000,
    "savings": 10000,
    "accountNumber": "87654323456789876",
    "accountType": "Current",
    "age": 21,
    "area": "MSP puram",
    "city": "Thoothukudi",
    "houseNumber": "81/b",
    "ifscCode": "SBI09876543",
    "state": "Tamil Nadu",
    "zipcode": "628501"
}
```

Admin Collection (Sample Data)
```json 
{
    "_id": "6774e1126dadc5944e24c36b",
    "email": "safi22052004@gmail.com",
    "password": "$2a$10$wE03kXe0VIkM9aT7otid0.f5v7AN07iHKXU1pP0MkPQURmjN/6Q02",     //Password: sadfsadf
    "createdAt": "2025-01-01T00:00:00Z",
    "__v": 0
}
```

## Deployment

### Backend

Deploy using platforms like Heroku, Vercel, Render, AWS, or DigitalOcean. Use MongoDB Atlas for cloud database.

### Frontend

Build for production:

```bash
npm run build
```

Deploy using platforms like Netlify, Vercel, or Heroku.