import { prisma } from '@/lib/db'
import { studentFormSchema } from '@/lib/validators'
import { generateRegistrationId } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = studentFormSchema.parse(body)

    // Check if FIN already exists
    const existingStudent = await prisma.student.findUnique({
      where: { fin: validatedData.fin },
    })

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Bu FİN kod ilə artıq qeydiyyat mövcuddur' },
        { status: 400 }
      )
    }

    // Create addresses
    const registrationAddress = await prisma.address.create({
      data: {
        region: validatedData.registrationAddressRegion,
        street: validatedData.registrationAddressStreet,
        building: validatedData.registrationAddressBuilding,
      },
    })

    const actualAddress = await prisma.address.create({
      data: {
        region: validatedData.actualAddressRegion,
        street: validatedData.actualAddressStreet,
        building: validatedData.actualAddressBuilding,
      },
    })

    // Create student
    const student = await prisma.student.create({
      data: {
        registrationId: generateRegistrationId(),
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        fatherName: validatedData.fatherName,
        fin: validatedData.fin,
        personalPhone: validatedData.personalPhone,
        fatherPhone: validatedData.fatherPhone,
        motherPhone: validatedData.motherPhone,
        fatherWorkplace: validatedData.fatherWorkplace,
        motherWorkplace: validatedData.motherWorkplace,
        educationLevel: validatedData.educationLevel,
        educationInstitutionId: validatedData.educationInstitutionId,
        graduationYear: validatedData.graduationYear,
        registrationAddressId: registrationAddress.id,
        actualAddressId: actualAddress.id,
        consentGiven: validatedData.consentGiven,
      },
    })

    return NextResponse.json(
      {
        success: true,
        registrationId: student.registrationId,
        message: 'Qeydiyyatınız uğurla tamamlandı',
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating student:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Məlumatlar düzgün formatda deyil', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Qeydiyyatı yadda saxlamaq mümkün olmadı. Bir qədər sonra yenidən cəhd edin.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fin = searchParams.get('fin')

    if (fin) {
      const student = await prisma.student.findUnique({
        where: { fin },
        select: {
          id: true,
          registrationId: true,
          firstName: true,
          lastName: true,
          fin: true,
        },
      })

      if (!student) {
        return NextResponse.json(
          { error: 'Tələbə tapılmadı' },
          { status: 404 }
        )
      }

      return NextResponse.json(student)
    }

    return NextResponse.json(
      { error: 'FİN kod göndərilməlidir' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error fetching student:', error)
    return NextResponse.json(
      { error: 'Tələbə məlumatını əldə etmək mümkün olmadı' },
      { status: 500 }
    )
  }
}
