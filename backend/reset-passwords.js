const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

// Set a simple password for all accounts
const NEW_PASSWORD = 'password123';

async function resetPasswords() {
  try {
    console.log('\n🔐 Resetting passwords for all user accounts...\n');
    
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });
    
    console.log('═'.repeat(80));
    
    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      
      console.log(`✅ ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${NEW_PASSWORD}`);
      console.log(`   Role: ${user.role}`);
      console.log('');
    }
    
    console.log('═'.repeat(80));
    console.log(`\n✅ All ${users.length} passwords have been reset to: ${NEW_PASSWORD}`);
    console.log('\n📝 Account Summary:\n');
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} / ${NEW_PASSWORD} (${user.role})`);
    });
    
    console.log('\n💡 You can now login with any of these accounts!\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPasswords();
