/**
 * WHITELIST DE EMAILS AUTORIZADOS PARA EL PRECURSO
 *
 * Añade aquí los emails de los alumnos que han pagado el curso.
 * Solo estos emails podrán acceder a la zona privada del precurso.
 *
 * Formato: un email por línea, en minúsculas
 */

export const ALLOWED_EMAILS: string[] = [
  // === ALUMNOS COHORTE MARZO 2026 ===
  'josu@yenze.io',
  'test@example.com',

  // Añade más emails aquí...
  // 'alumno1@gmail.com',
  // 'alumno2@hotmail.com',
]

/**
 * Verifica si un email tiene acceso al precurso
 */
export function hasAccessToPrecurso(email: string): boolean {
  if (!email) return false
  const normalizedEmail = email.toLowerCase().trim()
  return ALLOWED_EMAILS.some(allowed => allowed.toLowerCase() === normalizedEmail)
}

/**
 * Obtiene la lista de emails permitidos (para admin)
 */
export function getAllowedEmails(): string[] {
  return ALLOWED_EMAILS
}
