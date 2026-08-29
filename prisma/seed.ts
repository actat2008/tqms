import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@university.local'
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  console.log(`Admin user created: ${admin.email}`)

  // Seed regions (Azərbaycan şəhər və rayonları)
  const regions = [
    { name: 'Bakı şəhəri', type: 'city' },
    { name: 'Gəncə şəhəri', type: 'city' },
    { name: 'Sumqayıt şəhəri', type: 'city' },
    { name: 'Baki rayon', type: 'region' },
    { name: 'Abşeron rayon', type: 'region' },
    { name: 'Gədəbəy rayon', type: 'region' },
  ]

  for (const region of regions) {
    await prisma.region.upsert({
      where: { name: region.name },
      update: {},
      create: region,
    })
  }

  console.log(`${regions.length} regions seeded`)

  // Seed education institutions
  const institutions = [
    {
      name: 'Bakı Texniki Universiteti',
      type: 'tam_orta_məktəb',
      city: 'Bakı şəhəri',
      district: null,
      address: 'H.Cavid prospekti',
      source: 'edu.gov.az',
    },
    {
      name: 'Gəncə Dövlət Peşə Təhsil Mərkəzi',
      type: 'peşə_təhsil_mərkəzi',
      city: 'Gəncə şəhəri',
      district: null,
      address: 'Lenin küçəsi',
      source: 'vet.edu.gov.az',
    },
    {
      name: 'Bakı Texniki Kolleci',
      type: 'kollec',
      city: 'Bakı şəhəri',
      district: null,
      address: 'Q. Qarayev küçəsi',
      source: 'edu.gov.az',
    },
  ]

  for (const institution of institutions) {
    await prisma.educationInstitution.upsert({
      where: { name: institution.name },
      update: {},
      create: institution,
    })
  }

  console.log(`${institutions.length} education institutions seeded`)
  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
