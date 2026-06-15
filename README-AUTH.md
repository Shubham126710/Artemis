# SilverSeat Auth & Backend Setup

## Setup Instructions

1. Rename `.env.example` to `.env` and fill in your Neon PostgreSQL database URL.
2. Run Prisma Migrations:
   ```bash
   npx prisma db push
   # OR
   npx prisma migrate dev --name init
   ```
3. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
4. Seed the Database (creates an admin user):
   ```bash
   npx tsx prisma/seed.ts
   ```
5. Run the Next.js development server:
   ```bash
   npm run dev
   ```

## API Usage Examples

Better Auth provides an RPC-style client to interact with the authentication routes.

### Login with Email & Password
```typescript
import { authClient } from "@/lib/auth-client";

const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "Password123!"
});
```

### Get Session Information
```typescript
import { authClient } from "@/lib/auth-client";

const { data: session } = await authClient.useSession();
console.log(session?.user?.name);
console.log(session?.user?.role);
```

### Sign Out
```typescript
import { authClient } from "@/lib/auth-client";

await authClient.signOut();
```
