export interface Student {
  id: string
  registrationId: string
  firstName: string
  lastName: string
  fatherName: string
  fin: string
  personalPhone: string
  educationLevel: string
  educationInstitutionId: string
  graduationYear: number
  createdAt: Date
}

export interface EducationInstitution {
  id: string
  name: string
  type: string
  city: string
  district: string | null
  address: string | null
}

export interface Region {
  id: string
  name: string
  type: 'city' | 'region'
}
