import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const city = searchParams.get('city')

    let where: any = { active: true }

    if (type) where.type = type
    if (city) where.city = city

    const institutions = await prisma.educationInstitution.findMany({
      where,
      select: {
        id: true,
        name: true,
        type: true,
        city: true,
        district: true,
        address: true,
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(institutions)
  } catch (error) {
    console.error('Error fetching institutions:', error)
    return NextResponse.json(
      { error: 'Məlumatları əldə etmək mümkün olmadı' },
      { status: 500 }
    )
  }
}
