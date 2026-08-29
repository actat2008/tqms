export function generateRegistrationId(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(6, '0')
  return `STU-${year}-${random}`
}

export function maskFin(fin: string): string {
  return fin.substring(0, 2) + 'XXXXXXX'
}

export function formatPhoneNumber(phone: string): string {
  // Remove spaces and special chars
  const cleaned = phone.replace(/\D/g, '')
  // Format: +994 XX XXX XX XX
  return `+994 ${cleaned.substring(1, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`
}
