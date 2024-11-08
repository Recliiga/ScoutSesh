# ScoutSesh

ScoutSesh is a comprehensive athlete development platform designed to elevate your game to the next level. Whether you're an aspiring youth athlete or a seasoned pro in any sport, our tools and resources are tailored to help you reach your full potential.

## Features

- Built with [Next.js](https://nextjs.org/) using the app router
- Responsive and optimized for performance
- User authentication with JSON Web Tokens (JWT)
- MongoDB Atlas as the primary database

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A `.env.local` file with required environment variables

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/greatochuko/scoutsesh.git
   cd scoutsesh
   ```

2. **Install Dependencies**

   Run the following command to install the necessary packages:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   BASE_URL=http://localhost:3000
   MONGODB_ATLAS_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   - `BASE_URL`: The base URL of the application. Set to `http://localhost:3000` for local development.
   - `MONGODB_ATLAS_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: Secret key for signing JWT tokens. Ensure this value is kept private.

### Running the Application

To start the development server, run:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build, run:

```bash
npm run build
npm start
```

The app will be served in production mode.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm start`: Runs the app in production mode.

## Project Structure

- **`app/`**: Contains the Next.js app router and page components for routing and rendering.
- **`actions/`**: Server and client-side actions for handling asynchronous logic.
- **`components/`**: Reusable UI components used throughout the app.
- **`db/`**: Database connections and related configurations.
- **`services/`**: Service functions that handle business logic and API integrations.
- **`utils/`**: Utility functions for common tasks and helpers.
- **`public/`**: Static assets such as images and fonts.

## Environment Variables

Ensure the following variables are set in your `.env.local` file:

- `BASE_URL`
- `MONGODB_ATLAS_URI`
- `JWT_SECRET`
