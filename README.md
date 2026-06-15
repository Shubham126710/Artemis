<div align="center">
  <img src="public/logo.png" alt="SilverSeat Logo" width="350" />
  <p align="center">
    <br/>
    <strong>A premium, high-performance cinematic ticketing and seat reservation platform.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

---

## 📖 Overview

**SilverSeat** is a state-of-the-art web application designed for the modern moviegoer. It provides a sleek, high-performance, and immersive interface for browsing movies, viewing cinematic details, and securely booking premium theater seats. 

Built with aesthetic excellence and blazing-fast performance in mind, SilverSeat redefines the digital ticketing experience with advanced authentication, dynamic dashboards, and real-time interactions.

## ✨ Features

- **Premium UI/UX**: A dark-mode first, glassmorphism-inspired cinematic interface designed to awe users.
- **Secure Authentication**: Robust credential and OAuth login systems built on Better Auth, featuring seamless Google integration and secure session handling.
- **Dynamic Dashboards**: Personalized user hubs to track upcoming bookings, ticketing history, and profile preferences.
- **Role-based Access**: Comprehensive access control ensuring smooth segregation between regular users and system administrators.
- **Seamless Database ORM**: Powered by Prisma and SQLite for rapid data modeling and type-safe backend queries.

## 🛠 Tech Stack

This project is built using modern, enterprise-ready web technologies tailored for speed and reliability.

- **Framework**: [Next.js 15 (Turbopack)](https://nextjs.org/)
- **Frontend**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom premium tokens and micro-animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [SQLite](https://sqlite.org/)

### Project Structure

```bash
├── prisma/             # SQLite schema & migrations
├── public/             # Static assets, logos, and images
├── src/
│   ├── app/            # Next.js App Router (Pages, API Routes, Layouts)
│   ├── components/     # Reusable React UI Components
│   └── lib/            # Utilities, Authentication Config, and Prisma Client
└── README.md           # You are here
```

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubham126710/SilverSeat.git
   cd SilverSeat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   BETTER_AUTH_SECRET="your_super_secret_auth_key"
   DATABASE_URL="file:./dev.db"
   
   # For Google OAuth
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```

4. **Initialize Database**
   Run Prisma migrations to build your schema and generate the client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to launch SilverSeat.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <sub>Built with ❤️ by Shubham Upadhyay</sub>
</div>
