import { z } from 'zod'

// FIN kod validation (Azərbaycan)
export const finSchema = z
  .string()
  .regex(/^[A-Z]{2}\d{8}$/, 'FİN kod düzgün formatda deyil')
  .toUpperCase()

// Telefon nömrəsi validation (Azərbaycan)
export const phoneSchema = z
  .string()
  .regex(/^\+994\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, 'Telefon nömrəsi düzgün formatda deyil')

// Student form validation
export const studentFormSchema = z.object({
  firstName: z.string().min(2, 'Ad minimum 2 simvoldan ibarət olmalıdır'),
  lastName: z.string().min(2, 'Soyad minimum 2 simvoldan ibarət olmalıdır'),
  fatherName: z.string().min(2, 'Ata adı minimum 2 simvoldan ibarət olmalıdır'),
  fin: finSchema,
  personalPhone: phoneSchema,
  fatherPhone: phoneSchema.optional(),
  motherPhone: phoneSchema.optional(),
  fatherWorkplace: z.string().optional(),
  motherWorkplace: z.string().optional(),
  educationLevel: z.string().min(1, 'Təhsil səviyyəsi seçilməlidir'),
  educationInstitutionId: z.string().min(1, 'Təhsil müəssisəsi seçilməlidir'),
  graduationYear: z.number().min(2000).max(2027),
  registrationAddressRegion: z.string().min(1, 'Qeydiyyat ünvanı şəhər/rayon seçilməlidir'),
  registrationAddressStreet: z.string().min(2, 'Küçə adı doldurulmalıdır'),
  registrationAddressBuilding: z.string().min(1, 'Ev/bina/mənzil doldurulmalıdır'),
  actualAddressRegion: z.string().min(1, 'Faktiki ünvan şəhər/rayon seçilməlidir'),
  actualAddressStreet: z.string().min(2, 'Küçə adı doldurulmalıdır'),
  actualAddressBuilding: z.string().min(1, 'Ev/bina/mənzil doldurulmalıdır'),
  consentGiven: z.boolean().refine(val => val === true, 'Razılıq verilməlidir'),
})

export type StudentFormData = z.infer<typeof studentFormSchema>
