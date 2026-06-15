import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@silverseat.com';
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  // Hash password using argon2 (Better Auth compatible)
  const hashedPassword = await argon2.hash('AdminPassword123!');

  const admin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: adminEmail,
      emailVerified: true,
      role: 'SUPER_ADMIN',
    }
  });

  // Create the corresponding account record for credentials
  await prisma.account.create({
    data: {
      accountId: admin.id,
      providerId: 'credential',
      userId: admin.id,
      password: hashedPassword,
    }
  });

  console.log(`Admin created successfully! Email: ${adminEmail} | Password: AdminPassword123!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
