/**
 * CONFIGURACIÓN DE ACCESO AL PRECURSO
 *
 * Contraseña compartida para todos los alumnos.
 * Configura PRECURSO_PASSWORD en las variables de entorno de Vercel.
 */

/**
 * Verifica si la contraseña es correcta
 */
export function verifyPrecursoPassword(password: string): boolean {
  const expected = process.env.PRECURSO_PASSWORD
  if (!expected) {
    console.error('[precurso-auth] PRECURSO_PASSWORD no configurada en env vars')
    return false
  }
  return password === expected
}
